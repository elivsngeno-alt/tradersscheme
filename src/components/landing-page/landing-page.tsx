import { useEffect, useState } from 'react';
import { initiateLogin, initiateSignUp } from '@/external/deriv-core';
import './landing-page.scss';

const DERIV_CLIENT_ID = process.env.NEXT_PUBLIC_DERIV_APP_ID;

function getOAuthConfig() {
    if (!DERIV_CLIENT_ID) {
        throw new Error('Deriv OAuth is not configured for this deployment.');
    }

    return {
        clientId: DERIV_CLIENT_ID,
        redirectUri: `${window.location.origin}/`,
        scopes: 'trade account_manage',
    };
}

const startOAuth = (action: 'login' | 'signup') => {
    try {
        const config = getOAuthConfig();
        void (action === 'login' ? initiateLogin(config) : initiateSignUp(config));
    } catch (error) {
        console.error('[v0] Deriv OAuth could not start:', error);
        window.alert('Sign-in is temporarily unavailable. Please try again shortly.');
    }
};

const goToLogin = () => startOAuth('login');
const goToSignUp = () => startOAuth('signup');

const marketSymbols = [
    ['R_100', 'Volatility 100 Index'],
    ['R_75', 'Volatility 75 Index'],
    ['R_50', 'Volatility 50 Index'],
    ['R_25', 'Volatility 25 Index'],
    ['R_10', 'Volatility 10 Index'],
] as const;

type LiveQuote = { symbol: string; name: string; quote?: number; direction?: 'up' | 'down' };

const LiveMarketTicker = () => {
    const [quotes, setQuotes] = useState<LiveQuote[]>(marketSymbols.map(([symbol, name]) => ({ symbol, name })));

    useEffect(() => {
        const appId = process.env.NEXT_PUBLIC_DERIV_APP_ID;
        if (!appId) return;

        const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${encodeURIComponent(appId)}`);
        socket.addEventListener('open', () => {
            socket.send(JSON.stringify({ ticks: marketSymbols.map(([symbol]) => symbol), subscribe: 1 }));
        });
        socket.addEventListener('message', event => {
            const message = JSON.parse(event.data) as { tick?: { symbol: string; quote: number } };
            if (!message.tick) return;
            setQuotes(current => current.map(quote => quote.symbol === message.tick?.symbol
                ? { ...quote, quote: message.tick.quote, direction: quote.quote && message.tick.quote >= quote.quote ? 'up' : 'down' }
                : quote));
        });
        return () => socket.close();
    }, []);

    return <div className='market-ticker' aria-label='Live Deriv market prices'>
        <div className='ticker-track'>
            {[...quotes, ...quotes].map((market, index) => (
                <span key={`${market.symbol}-${index}`}>
                    {market.name} <b>{market.quote === undefined ? 'CONNECTING' : market.quote.toFixed(2)}</b> <i>{market.direction === 'down' ? '▼' : '▲'}</i>
                </span>
            ))}
        </div>
    </div>;
};

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
                <button className='outline-button' type='button' onClick={goToLogin}>Log in</button>
                <button className='light-button' type='button' onClick={goToSignUp}>Create Free Account</button>
            </nav>
        </header>

        <LiveMarketTicker />

        <section className='hero'>
            <p className='eyebrow'>FREE DERIV BOTS, AUTOMATION, AND TRADING TOOLS IN ONE WORKSPACE</p>
            <h1>Welcome to <span>riskmanagers.site</span></h1>
            <p className='hero-copy'>Structured trading, built for focus. Build, load, and run Deriv bot strategies from a focused workspace<br className='desktop-break' /> made for everyday traders.</p>
            <div className='hero-actions'>
                <button className='primary-button' type='button' onClick={goToLogin}><span aria-hidden='true'>⌁</span> Log in <b aria-hidden='true'>›</b></button>
                <button className='secondary-button' type='button' onClick={goToSignUp}><span aria-hidden='true'>ϟ</span> Create Free Account</button>
            </div>
        </section>

        <section className='live-workspace' aria-labelledby='live-workspace-title'>
            <span className='disclaimer'>Risk Disclaimer</span>
            <h2 id='live-workspace-title'>Live Deriv workspace</h2>
            <p>Prices above are streamed directly from Deriv. Sign in with your Deriv account to open the trading workspace and use your own account data.</p>
        </section>

        <footer className='landing-footer'>© 2026 riskmanagers.site. All rights reserved. © 2026 riskmanagers.site. All rights reserved.</footer>
    </main>
);

export default LandingPage;
