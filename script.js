let currentItem = 0;
const menuItems = document.querySelectorAll('.menu-item');
let isPageLoading = true;
const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateFocus();
        
        if (menuItems.length > 0) {
            menuItems[0].classList.add('focused');
        }
        
        isPageLoading = false;
    }, 100);
});

function updateFocus() {
    menuItems.forEach(item => item.classList.remove('focused'));
    
    if (menuItems[currentItem]) {
        menuItems[currentItem].classList.add('focused');
    }
}

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

function getLatest() {
    const dir = "articles";

    
    return latestFile;
}

function loadPage(page,type) {
    if(type == 0){
        if(page === 'latest-post') {
            page = getLatest();
        }
        window.location.href = `/articles?page=${page}`;
    }
}

function handleKeyAction(key) {
    if (isPageLoading) return;
    
    const actions = {
        '1': () => loadPage('latest-post',0),
        '2': () => loadPage('all-posts',1),
        '3': () => tagSearch('tags'),
        '4': () => pageSearch('search'),
        'g': () => window.open('https://github.com/JJKVIT?tab=repositories', '_blank'),
        'r': () => window.location.href = '/resume',
        'c': () => window.location.href = '/about',
        'a': () => window.location.href = '/site_info'
    };
    
    if (actions[key]) {
        actions[key]();
    }
}

function quitApplication() {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? 'Cmd+W' : 'Ctrl+W';
    
    window.close();
}

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

window.addEventListener('load', function() {
    setTimeout(() => {
        isPageLoading = false;
    }, 200);
});
