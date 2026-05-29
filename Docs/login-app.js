(function() {
    const css = `
        :root {
            --bg-color: #08090b;
            --grid-color: rgba(255, 255, 255, 0.015);
            --card-bg: #0f1115;
            --border-color: rgba(255, 255, 255, 0.08);
            --text-main: #ffffff;
            --text-sub: #5c6475;
            --discord-color: #5865F2;
            --discord-hover: #4752C4;
            --error-color: #ef4444;
            --success-color: #22c55e;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: var(--bg-color);
            background-image: 
                linear-gradient(var(--grid-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 40px 40px;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .container {
            width: 100%;
            max-width: 500px;
            padding: 20px;
            text-align: center;
            box-sizing: border-box;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                        filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                        opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .page-exit {
            transform: scale(0.96) !important;
            filter: blur(15px) !important;
            opacity: 0 !important;
        }

        @keyframes pulse {
            0%, 100% { background-color: #121318; }
            50% { background-color: #1c1e24; }
        }

        .skeleton-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }

        .skeleton {
            animation: pulse 1.5s infinite ease-in-out;
            border-radius: 8px;
        }

        .skeleton-title {
            width: 280px;
            height: 48px;
            border-radius: 6px;
        }

        .skeleton-subtitle {
            width: 200px;
            height: 20px;
            margin-bottom: 12px;
            border-radius: 4px;
        }

        .skeleton-buttons {
            display: flex;
            gap: 12px;
            width: 100%;
            justify-content: center;
        }

        .skeleton-btn-main {
            width: 160px;
            height: 48px;
            border-radius: 16px;
        }

        .skeleton-btn-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
        }

        .content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }

        .hidden {
            display: none !important;
        }

        h1 {
            font-size: 42px;
            font-weight: 700;
            color: var(--text-main);
            margin: 0;
            letter-spacing: 1px;
        }

        p {
            font-size: 18px;
            color: var(--text-sub);
            margin: 0 0 12px 0;
            font-weight: 400;
        }

        .button-group {
            display: flex;
            gap: 12px;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 48px;
            border-radius: 16px;
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            color: var(--text-main);
            text-decoration: none;
            transition: background-color 0.2s, border-color 0.2s, transform 0.1s;
            box-sizing: border-box;
            cursor: pointer;
        }

        .btn:hover {
            background-color: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.15);
        }

        .btn:active {
            transform: scale(0.98);
        }

        .btn-main {
            padding: 0 24px;
            font-size: 16px;
            font-weight: 600;
            gap: 8px;
        }

        .btn-icon {
            width: 48px;
            padding: 0;
            flex-shrink: 0;
        }

        .btn svg {
            flex-shrink: 0;
        }

        @keyframes blurIn {
            from {
                filter: blur(12px);
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                filter: blur(0);
                opacity: 1;
                transform: translateY(0);
            }
        }

        .blur-item {
            opacity: 0;
            animation: blurIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.5s; }
        .delay-4 { animation-delay: 0.6s; }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(8, 9, 12, 0.85);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .overlay.active {
            opacity: 1;
        }

        .modal {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 32px;
            width: 90%;
            max-width: 340px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                        max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
            box-sizing: border-box;
        }

        .modal.state-loading {
            max-height: 180px;
        }

        .modal.state-error {
            max-height: 380px;
        }

        .modal.state-success {
            max-height: 250px;
        }

        .overlay.active .modal {
            transform: scale(1);
        }

        .modal-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }

        .spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: var(--discord-color);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .modal-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--text-main);
            margin: 0;
        }

        .modal-desc {
            font-size: 14px;
            color: var(--text-sub);
            margin: 0;
            line-height: 1.5;
        }

        .icon-wrapper {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .icon-error {
            background-color: rgba(239, 68, 68, 0.1);
            color: var(--error-color);
        }

        .icon-success {
            background-color: rgba(34, 197, 94, 0.1);
            color: var(--success-color);
        }

        .modal-actions {
            display: flex;
            gap: 10px;
            width: 100%;
            margin-top: 8px;
        }

        .modal-btn {
            flex: 1;
            height: 40px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
        }

        .modal-state:not(.hidden) .modal-anim-1 { animation: blurIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.05s; opacity: 0; }
        .modal-state:not(.hidden) .modal-anim-2 { animation: blurIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.15s; opacity: 0; }
        .modal-state:not(.hidden) .modal-anim-3 { animation: blurIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.25s; opacity: 0; }
        .modal-state:not(.hidden) .modal-anim-4 { animation: blurIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.35s; opacity: 0; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const html = `
        <div class="container">
            <div id="skeleton" class="skeleton-wrapper">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-subtitle"></div>
                <div class="skeleton-buttons">
                    <div class="skeleton skeleton-btn-main"></div>
                    <div class="skeleton skeleton-btn-icon"></div>
                </div>
            </div>

            <div id="content" class="content-wrapper hidden">
                <h1 class="blur-item delay-1">BENG UI | WEB</h1>
                <p class="blur-item delay-2">For Roblox Executor Script UI</p>
                
                <div class="button-group">
                    <button id="btn-get-started" class="btn btn-main blur-item delay-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Get Started
                    </button>
                    
                    <a href="https://discord.gg/YOUR_INVITE_CODE" class="btn btn-icon blur-item delay-4" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.578-.406.837a12.09 12.09 0 0 0-3.658 0 8.284 8.284 0 0 0-.411-.837.05.05 0 0 0-.052-.025 13.229 13.229 0 0 0-3.257 1.011.05.05 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032a.054.054 0 0 0 .021.037 13.736 13.736 0 0 0 4.14 2.095.05.05 0 0 0 .054-.018c.372-.508.7-.1.974-1.546a.05.05 0 0 0-.027-.053 9.001 9.001 0 0 1-1.297-.61.05.05 0 0 1-.005-.082c.088-.066.176-.13.26-.198a.05.05 0 0 1 .051-.007c2.562 1.171 5.333 1.171 7.858 0a.05.05 0 0 1 .052.007c.085.068.172.132.26.198a.05.05 0 0 1-.005.082 8.51 8.51 0 0 1-1.296.61a.05.05 0 0 0-.028.054c.275.52.6.1.972 1.542a.05.05 0 0 0 .054.019 13.715 13.715 0 0 0 4.14-2.095.054.054 0 0 0 .021-.037c.384-3.526-.583-6.524-2.338-9.107a.05.05 0 0 0-.022-.018zM5.14 9.452c-.784 0-1.43-.722-1.43-1.61 0-.889.632-1.61 1.43-1.61.802 0 1.44.721 1.43 1.61 0 .888-.628 1.61-1.43 1.61zm5.72 0c-.784 0-1.43-.722-1.43-1.61 0-.889.631-1.61 1.43-1.61.802 0 1.44.721 1.43 1.61 0 .888-.631 1.61-1.43 1.61z"/>
                    </svg>
                </a>
            </div>
        </div>

        <div id="verify-overlay" class="overlay hidden">
            <div class="modal state-loading" id="verify-modal">
                <div id="state-loading" class="modal-state">
                    <div class="modal-anim-1">
                        <div class="spinner"></div>
                    </div>
                    <h3 class="modal-title modal-anim-2">Verifying Connection</h3>
                    <p class="modal-desc modal-anim-3">Checking your Discord account linkage...</p>
                </div>

                <div id="state-error" class="modal-state hidden">
                    <div class="icon-wrapper icon-error modal-anim-1" id="icon-error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h3 class="modal-title modal-anim-2">Verification Failed</h3>
                    <p class="modal-desc modal-anim-3">No Discord connection detected. Please bind your account to gain access.</p>
                    <div class="modal-actions modal-anim-4">
                        <button id="btn-modal-close" class="btn modal-btn">Cancel</button>
                        <button id="btn-modal-link" class="btn modal-btn btn-primary" style="background-color: var(--discord-color); border-color: transparent;">Bind Account</button>
                    </div>
                </div>

                <div id="state-success" class="modal-state hidden">
                    <div class="icon-wrapper icon-success modal-anim-1" id="icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h3 class="modal-title modal-anim-2">Success!</h3>
                    <p class="modal-desc modal-anim-3">Discord verified successfully. Redirecting you to the workspace...</p>
                </div>
            </div>
        </div>
    `;

    const rootEl = document.getElementById('root');
    if (rootEl) {
        rootEl.innerHTML = html;
    }

    const CLIENT_ID = '1370027240863301642';
    const WORKER_URL = 'https://tiny-sun-9908.2176671594.workers.dev';
    const REDIRECT_URI = encodeURIComponent(`${WORKER_URL}/callback`);
    const SUCCESS_REDIRECT_URL = 'dashboard.html';

    let isDiscordLinked = localStorage.getItem('discord_linked') === 'true';

    setTimeout(() => {
        const skeleton = document.getElementById('skeleton');
        const content = document.getElementById('content');
        if (skeleton && content) {
            skeleton.style.display = 'none';
            content.classList.remove('hidden');
        }
    }, 1500);

    const getStartedBtn = document.getElementById('btn-get-started');
    const overlay = document.getElementById('verify-overlay');
    const modal = document.getElementById('verify-modal');
    const stateLoading = document.getElementById('state-loading');
    const stateError = document.getElementById('state-error');
    const stateSuccess = document.getElementById('state-success');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const modalLinkBtn = document.getElementById('btn-modal-link');

    function showState(state) {
        stateLoading.classList.add('hidden');
        stateError.classList.add('hidden');
        stateSuccess.classList.add('hidden');

        modal.className = 'modal';

        if (state === 'loading') {
            modal.classList.add('state-loading');
            stateLoading.classList.remove('hidden');
        }
        if (state === 'error') {
            modal.classList.add('state-error');
            stateError.classList.remove('hidden');
            const icon = document.getElementById('icon-error');
            if (icon) {
                icon.style.transform = 'scale(0.5)';
                setTimeout(() => icon.style.transform = 'scale(1)', 50);
            }
        }
        if (state === 'success') {
            modal.classList.add('state-success');
            stateSuccess.classList.remove('hidden');
            const icon = document.getElementById('icon-success');
            if (icon) {
                icon.style.transform = 'scale(0.5)';
                setTimeout(() => icon.style.transform = 'scale(1)', 50);
            }
        }
    }

    function exitAndRedirect(url) {
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = url;
            }, 550);
        } else {
            window.location.href = url;
        }
    }

    function runVerificationFlow() {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('active'), 10);
        showState('loading');

        setTimeout(() => {
            if (isDiscordLinked) {
                showState('success');
                setTimeout(() => {
                    exitAndRedirect(SUCCESS_REDIRECT_URL);
                }, 1800);
            } else {
                showState('error');
            }
        }, 2000);
    }

    getStartedBtn.addEventListener('click', runVerificationFlow);

    modalCloseBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.classList.add('hidden'), 400);
    });

    modalLinkBtn.addEventListener('click', () => {
        const width = 500;
        const height = 800;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);
        const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`;
        window.open(discordAuthUrl, 'DiscordAuth', `width=${width},height=${height},top=${top},left=${left}`);
    });

    window.addEventListener('message', (event) => {
        if (event.origin !== WORKER_URL) return;

        if (event.data && event.data.type === 'DISCORD_BIND_SUCCESS') {
            isDiscordLinked = true;
            localStorage.setItem('discord_linked', 'true');
            localStorage.setItem('discord_user', JSON.stringify(event.data.user));
            showState('success');
            setTimeout(() => {
                exitAndRedirect(SUCCESS_REDIRECT_URL);
            }, 1800);
        }
    });
})();
