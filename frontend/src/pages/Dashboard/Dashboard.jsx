import React from "react";
import {useLocation, Navigate} from 'react-router-dom';
import cn from 'classnames';
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar, Line, Doughnut} from 'react-chartjs-2';

// Importing CSS
import './dashboard.css';

ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

const lineChartColors = [
    { border: 'rgb(54, 162, 235)' },
    { border: 'rgb(255, 99, 132)' },
    { border: 'rgb(75, 192, 192)' },
    { border: 'rgb(255, 205, 86)' }
];

export default function Dashboard() {

    const location = useLocation();

    const analysisData = location.state?.results;

    if (!analysisData) {
        return <Navigate to="/form" />;
    }

    const { subject_analysis, overall_status, graduation_possibility } = analysisData;

    const barData = {
        labels: subject_analysis.map((data) => data.subject_name),
        datasets: [
                {
                label: "Điểm Trung Bình Các Môn Học",
                data: subject_analysis.map((data) => data.predicted_score),
                backgroundColor: subject_analysis.map(() => "rgba(106,106,164,1)"),
                borderRadius: 5,
                borderWidth: 1,
                },
            ],
        };

        const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 900,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: { display: false },
            title: {
            display: true,
            text: 'Điểm Trung Bình Các Môn Học',
            color: 'white',
            font: { size: 16 },
            },
        },
        scales: {
            y: {
            beginAtZero: true,
            max: 10,
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            },
            x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' },
            },
        },
    };

    const lineChartData = {
        labels: ['Giữa kỳ 1', 'Cuối kỳ 1', 'Giữa kỳ 2', 'Dự đoán cuối kỳ 2'],

        datasets: subject_analysis.map((subject, index) => {
            return {
                label: subject.subject_name,
                
                data: [...subject.original_scores, subject.predicted_score],
                
                borderColor: lineChartColors[index % lineChartColors.length].border,

                tension: 0.4 
            };
        })
    };

    const percentageValue = parseInt(graduation_possibility.replace('%', ''));
    
    const doughnutChartData = {
        datasets: [
            {
                data: [percentageValue, 100 - percentageValue],
                backgroundColor: ['#4ade80', 'rgba(255, 255, 255, 0.1)'],
                borderColor: ['#4ade80', 'rgba(255, 255, 255, 0.2)'],
                borderWidth: 1,
            },
        ],
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },

            
        },
    };

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
                                    <i className={cn('bi', 'subject_status_icon',
                                    {
                                        'bi-record-circle-fill': subjectData.status === 'An toàn',
                                        'green_safe_icon': subjectData.status === 'An toàn',

                                        'bi-exclamation-circle': subjectData.status === 'Cần chú ý' || subjectData.status === 'Nguy hiểm',
                                        'yellow_caution_icon': subjectData.status === 'Cần chú ý',

                                        'red_dangerous_icon': subjectData.status === 'Nguy hiểm'
                                    })}></i>
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
                                    <p className='section_label'>Trạng thái quá trình</p>
                                    <h3>{overall_status}</h3>
                                </div>

                                <div className='process_status_icon_container'>
                                    <i className={cn('bi', 'bi-shield-check', 'process_status_icon',
                                    {
                                        'green_safe_icon': overall_status === "An toàn",
                                        'yellow_caution_icon': overall_status === "Cần chú ý",
                                        'red_dangerous_icon': overall_status === "Nguy hiểm"
                                    })}></i>
                                </div>
                            </div>

                            <div className='graduation_possibility_container'>
                                <div className='graduation_possibility_details_container'>
                                    <p className='section_label'>Tỉ lệ đỗ tốt nghiệp</p>
                                    <h3>{graduation_possibility}</h3>
                                </div>

                                <div className='graduation_possibility_icon_container'>
                                    <i className="bi bi-percent graduation_possibility_icon"></i>
                                </div>
                            </div>
                        </div>

                        <div className='predicted_scores_chart_container'>
                            <div className='line_chart_container'>
                                <h2>Biểu đồ điểm số các môn vừa qua</h2>
                                <Line
                                    data={lineChartData}
                                    options={{
                                        maintainAspectRatio: false,
                                        responsive: true
                                    }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className='overall_progress_right'>
                        {/* Subjects average scores container */}
                        <div className='subjects_average_score_container'>
                            <div className='subject_bar_chart_container'>
                                <Bar className='subject_average_score_bar'
                                    data={barData} options={barOptions}
                                />
                            </div>
                        </div>

                        {/* Graduation percentage container */}
                        <div className='graduation_percentage_container'>
                            <h2>Tỉ lệ đỗ tốt nghiệp THPT</h2>
                            <Doughnut 
                                className='graduation_percentage_chart_container' 
                                data={doughnutChartData}
                                options={doughnutChartOptions}
                            />
                        </div>
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