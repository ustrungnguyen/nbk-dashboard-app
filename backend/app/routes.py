from fastapi import APIRouter, HTTPException
from typing import List, Optional
from .models import AnalysisRequest
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

router = APIRouter()

last_analysis_result: Optional[dict] = None

def get_subject_status(average_score: float) -> str:
    if average_score >= 7:
        return 'An toàn'
    elif 4 <= average_score < 7:
        return 'Cần chú ý'
    else:
        return 'Nguy hiểm'
    
def get_overall_status(average_scores: List[float]) -> str:
    if not average_scores:
        return 'Không có dữ liệu'
    
    if all(score >= 7 for score in average_scores):
        return 'An toàn'
    elif all(score >= 4 for score in average_scores):
        return 'Cần chú ý'
    else:
        return 'Nguy hiểm'
    
def calculate_graduation_possibility(all_original_scores: List[float], all_average_scores: List[float]) -> str:
    if not all_original_scores:
        return '0%'
    
    min_score = min(all_original_scores)
    max_score = max(all_original_scores)
    
    is_all_safe = all(score >= 7 for score in all_average_scores)
    if is_all_safe:
        target_score = 8.0
    else:
        target_score = 6.5

    if max_score == min_score:
        return "100%" if max_score >= target_score else "0%"

    percentage = ((max_score - target_score) / (max_score - min_score)) * 100
    
    percentage = max(0, min(100, percentage))
    
    return f"{round(percentage)}%"

def generate_ai_analysis(data: dict) -> str:
    try:
        subject_details = "\n".join([
            f"-Môn {s['subject_name']}: Điểm dự đoán {s['predicted_score']}, Trạng thái: {s['status']}"
            for s in data['subject_analysis']
        ])
        
        prompt = f"""
            Bạn là một chuyên gia tư vấn học tập giàu kinh nghiệm, chuyên đánh giá kết quả học tập và đưa 
            ra lộ trình cải thiện cá nhân hóa cho từng học sinh. 
            Dưới đây là toàn bộ dữ liệu học tập của một học sinh:

            ### Dữ liệu điểm số:
            {chr(10).join([f"- {s['subject_name']}: điểm gốc = {', '.join(map(str, s['original_scores']))}, điểm dự đoán = {s['predicted_score']}, trạng thái: {s['status']}" for s in data['subject_analysis']])}

            - Trạng thái tổng quan: {data['overall_status']}
            - Khả năng đỗ tốt nghiệp (ước tính): {data['graduation_possibility']}

            ### Mô tả học sinh:
            "{data['user_description']}"

            ---

            Hãy viết một **phân tích chi tiết bằng tiếng Việt** với 3 phần rõ ràng:

            ### Đánh giá sơ bộ:
            Đưa ra cái nhìn tổng quan, đánh giá điểm mạnh, điểm yếu nổi bật nhất, và tình hình học tập hiện tại.

            ### Phân tích chi tiết:
            Phân tích từng môn học một cách logic và có chiều sâu (nêu rõ nguyên nhân của kết quả hiện tại, 
            cách tư duy của học sinh, và yếu tố ảnh hưởng). 
            Dùng các bullet points để trình bày rõ ràng.

            ### Lộ trình đề xuất:
            Đưa ra hướng dẫn học tập cụ thể cho từng môn (đặc biệt tập trung vào các môn yếu hoặc nguy hiểm).
            Đồng thời cũng phải chú ý và chỉ ra được những môn đang học tốt, có điểm cao để đưa ra một lời 
            khen ngợi đáng có.
            Gợi ý cách học, công cụ, thời gian biểu hoặc phương pháp học phù hợp, cũng như những môn học
            cụ thể cần chú ý (Ví dụ như cần cải thiệt môn A, duy trì kết quả cao của môn B).
            Cần trình bày như một bản kế hoạch thực tế, có thể áp dụng ngay.

            Cuối cùng, tổng kết bằng một đoạn khích lệ ngắn mang tính động viên và tạo cảm hứng cho học sinh.

            Trả lời thật tự nhiên, có chiều sâu, và đủ dài (ít nhất 5-6 đoạn).
            Viết với giọng văn chuyên nghiệp, thân thiện, truyền cảm hứng. 
            Mỗi phần nên có độ dài ít nhất 3 đoạn văn, mỗi đoạn 3-5 câu.
            Nếu cần, có thể sử dụng dấu gạch đầu dòng để trình bày dễ đọc hơn.
            Cố gắng viết sao cho bài phân tích dài, sâu và có tính thực tế cao.

        """
        
        # GPT Model Configuration
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            temperature=0.85,
            max_tokens=800,
            presence_penalty=0.3,
            frequency_penalty=0.1,
            messages=[
                {"role": "system", "content": "You are an experienced academic advisor who writes detailed Vietnamese educational analyses that are realistic, motivational, and personalized."},
                {"role": "user", "content": prompt}
            ]
        )
        
        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return 'Không thể kết nối đến máy chủ'

@router.get("/")
async def root():
    return {
        "message": "This is the Backend",
        "details": "API is running successfully"
    }

@router.post("/analyze")
async def analyze_scores(request: AnalysisRequest):
    global last_analysis_result
    
    subject_results = []
    all_average_scores = []
    all_original_scores = []
    
    for subject in request.subjects:
        all_original_scores.extend(subject.scores)
        
        average_score = round(sum(subject.scores) / len(subject.scores), 1)
        all_average_scores.append(average_score)
        
        status = get_subject_status(average_score)
        
        subject_results.append({
            "subject_name": subject.name,
            "original_scores": subject.scores,
            "predicted_score": average_score,
            "status": status
        })

    overall_status = get_overall_status(all_average_scores)
    graduation_possibility = calculate_graduation_possibility(all_original_scores, all_average_scores)
    
    temp_data = {
        "subject_analysis": subject_results,
        "overall_status": overall_status,
        "graduation_possibility": graduation_possibility,
        "user_description": request.description # Thêm mô tả của người dùng
    }
    
    ai_analysis_text = generate_ai_analysis(temp_data)
    
    last_analysis_result = {
        "subject_analysis": subject_results,
        "overall_status": overall_status,
        "graduation_possibility": graduation_possibility,
        "ai_analysis": ai_analysis_text
    }
    
    return last_analysis_result
    
@router.get("/analyze")
async def get_last_analysis():
    if last_analysis_result is None:
        raise HTTPException(status_code=404, detail="Chưa có dữ liệu hoặc dữ liệu không đầy đủ.")
    
    return last_analysis_result
