// Importing React
import React from 'react';
import { useEffect, useRef } from 'react';

// Importing Images
import WelcomeImage from '../../assets/Home/react.png';

// Importing CSS
import './home.css';
import './home_animation.css';

export default function Home() {
    // const imgRef = useRef(null);

    // useEffect(() => {
    //     const img = imgRef.current;
    //     if (!img) return;

    //     const observer = new window.IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 img.classList.add('scroll-animate');
    //                 observer.disconnect();
    //             }
    //         },
    //         { threshold: 0.2 }
    //     );

    //     observer.observe(img);

    //     return () => observer.disconnect();
    // }, []);

    return (
        <main className='home-container'>
            {/* Welcome Section */}
            <section className='welcome-section'>
                {/* The grid background */}
                <div className='grid-background'></div>

                <div className='features-badge'>
                    Trải nhiệm các tính năng AI
                </div>

                {/* Welcome section content */}
                <div className='welcome-content-text'>
                    <h1>Dashboard theo dõi quá trình học tập cá nhân</h1>
                    <p>
                        Đo lường và cải thiện hiệu suất học tập của bạn bằng cách ứng dụng công nghệ trong học tập
                    </p>
                </div>

                {/* Animation image */}
                <img src={WelcomeImage} alt="Welcome" className='welcome-image welcome-image-animation' />
            </section>
        </main>
    )
}