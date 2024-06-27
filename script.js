function startCelebration() {
    showPage('countdown-page');
    startCountdown(10, 'countdown', function() {
        showEnvelope();
    });
}

function startCountdown(seconds, elementId, callback) {
    let countdownElement = document.getElementById(elementId);
    let interval = setInterval(function() {
        countdownElement.innerHTML = seconds;

        seconds--;
        // 显示额外图片逻辑
        if (seconds === 7) {
            document.querySelector('.extra-image').classList.remove('hidden');
        }
        // 隐藏额外图片逻辑
        if (seconds === 1) {
            document.querySelector('.extra-image').classList.add('hidden');
        }
        if (seconds < 0) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function showEnvelope() {
    let envelope = document.getElementById('envelope');
    envelope.classList.remove('hidden');
    envelope.style.opacity = '1'; // 确保信封显示
}

function openEnvelope() {
    showPage('letter-page');
    setTimeout(function() {
        let letter = document.getElementById('letter');
        letter.classList.add('open');
    }, 500); // 等待页面跳转后再开始动画
}

function startSlideshow() {
    let images = document.querySelectorAll('#slideshow img');
    let currentIndex = 0;
    images[currentIndex].classList.add('active');
    setInterval(function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}

function showPage(pageId) {
    document.querySelectorAll('.reject-button').forEach(function(button) {
        button.remove();
    });
    document.querySelectorAll('.page').forEach(function(page) {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // 添加以下代码以确保在显示页面时重置状态
    if (pageId === 'welcome-page') {
        resetCelebration(); // 添加重置函数
    }
}

function resetCelebration() {
    // 这里添加所有需要重置的状态或逻辑
    let letter = document.getElementById('letter');
    letter.classList.remove('open'); // 关闭信封动画
    let images = document.querySelectorAll('#slideshow img');
    images.forEach(function(img) {
        img.classList.remove('active'); // 重置幻灯片状态
    });
}

function nextPage(pageId) {
    showPage(pageId);
}

function tooGood() {
    let rejectionMessage = document.createElement('p');
    rejectionMessage.textContent = '耶!太好了！';
    document.getElementById('reject-page').appendChild(rejectionMessage);
    setTimeout(function() {
        nextPage('confession-page');
    }, 1000); // 2秒后跳回告白页
}

// 隨機生成"你按不到我"按鈕
function showRejectButton() {
    let rejectButton = document.createElement('button');
    rejectButton.innerText = '我不給你拒絕啊';
    rejectButton.classList.add('reject-button');
    let randomLeft = Math.floor(Math.random() * (window.innerWidth - 150)); // 控制左邊距
    let randomTop = Math.floor(Math.random() * (window.innerHeight - 50)); // 控制上邊距
    rejectButton.style.left = randomLeft + 'px';
    rejectButton.style.top = randomTop + 'px';
    document.body.appendChild(rejectButton);

    // 點擊後移除按鈕並重新生成
    rejectButton.addEventListener('click', function() {
        rejectButton.remove();
        showRejectButton(); // 重新生成按鈕
    });
}

// 殘忍拒絕功能
function cruelReject() {
    document.getElementById('cruel-button').remove(); // 移除殘忍拒絕按鈕
    showRejectButton(); // 顯示"你按不到我"按鈕
}

// 顯示拒絕選項頁面
function showRejectOptions() {
    showPage('reject-page');
}

// 不忍拒絕功能
function tooGoodToReject() {
    showRejectButton(); // 顯示"你按不到我"按鈕
}

// 初始显示欢迎页
showPage('welcome-page');

// 结尾页再看一次按钮点击事件
document.getElementById('end-page').querySelector('button').addEventListener('click', function() {
    location.reload(); // 刷新页面
});
