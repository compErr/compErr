let isTerminalClosed = false;
let isTerminalMinimized = false;

function closeTerminal() {
    const terminal = document.getElementById('terminalContainer');
    const asciiBackground = document.getElementById('asciiBackground');
    const minimizedBar = document.getElementById('minimizedBar');
    
    if (terminal && asciiBackground) {
        terminal.style.display = 'none';
        asciiBackground.style.display = 'flex';
        isTerminalClosed = true;

        if (isTerminalMinimized && minimizedBar) {
            minimizedBar.classList.remove('visible');
            isTerminalMinimized = false;
        }
        
        asciiBackground.style.opacity = '0';
        setTimeout(() => {
            asciiBackground.style.opacity = '1';
        }, 100);
    }
}

function restoreTerminal() {
    const terminal = document.getElementById('terminalContainer');
    const asciiBackground = document.getElementById('asciiBackground');
    
    if (terminal && asciiBackground && isTerminalClosed) {
        asciiBackground.style.opacity = '0';
        setTimeout(() => {
            asciiBackground.style.display = 'none';
            terminal.style.display = 'block';
            terminal.style.opacity = '0';
            setTimeout(() => {
                terminal.style.opacity = '1';
            }, 100);
        }, 300);
        isTerminalClosed = false;
    }
}

function minTerminal() {
    const terminalContainer = document.getElementById('terminalContainer');
    const minimizedBar = document.getElementById('minimizedBar');
    
    if (terminalContainer && minimizedBar && !isTerminalMinimized) {
        terminalContainer.classList.add('minimized');
        isTerminalMinimized = true;

        setTimeout(() => {
            minimizedBar.classList.add('visible');
        }, 200);

        setTimeout(() => {
            terminalContainer.style.display = 'none';
        }, 400);
    }
}

function reopenFromMinimized() {
    const terminalContainer = document.getElementById('terminalContainer');
    const minimizedBar = document.getElementById('minimizedBar');

    if (terminalContainer && minimizedBar && isTerminalMinimized) {
        minimizedBar.classList.remove('visible');
        
        terminalContainer.style.display = 'block';
        
        setTimeout(() => {
            terminalContainer.classList.remove('minimized');
            isTerminalMinimized = false;
        }, 50);
    }
}

function maxTerminal() {
    const terminalContainer = document.getElementById('terminalContainer');
    if (terminalContainer) {
        terminalContainer.classList.add('maximizing');
        setTimeout(() => {
            window.location.href = 'articles.html';
        }, 400);
    }
}

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'j') {
        event.preventDefault(); 
        restoreTerminal();
    }
});
