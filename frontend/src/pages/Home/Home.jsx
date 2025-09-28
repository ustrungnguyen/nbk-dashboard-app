import './home.css';

export default function Home() {
    return (
        <main className='home-container'>
            {/* Welcome Section */}
            <section className='welcome-section'>
                {/* The grid background */}
                <div className='grid-background'></div>

                {/* Welcome section content */}
                <div className='content'>
                    <h1>Unlock the Power of Your Data</h1>
                    <p>Join thousands of businesses using AI-driven insights.</p>
                </div>
            </section>
        </main>
    )
}