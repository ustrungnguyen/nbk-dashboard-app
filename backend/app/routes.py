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
            Bạn là một chuyên gia tư vấn học tập với nhiều năm kinh nghiệm, chuyên giúp đỡ mọi người
            trong việc đánh giá, phân tích, và từ đó đưa ra một lộ trình học tập chi tiết để đạt được
            mục tiêu trong việc học tập. Dựa vào dữ liệu điểm số và mô tả của học sinh dưới đây, hãy 
            đưa ra một bài phân tích chi tiết bằng tiếng Việt với câu trúc 3 phần chính bao gồm 3 phần chính:
            '### Đánh giá sơ bộ',
            '### Phân tích chi tiết',
            '### Lộ trình đề xuất'.
            
            Đầu tiên tôi sẽ cung cấp một số dữ liệu cần thiết trong quá trình học tập.
            **Dữ liệu học tập:**
            {subject_details}
            - Trạng thái tổng quan: {data['overall_status']}
            - Khả năng đỗ tốt nghiệp (dự đoán): {data['graduation_possibility']}

            Ngoài ra, tôi cũng sẽ cung cấp một mô tả chi tiết về quá trình học tập
            **Mô tả của học sinh:**
            "{data['user_description']}"
            
            Hãy đưa ra những nhận xét sâu sắc, mang tính xây dựng và một lộ trình học tập thực tế, khả thi để 
            giúp học sinh cải thiện hoặc duy trì kết quả. Cuối cùng đừng quên đưa ra một lộ trình học tập chi 
            tiết để đạt được điểm. Bạn hãy trả lời dài và thật chi tiết nhé!
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful academic advisor."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
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
