// PrettyQueue Studio App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get service items (not cards)
    const manicureItem = document.querySelector('.service-item:first-child');
    const eyelashItem = document.querySelector('.service-item:last-child');
    
    // Add click event listeners
    if (manicureItem) {
        manicureItem.addEventListener('click', function() {
            handleServiceSelection('manicure', 'ทำเล็บ');
        });
    }
    
    if (eyelashItem) {
        eyelashItem.addEventListener('click', function() {
            handleServiceSelection('eyelash', 'ต่อขนตา');
        });
    }
    
    // Add touch support for mobile
    addTouchSupport();
    
    // Add keyboard navigation
    addKeyboardSupport();
});

// Handle service selection
function handleServiceSelection(serviceType, serviceName) {
    showNotification(`เลือกบริการ: ${serviceName}`, 'success');
    console.log(`Selected service: ${serviceType}`);
    
    // Navigate to service page
    setTimeout(() => {
        if (serviceType === 'manicure') {
            window.location.href = 'nail-packages.html';
        } else if (serviceType === 'eyelash') {
            // จะทำหน้าต่อขนตาในภายหลัง
            showNotification('กำลังพัฒนาหน้านี้...', 'info');
        }
    }, 500);
}

// Show notification
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

function addTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
    });
}

function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const firstItem = document.querySelector('.service-item:first-child');
            if (firstItem) firstItem.click();
        }
        
        if (e.key === ' ') {
            e.preventDefault();
            const secondItem = document.querySelector('.service-item:last-child');
            if (secondItem) secondItem.click();
        }
        
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification-toast');
            notifications.forEach(notification => {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            });
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-toast .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-toast .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .notification-toast .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(style);

setTimeout(() => {
    showNotification('ยินดีต้อนรับสู่ PrettyQueue Studio!', 'info');
}, 1000);