document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    const sections = document.querySelectorAll('.section');
    const spinBtn = document.getElementById('spin-btn');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('winSound');
    let spinning = false;

    // 定义轮盘选项数组和对应概率
    const options = [
        { name: "1", probability: 0.5 },
        { name: "2", probability: 0.7 },
        { name: "3", probability: 0.5 },
        { name: "4", probability: 0.5 },
        { name: "5", probability: 0.1 }, // 10%概率
        { name: "6", probability: 0.5 },
        { name: "7", probability: 0.5 },
        { name: "8", probability: 0.5 }
    ];

    // 根据概率选择结果
    function selectResult() {
        const random = Math.random();
        let currentProb = 0;
        
        // 计算总概率
        const totalProb = options.reduce((sum, option) => sum + option.probability, 0);
        
        // 归一化概率并选择结果
        for (let i = 0; i < options.length; i++) {
            currentProb += options[i].probability / totalProb;
            if (random <= currentProb) {
                return i;
            }
        }
        return options.length - 1;
    }

    // 清除所有选中效果
    function clearSelection() {
        sections.forEach(section => {
            section.classList.remove('selected');
        });
    }

    // 重置轮盘位置和效果
    function resetWheel() {
        clearSelection(); // 清除发光效果
        wheel.style.transition = 'none';
        wheel.style.transform = 'rotate(0deg)';
        wheel.offsetHeight;
        wheel.style.transition = 'transform 4s ease-out';
    }

    spinBtn.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;
        
        // 播放旋转音效
        spinSound.currentTime = 0;
        spinSound.play();
        
        // 根据概率选择结果
        const selectedSection = selectResult();
        
        // 计算需要旋转的角度
        const rotations = 5 + Math.random() * 5; // 基础旋转圈数
        const targetAngle = (360 - (selectedSection * 45)) % 360; // 目标角度
        const totalRotation = (rotations * 360) + targetAngle;
        
        wheel.style.transform = `rotate(${totalRotation}deg)`;
        
        setTimeout(() => {
            spinning = false;
            // 停止旋转音效
            spinSound.pause();
            sections[selectedSection].classList.add('selected');
            
            // 播放中奖音效
            winSound.currentTime = 0;
            winSound.play();
            
            setTimeout(() => {
                alert(`恭喜，你抽中了${options[selectedSection].name}！`);
                // 在弹窗关闭后重置轮盘
                setTimeout(resetWheel, 0);
            }, 500);
        }, 4000);
    });

    // 初始化轮盘状态
    resetWheel();
}); 