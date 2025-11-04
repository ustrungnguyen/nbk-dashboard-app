from fastapi import APIRouter, HTTPException
from typing import List, Optional
from .models import AnalysisRequest
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print("API Key loaded:", os.getenv("OPENAI_API_KEY")[:10], "...")

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
        target_score = 5
    else:
        target_score = 4

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

            ### YÊU CẦU VỀ KẾT QUẢ PHÂN TÍCH:
            Viết một **bản đánh giá học tập cực kỳ chi tiết bằng tiếng Việt**, độ dài **tối thiểu 3000-3500 từ**, xưng hô bằng 'bạn', 'mình' và gồm 3 phần lớn:
và
            #### 🟢 1. ĐÁNH GIÁ SƠ BỘ:
            - Viết 5-8 đoạn văn mô tả cái nhìn tổng quan, điểm mạnh, điểm yếu, thái độ học tập và xu hướng phát triển của học sinh.
            - Nêu ra ấn tượng chung về tinh thần học tập, khả năng tư duy, điểm cần cải thiện.
            - Khích lệ lại điểm mạnh và chỉ thẳng điểm yếu của học sinh đó.

            #### 🟡 2. PHÂN TÍCH CHI TIẾT:
            - Phân tích **từng môn học riêng biệt** theo cấu trúc:
            - Điểm mạnh hiện tại.
            - Vấn đề hoặc sai sót học tập.
            - Nguyên nhân (tâm lý, phương pháp, môi trường).
            - Gợi ý cách tiếp cận mới cho môn đó.
            - Với mỗi môn, viết ít nhất 1 đoạn dài hoặc 5-10 bullet points phân tích thật kỹ.
            - Nêu ra ít nhất 3 phòng đoán lý do vì sao học sinh lại có khả năng học mạnh ở môn này và yếu ở môn kia.

            #### 🔵 3. LỘ TRÌNH HỌC TẬP CỤ THỂ:
            - Viết **một kế hoạch học tập theo từng tuần trong 12 tuần tới**.
            - Mỗi tuần cần có:
            - 🎯 **Mục tiêu cụ thể (Goals)**: ví dụ “nắm vững công thức đạo hàm”, “đạt 8 điểm bài kiểm tra 15 phút”, “thuộc 50 từ vựng mới”.
            - 🧭 **Nội dung học**: chi tiết từng ngày hoặc từng nhóm buổi học.
            - ⏰ **Thời lượng gợi ý**: ví dụ “60 phút Toán mỗi buổi tối”, “2 buổi luyện nói tiếng Anh mỗi tuần”.
            - 🧠 **Phương pháp & Công cụ hỗ trợ**: ví dụ “Pomodoro”, “Quizlet”, “Google Sheets theo dõi tiến độ”.
            - ✅ **Cách đánh giá kết quả**: gợi ý bài kiểm tra, tự đánh giá, mini test, nhóm học.
            - Lộ trình cần dài, cụ thể, khả thi, giống như một giáo án thực sự.
            
            ## 4. LỜI KHUYÊN SAU KHI KẾT THÚC LỘ TRÌNH ĐỀ XUẤT:
            - Bạn phải nói rõ sau khi kết thúc lộ trình đề xuất mà vẫn còn thời gian ôn thi thì học sinh đó nên làm gì tiếp theo. Hãy viết một đoạn văn riêng để nói về phần này, 
            đưa ra những lời khuyên nên chú tâm ôn vào môn nào, ví dụ nếu có một môn quá yếu thì phải đổ nhiều sự tập trung hơn vào ôn tập môn đó. Bạn cũng phải chỉ rõ các nguồn uy tín và cụ thể
            để học sinh có thể học môn đó ngay và luôn chứ không phải mất thời gian đi tìm nguồn (Ví dụ YouTube). Mục đích của đoạn văn này để học sinh không lơ là sau khi kết thúc lộ trình mà vẫn
            nhận được các gợi ý dài hạn cho bước tiếp theo.

            Cuối cùng, tổng kết bằng một đoạn khích lệ ngắn mang tính động viên và tạo cảm hứng cho học sinh.

            ---
            ### PHONG CÁCH VIẾT:
            - Viết **tự nhiên, sâu sắc, chuyên nghiệp và truyền cảm hứng.**
            - Diễn đạt **như một cố vấn đang nói chuyện với học sinh thật**.
            - Dùng **định dạng Markdown**: tiêu đề, bullet points, khoảng cách rõ ràng.
            - Phần kết cần là một **đoạn động viên dài**, giúp học sinh có thêm niềm tin và ý chí học tập.
            - Không được viết ngắn; nếu cần hãy mở rộng thêm ví dụ, lời khuyên, hoặc kế hoạch mở rộng dài hơi (3 tháng).
            ---
            ✳️ Hãy bắt đầu bài viết ngay sau đây:

        """
        
        # GPT Model Configuration
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            temperature=0.9,
            max_tokens=3000,
            presence_penalty=0.5,
            frequency_penalty=0.2,
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
