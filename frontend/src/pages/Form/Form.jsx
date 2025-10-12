import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

// Importing CSS
import './form.css';

const subjectPlaceholders = ['Toán', 'Văn', 'Anh', 'Địa'];

const scoreLabels = ['Giữa kỳ 1', 'Cuối kỳ 1', 'Giữa kỳ 2'];

const scorePlaceholders = ['7.5', '8', '9.5', '6.75', '8.25', '9.5', '10'];

const createInitialState = () => {
    return Array(4).fill(null).map(() => ({
        name: '',
        scores: ['', '', ''],
        placeholders: Array(3).fill(null).map(() => 
            scorePlaceholders[Math.floor(Math.random() * scorePlaceholders.length)]
        )
    }));
};

export default function Form() {

    const [subjects, setSubjects] = useState(createInitialState());
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (subjectIndex, field, value) => {
        const newSubjects = [...subjects];

        if(field === 'name') {
            newSubjects[subjectIndex].name = value;
        } else {
            const scoreIndex = parseInt(field.split('-')[1]);
            newSubjects[subjectIndex].scores[scoreIndex] = value;
        }

        setSubjects(newSubjects);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
           const formarttedSubjects = subjects.map(subject => {
            if(!subject.name) {
                throw new Error("Vui lòng nhập đầy đủ tên các môn học.");
            }

            return {
                name: subject.name,
                scores: subject.scores.map(score => {
                    const parsedScore = parseFloat(score);
                    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 10) {
                        throw new Error("Điểm số không hợp lệ. Vui lòng kiểm tra lại.");
                    }
                    return parsedScore;
                })
            };
        });

        const response = await axios.post('http://localhost:8000/analyze', {
            subjects: formarttedSubjects,
        });

        navigate('/dashboard', {state: {results: response.data}});

        } catch (error) {
           setError(error.message);
           console.log(error); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='form'>
                <div className='form_title_container'>
                    <h1 className='form_title'>Điền điểm số và môn học đăng ký thi tốt nghiệp THPT</h1>
                </div>

                <form className='form_container' onSubmit={handleSubmit}>
                    {subjects.map((subject, subjectIndex) => (
                        <div key={subjectIndex} className='form_card_group'>
                            {/* Subject Card */}
                            <div className='form_subject_card'>
                                <div className='subject_card_title'>{`Môn học ${subjectIndex + 1}`}</div>
                                <label htmlFor={`subject${subjectIndex + 1}`} className='form_subject_label'>Tên môn học:</label>
                                <input 
                                    type='text' 
                                    id={`subject${subjectIndex + 1}`}
                                    className='form_subject_input' 
                                    placeholder={subjectPlaceholders[subjectIndex] || 'Môn học'}
                                    value={subject.name}
                                    onChange={(e) => handleInputChange(subjectIndex, 'name', e.target.value)}
                                    required 
                                />
                            </div>

                            {/* Scores Container */}
                            <div className='form_score_inputs_container'>
                                {subject.scores.map((score, scoreIndex) => {
                                    
                                    return (
                                        <div key={scoreIndex} className='score_input_card'>
                                            <label htmlFor={`score-${subjectIndex}-${scoreIndex}`} className='form_score_subject_label'>
                                                {scoreLabels[scoreIndex]}
                                            </label>
                                            <input 
                                                type='text' 
                                                id={`score-${subjectIndex}-${scoreIndex}`}
                                                className='form_score_subject_input' 
                                                placeholder={subject.placeholders[scoreIndex]}
                                                value={score}
                                                onChange={(e) => handleInputChange(subjectIndex, `score-${scoreIndex}`, e.target.value)}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                required 
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                     <div className="form_description_container">
                        <label htmlFor="description" className="form_description_label">Mô tả quá trình học tập:</label>
                        <textarea
                            id="description"
                            className="form_description_textarea"
                            placeholder="Trong quá trình học tập, tôi gặp khó khăn trong việc..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="15"
                        />
                    </div>
                    
                    {error && <p className="form_error">{error}</p>}

                    <button to="/dashboard" type="submit" className='form_submit_button' disabled={isLoading}>
                        {isLoading ? 'Đang tải dữ liệu...' : 'Phân tích'}
                    </button>
                </form>
            </div>
        </>
    )
}