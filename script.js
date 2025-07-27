// Navigation state
let currentSection = 0;
let currentItem = 0;
const sections = document.querySelectorAll('.section');
let isPageLoading = true;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to prevent unwanted actions during page load
    setTimeout(() => {
        updateFocus();
        
        // Focus first item in first section
        if (sections.length > 0) {
            const firstSectionItems = sections[0].querySelectorAll('.menu-item');
            if (firstSectionItems.length > 0) {
                firstSectionItems[0].classList.add('focused');
            }
        }
        
        // Mark page as fully loaded
        isPageLoading = false;
    }, 100);
});

// Update visual focus
function updateFocus() {
    // Clear all focus
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('focused');
    });
    
    // Add focus to current item
    if (sections[currentSection]) {
        const items = sections[currentSection].querySelectorAll('.menu-item');
        if (items[currentItem]) {
            items[currentItem].classList.add('focused');
        }
    }
}

// Navigation functions
function navigateDown() {
    if (isPageLoading) return; // Prevent navigation during page load
    
    const currentSectionItems = sections[currentSection].querySelectorAll('.menu-item');
    
    if (currentItem < currentSectionItems.length - 1) {
        currentItem++;
    } else {
        // Move to next section
        if (currentSection < sections.length - 1) {
            currentSection++;
            currentItem = 0;
        } else {
            // Wrap to first section
            currentSection = 0;
            currentItem = 0;
        }
    }
    updateFocus();
}

function navigateUp() {
    if (isPageLoading) return; // Prevent navigation during page load
    
    if (currentItem > 0) {
        currentItem--;
    } else {
        // Move to previous section
        if (currentSection > 0) {
            currentSection--;
            const prevSectionItems = sections[currentSection].querySelectorAll('.menu-item');
            currentItem = prevSectionItems.length - 1;
        } else {
            // Wrap to last section
            currentSection = sections.length - 1;
            const lastSectionItems = sections[currentSection].querySelectorAll('.menu-item');
            currentItem = lastSectionItems.length - 1;
        }
    }
    updateFocus();
}

function navigateRight() {
    if (isPageLoading) return; // Prevent navigation during page load
    
    if (currentSection < sections.length - 1) {
        currentSection++;
        currentItem = 0;
        updateFocus();
    }
}

function navigateLeft() {
    if (isPageLoading) return; // Prevent navigation during page load
    
    if (currentSection > 0) {
        currentSection--;
        currentItem = 0;
        updateFocus();
    }
}

function selectCurrentItem() {
    if (isPageLoading) return; // Prevent selection during page load
    
    const currentItems = sections[currentSection].querySelectorAll('.menu-item');
    const selectedItem = currentItems[currentItem];
    
    if (selectedItem) {
        const key = selectedItem.getAttribute('data-key');
        handleKeyAction(key);
    }
}

// Handle key actions
function handleKeyAction(key) {
    if (isPageLoading) return; // Prevent actions during page load
    
    const actions = {
        '1': () => window.location.href = '/posts/debugging-react-performance',
        '2': () => window.location.href = '/posts/rust-ownership',
        '3': () => window.location.href = '/posts/nodejs-cli-tools',
        '4': () => window.location.href = '/posts/docker-optimization',
        'n': () => window.location.href = '/new-post',
        'f': () => window.location.href = '/search',
        'a': () => window.location.href = '/blog',
        't': () => window.location.href = '/tags',
        'g': () => window.open('https://github.com/yourusername', '_blank'),
        'r': () => window.location.href = '/resume',
        'c': () => window.location.href = '/contact',
        'b': () => window.location.href = '/about'
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
        // Show a farewell message
        document.body.style.background = '#1a1b26';
        document.body.innerHTML = `
            <div style="
                color: #c0caf5; 
                font-family: 'JetBrains Mono', monospace; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                text-align: center;
            ">
                <div>
                    <h2 style="color: #7aa2f7;">Thanks for visiting compErr!</h2>
                    <p style="color: #9ece6a; margin: 20px 0;">Press ${shortcut} to close this tab</p>
                    <p style="color: #565f89; font-size: 12px;">Or press F5 to restart</p>
                </div>
            </div>
        `;
        
        // Try to close anyway (might work in some contexts)
        try {
            window.close();
        } catch (e) {
            console.log('Cannot close window directly due to browser security');
        }
        
        // Try alternative methods
        setTimeout(() => {
            if (!window.closed) {
                try {
                    window.open('', '_self', '');
                    window.close();
                } catch (e) {
                    console.log('Alternative close method failed');
                }
            }
        }, 100);
    }
}

// Keyboard event handling
document.addEventListener('keydown', function(e) {
    // Prevent any actions during page load
    if (isPageLoading) {
        e.preventDefault();
        return;
    }
    
    // Only handle events if the target is not an input field
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
            
        case 'h':
        case 'ArrowLeft':
            e.preventDefault();
            navigateLeft();
            break;
            
        case 'l':
        case 'ArrowRight':
            e.preventDefault();
            navigateRight();
            break;
            
        case 'Enter':
            e.preventDefault();
            selectCurrentItem();
            break;
            
        case 'Escape':
            e.preventDefault();
            clearCommand();
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
            // Handle direct key actions - but only single character keys
            if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                handleKeyAction(e.key.toLowerCase());
            }
            break;
    }
});

// Command line functions
function clearCommand() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.textContent = '█';
    }
}

function showHelp() {
    alert(`Neovim-style Navigation:
    
Movement:
  j/↓    - Move down
  k/↑    - Move up  
  h/←    - Move left (sections)
  l/→    - Move right (sections)
  Enter  - Select item

Quick Keys:
  1-4    - Recent posts
  n      - New post
  f      - Find posts
  a      - All posts
  t      - Tags
  g      - GitHub
  r      - Resume
  c      - Contact
  b      - About

Other:
  ?      - This help
  Esc    - Clear command
  q      - Quit`);
}

// Mouse support (optional)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                if (isPageLoading) return; // Prevent during page load
                
                // Find which section and item this is
                const section = this.closest('.section');
                const sectionIndex = Array.from(sections).indexOf(section);
                const itemIndex = Array.from(section.querySelectorAll('.menu-item')).indexOf(this);
                
                currentSection = sectionIndex;
                currentItem = itemIndex;
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
    }, 150);
});

// Prevent any keyboard shortcuts during page load
window.addEventListener('load', function() {
    setTimeout(() => {
        isPageLoading = false;
    }, 200);
});

// Additional safety: Clear any stored focus on page unload
window.addEventListener('beforeunload', function() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('focused');
        item.blur();
    });
});
