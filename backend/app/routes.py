from fastapi import APIRouter, HTTPException
from typing import List, Optional
from .models import AnalysisRequest

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
        target_score = 6.0

    if max_score == min_score:
        return "100%" if max_score >= target_score else "0%"

    percentage = ((max_score - target_score) / (max_score - min_score)) * 100
    
    percentage = max(0, min(100, percentage))
    
    return f"{round(percentage)}%"

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
            "predicted_score": average_score,
            "status": status
        })

    overall_status = get_overall_status(all_average_scores)
    graduation_possibility = calculate_graduation_possibility(all_original_scores, all_average_scores)
    
    last_analysis_result = {
        "subject_analysis": subject_results,
        "overall_status": overall_status,
        "graduation_possibility": graduation_possibility
    }
    
    return last_analysis_result
    
@router.get("/analyze")
async def get_last_analysis():
    if last_analysis_result is None:
        raise HTTPException(status_code=404, detail="Chưa có dữ liệu hoặc dữ liệu không đầy đủ.")
    
    return last_analysis_result
