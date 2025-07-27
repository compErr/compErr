// Navigation state
let currentItem = 0;
const menuItems = document.querySelectorAll('.menu-item');
let isPageLoading = true;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateFocus();
        
        // Focus first item
        if (menuItems.length > 0) {
            menuItems[0].classList.add('focused');
        }
        
        isPageLoading = false;
    }, 100);
});

// Update visual focus
function updateFocus() {
    menuItems.forEach(item => item.classList.remove('focused'));
    
    if (menuItems[currentItem]) {
        menuItems[currentItem].classList.add('focused');
    }
}

// Navigation functions
function navigateDown() {
    if (isPageLoading) return;
    
    currentItem = (currentItem + 1) % menuItems.length;
    updateFocus();
}

function navigateUp() {
    if (isPageLoading) return;
    
    currentItem = currentItem === 0 ? menuItems.length - 1 : currentItem - 1;
    updateFocus();
}

function selectCurrentItem() {
    if (isPageLoading) return;
    
    const selectedItem = menuItems[currentItem];
    if (selectedItem) {
        const key = selectedItem.getAttribute('data-key');
        handleKeyAction(key);
    }
}

// Handle key actions
function handleKeyAction(key) {
    if (isPageLoading) return;
    
    const actions = {
        '1': () => loadPage('latest-post'),
        '2': () => loadPage('all-posts'),
        '3': () => loadPage('tags'),
        '4': () => loadPage('search'),
        'g': () => window.open('https://github.com/yourusername', '_blank'),
        'r': () => window.location.href = '/resume',
        'c': () => window.location.href = '/contact',
        'a': () => window.location.href = '/about'
    };
    
    if (actions[key]) {
        actions[key]();
    }
}

// Enhanced quit function
function quitApplication() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? 'Cmd+W' : 'Ctrl+W';
    
    if (confirm(`Really quit? [y/N]\n\nPress ${shortcut} to close this tab`)) {
        document.body.innerHTML = `
            <div style="
                color: #c0caf5; 
                font-family: 'JetBrains Mono', monospace; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                text-align: center;
                background: #1a1b26;
            ">
                <div>
                    <h2 style="color: #7aa2f7;">Thanks for visiting compErr!</h2>
                    <p style="color: #9ece6a; margin: 20px 0;">Press ${shortcut} to close this tab</p>
                    <p style="color: #565f89; font-size: 12px;">Or press F5 to restart</p>
                </div>
            </div>
        `;
        
        try {
            window.close();
        } catch (e) {
            console.log('Cannot close window directly due to browser security');
        }
    }
}

// Keyboard event handling
document.addEventListener('keydown', function(e) {
    if (isPageLoading) {
        e.preventDefault();
        return;
    }
    
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(e.key) {
        case 'j':
        case 'ArrowDown':
            e.preventDefault();
            navigateDown();
            break;
            
        case 'k':
        case 'ArrowUp':
            e.preventDefault();
            navigateUp();
            break;
            
        case 'Enter':
            e.preventDefault();
            selectCurrentItem();
            break;
            
        case '?':
            e.preventDefault();
            showHelp();
            break;
            
        case 'q':
            e.preventDefault();
            quitApplication();
            break;
            
        default:
            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                handleKeyAction(e.key.toLowerCase());
            }
            break;
    }
});

function showHelp() {
    alert(`compErr Navigation:
    
Movement:
  j/↓    - Move down
  k/↑    - Move up  
  Enter  - Select item

Quick Keys:
  1      - Latest post
  2      - All posts
  3      - Tags
  4      - Search
  g      - GitHub
  r      - Resume
  c      - Contact
  a      - About

Other:
  ?      - This help
  q      - Quit`);
}

// Mouse support
menuItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        if (isPageLoading) return;
        currentItem = index;
        updateFocus();
    });
    
    item.addEventListener('click', function(e) {
        if (isPageLoading) {
            e.preventDefault();
            return;
        }
        
        const key = this.getAttribute('data-key');
        handleKeyAction(key);
    });
});

// Load page function (placeholder)
async function loadPage(page) {
    console.log(`Loading ${page}...`);
    // Implement your page loading logic here
}

// Prevent keyboard shortcuts during page load
window.addEventListener('load', function() {
    setTimeout(() => {
        isPageLoading = false;
    }, 200);
});
