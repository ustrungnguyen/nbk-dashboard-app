// Importing React
import React from 'react';

// Importing custom hooks
import useInView from '../../custom_hooks/useInView';

// Importing modules
import cn from 'classnames';

// Importing Images
import WelcomeImage from '../../assets/Home/react.png';
import DashboardImage from '../../assets/Home/DashboardConner.png';

// Importing CSS
import './home.css';
import './home_animation.css';

export default function Home() {
    const [headingRef, headingInView] = useInView({ threshold: 0.5 });
    const [contentRef, contentInView] = useInView({ threshold: 0.5 });

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

                    <div className='gradient-black-background'></div>
                </section>

                {/* Dashboard Overview Section */}
                <section className='dashboard-overview-section'>
                        <div className='dashboard-overview-container'>

                        {/* Dashboard overview heading container */}
                        <div
                            ref={headingRef}
                            className='dashboard-overview-heading'>

                            {/* Dashboard overview heading badge */}
                            <div 
                                    className={`
                                    dashboard-overview-badge 
                                    dashboard-overview-badge-animation 
                                    ${headingInView ? 'is-in-view' : ''}`}>
                                Tổng quan
                            </div>

                            {/* Dashboard overview title */}
                            <h1 
                                className={`
                                    dashboard-overview-title 
                                    dashboard-overview-title-animation 
                                    ${headingInView ? 'is-in-view' : ''}`}>
                                Tổng quan sản phẩm
                            </h1>
                        </div>

                        {/* Dashboard overview content */}
                        <div
                            ref={contentRef}
                            className={cn(
                                'dashboard-overview-content',
                                'dashboard-overview-content-animation',
                                {'is-in-view': contentInView}
                        )}>
                            <p>
                                Dashboard của chúng tôi cung cấp cái nhìn tổng quan về quá trình học tập của bạn, giúp bạn theo dõi tiến trình và hiệu suất học tập một cách dễ dàng. Với giao diện trực quan và các biểu đồ, bạn có thể nhanh chóng nắm bắt được những điểm mạnh và điểm cần cải thiện trong quá trình học tập.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Dashboard Features Section */}
                <section className='dashboard-features-section'>
                    <div className='dashboard-features-container'>
                        {/* Dashboard features heading container */}
                        <div className='dashboard-features-heading-grid'>
                            <div className='dashboard-features-heading-container'>
                                <h1 className='dashboard-features-title-animation'>Giao diện của Dashboard</h1>
                            </div>

                            <div className='dashboard-features-content-container'>
                                <p className='dashboard-features-content-animation'>
                                    Giao diện của dashboard được thiết kế để cung cấp trải nghiệm người dùng tối ưu. Bạn có thể tùy chỉnh và cá nhân hóa dashboard theo nhu cầu riêng của mình.
                                </p>
                            </div>
                        </div>

                        {/* Dashboard features image container */}
                        <div className='dashboard-features-image-container'>
                            <img className='dashboard-features-image-animation' src={DashboardImage} alt="Dashboard" />
                        </div>
                    </div>
                </section>

                {/* Updates Summary */}
                <section className='updates-summary-section'>
                    <div className='updates-summary-container'>

                        {/* Updates heading container */}
                        <div className='updates-heading-container'>
                            <div
                                className='updates-badge'>
                            Mới nhất</div>

                            <h1>
                                Các cập nhật mới nhất
                            </h1>
                        </div>

                        {/* Updates caption container */}
                        <div className='updates-caption-container'>
                            <div>
                                Dashboard liên tục cập nhật các tính năng theo dõi tiến trình học tập, phân tích hiệu suất cá nhân, hiển thị biểu đồ trực quan và cho phép tùy chỉnh giao diện theo nhu cầu của người dùng.
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}