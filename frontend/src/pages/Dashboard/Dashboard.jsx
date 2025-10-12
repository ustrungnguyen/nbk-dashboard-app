import React from 'react';
import {useLocation, Navigate} from 'react-router-dom';

// Importing CSS
import './dashboard.css';

export default function Dashboard() {

    const location = useLocation();

    const analysisData = location.state?.results;

    if (!analysisData) {
        return <Navigate to="/form" />;
    }

    const { subject_analysis, overall_status, graduation_possibility } = analysisData;

    // const [analysisData, setAnalysisData] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8000/analyze');
    //             await setAnalysisData(response.data);
    //         } catch (error) {
    //             setError(error.response?.data?.detail || error.message || 'Không thể tải dữ liệu.');
    //             console.log(error.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchAPI();
    // }, [])

    // if(isLoading) {
    //     return <div className='loading'>Đang tải dữ liệu...</div>
    // }

    // if(error) {
    //     return <div className='error_message'>Lỗi: {error}</div>
    // }

    // if(!analysisData) {
    //     return <div className='no_data_message'>Không tìm thấy dữ liệu</div>
    // }

    // const {subject_analysis, overall_analysis, graduation_possibility} = analysisData;

    return (
        <>
        <div className='dashboard'>
            <div className='dashboard_container'>
                {/* Field 1 | Subjects Status */}
                <div className='subjects_status_container'>
                    {/* Redering Subject Cards */}
                    {subject_analysis.map((subjectData, index) => {
                        return (
                            <div key={index} className='subject_status_card'>
                                <div className='subject_status_details'>
                                    <p className='section_label'>{subjectData.subject_name}</p>
                                    <h3>{subjectData.status}</h3>
                                </div>

                                <div className='subject_status_icon_container'>
                                    <i className={subjectData.status === 'An toàn' ? 'bi bi-record-circle-fill subject_status_icon' : 'bi bi-exclamation-circle subject_status_icon'}></i>
                                </div>
                            </div>
                        );
                    })}
                </div>

                    

                {/* Field 2 | Overall Progress */}
                <div className='overall_progress_container'>
                    {/* Left side */}
                    <div className='overall_progress_left'>
                        <div className='process_prediction_container'>
                            <div className='process_status_container'>
                                <div className='process_status_details_container'>
                                    <p className='section_label long_section_label'>Trạng thái quá trình</p>
                                    <h3>{overall_status}</h3>
                                </div>

                                <div className='process_status_icon_container'>
                                    <i className={overall_status === 'An toàn' ? 'bi bi-shield-check process_status_icon' : 'bi bi-exclamation-circle process_status_icon'}></i>
                                </div>
                            </div>

                            <div className='graduation_possibility_container'>
                                <div className='graduation_possibility_details_container'>
                                    <p className='section_label'>Tỉ lệ đỗ tốt nghiêp</p>
                                    <h3>{graduation_possibility}</h3>
                                </div>

                                <div className='graduation_possibility_icon_container'>
                                    <i className="bi bi-percent graduation_possibility_icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className='overall_progress_right'>
                        
                    </div>
                </div>
                
                {/* Study roadmap suggestion container  */}
                <div className='study_roadmap_suggestion_container'>

                </div>
            </div>
        </div>
        </>
    )
}