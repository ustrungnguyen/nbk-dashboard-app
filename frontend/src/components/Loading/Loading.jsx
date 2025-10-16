import React from 'react';
import './loading.css';

export default function LoadingAI() {
    return (
        <div className="ai-preloader">
            <p>Đang tải dữ liệu...</p>
            <div className="dots-container">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
}