from pydantic import BaseModel
from typing import List

class Subject(BaseModel):
    name: str
    scores: List[float]
    
class AnalysisRequest(BaseModel):
    subjects: List[Subject]
    description: str