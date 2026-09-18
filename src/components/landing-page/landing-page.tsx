import './landing-page.scss';

const markets = [
    'VOLATILITY 100 (1S) INDEX',
    'VOLATILITY 100 INDEX',
    'VOLATILITY 10 INDEX',
    'VOLATILITY 25 INDEX',
    'VOLATILITY 50 INDEX',
    'VOLATILITY 75 INDEX',
    'VOLATILITY 10 (1S) INDEX',
    'VOLATILITY 25 (1S) INDEX',
];

const testimonials = [
    ['EO', 'Emmanuel Okwonkwo', 'Binary Options — Lagos, Nigeria', 'Solid tools for structured trading. The analysis section alone is worth the sign-up.'],
    ['AK', 'Akosua Mensah', 'Volatility Trader — Accra, Ghana', 'I recommend this to every trader in my community — especially the free bot library.'],
    ['TM', 'Tendai Moyo', 'Matches/Differs — Harare, Zimbabwe', 'Bulk Trader with barrier digits is a game changer. Smooth on mobile too.'],
    ['CP', 'Chanda Phiri', 'Over/Under — Lusaka, Zambia', 'Clean layout, no clutter — I can focus on execution instead of fighting the UI.'],
    ['YB', 'Yonas Bekele', 'Synthetic Indices — Addis Ababa, Ethiopia', 'The hub brings African traders and global Deriv tools together really well.'],
    ['JR', 'James Reid', 'Bot Builder — London, UK', 'Professional-grade Blockly workspace with a landing page that actually explains the product.'],
    ['ML', 'Maria Lopez', 'Volatility Trader — Madrid, Spain', 'I use it daily for back-testing ideas before deploying on my live Deriv account.'],
];

const goToWorkspace = () => {
    window.location.href = '/preview';
};

const LandingPage = () => (
    <main className='landing-page'>
        <header className='landing-header'>
            <button className='brand' type='button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className='brand-mark'>RIS</span>
                <span className='brand-copy'>
                    <strong>riskmanagers.site</strong>
                    <small>SMART DERIV TOOLS</small>
                </span>
            </button>
            <span className='header-domain'>riskmanagers.site</span>
            <nav className='header-actions' aria-label='Account actions'>
                <button className='theme-toggle' type='button' aria-label='Toggle color theme'>◐</button>
                <button className='outline-button' type='button' onClick={goToWorkspace}>Log in</button>
                <button className='outline-button' type='button' onClick={goToWorkspace}>API Token Login</button>
                <button className='light-button' type='button' onClick={goToWorkspace}>Create Free Account</button>
            </nav>
        </header>

        <div className='market-ticker' aria-label='Live market instruments'>
            <div className='ticker-track'>
                {[...markets, ...markets].map((market, index) => (
                    <span key={`${market}-${index}`}>
                        {market} <b>—</b> <i>▲</i>
                    </span>
                ))}
            </div>
        </div>

        <section className='hero'>
            <p className='eyebrow'>FREE DERIV BOTS, AUTOMATION, AND TRADING TOOLS IN ONE WORKSPACE</p>
            <h1>Welcome to <span>riskmanagers.site</span></h1>
            <p className='hero-copy'>Structured trading, built for focus. Build, load, and run Deriv bot strategies from a focused workspace<br className='desktop-break' /> made for everyday traders.</p>
            <div className='hero-actions'>
                <button className='primary-button' type='button' onClick={goToWorkspace}><span aria-hidden='true'>⌁</span> Log in <b aria-hidden='true'>›</b></button>
                <button className='secondary-button' type='button' onClick={goToWorkspace}><span aria-hidden='true'>ϟ</span> Create Free Account</button>
            </div>
        </section>

        <section className='testimonials' aria-labelledby='testimonials-title'>
            <div className='section-heading'>
                <span className='disclaimer'>▲ Risk Disclaimer</span>
                <h2 id='testimonials-title'>What people say</h2>
            </div>
            <div className='testimonial-row'>
                {testimonials.map(([initials, name, role, quote], index) => (
                    <article className='testimonial-card' key={name}>
                        <div className={`avatar avatar-${index % 5}`}>{initials}</div>
                        <div className='person'>
                            <strong>{name}</strong>
                            <small>{role}</small>
                        </div>
                        <div className='stars' aria-label='5 out of 5 stars'>★★★★★</div>
                        <p>{quote}</p>
                    </article>
                ))}
            </div>
        </section>

        <footer className='landing-footer'>© 2026 riskmanagers.site. All rights reserved. © 2026 riskmanagers.site. All rights reserved.</footer>
    </main>
);

export default LandingPage;
