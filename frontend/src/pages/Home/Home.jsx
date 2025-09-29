// Importing React
import React from 'react';
import { useEffect, useRef } from 'react';

// Importing Images
import WelcomeImage from '../../assets/Home/react.png';

// Importing CSS
import './home.css';
import './home_animation.css';

export default function Home() {


    return (
        <>
        <main>
                {/* Welcome Section */}
                <section className='welcome-section'>
                    {/* The grid background */}
                    <div className='grid-background'></div>

                    {/* Features badge */}
                    <div className='features-badge features-badge-animation'>
                        Trải nhiệm các tính năng nâng cao với AI
                    </div>

                    {/* Welcome section content */}
                    <div className='welcome-content-text'>
                        <h1 className='welcome-title-animation'>Dashboard theo dõi quá trình học tập cá nhân</h1>
                        <p className='welcome-subtitle-animation'>
                            Đo lường và cải thiện hiệu suất học tập của bạn bằng cách ứng dụng công nghệ trong học tập
                        </p>
                    </div>

                    {/* Animation image */}
                    <img src={WelcomeImage} alt="Welcome" className='hero-image hero-image-animation' />
                </section>

                {/* Dashboard Overview Section */}
                <section className='dashboard-overview-section'>

                    {/* Dashboard overview heading container */}
                    <div className='dashboard-overview-heading'>

                        {/* Dashboard overview heading badge */}
                        <div className='dashboard-overview-badge'>
                            Tổng quan
                        </div>

                        {/* Dashboard overview title */}
                        <h2 className='dashboard-overview-title'>Tổng quan về Dashboard</h2>
                    </div>

                    {/* Dashboard overview content */}
                    <div className='dashboard-overview-content'>
                        <p>
                            Dashboard của chúng tôi cung cấp cái nhìn tổng quan về quá trình học tập của bạn, giúp bạn theo dõi tiến trình và hiệu suất học tập một cách dễ dàng. Với giao diện trực quan và các biểu đồ, bạn có thể nhanh chóng nắm bắt được những điểm mạnh và điểm cần cải thiện trong quá trình học tập.
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}