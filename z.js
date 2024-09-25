const container = document.getElementById('container');   // 获取页面中的容器元素，用于存放小球
const balls = [];   // 声明数组balls用来存储小球
const numBalls = 30; // 设置小球数量为30个  

// 创建小球  
for (let i = 0; i < numBalls; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    // 设置小球的初始位置在左上角坐标，确保小球不超出窗口
    ball.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    ball.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    // 设置小球的速度，速度范围在 1 到 5 像素  
    ball.velocityX = Math.random() * 6 + 1; // 水平速度  
    ball.velocityY = Math.random() * 6 + 1; // 垂直速度 
    balls.push(ball);
    container.appendChild(ball);
}

// 更新小球位置  
function updateBalls() {
    balls.forEach(ball => {
        let rect = ball.getBoundingClientRect();  // 获取小球的边界信息

        // 碰撞检测与反弹  
        // 检查小球是否碰到窗口的左边界或右边界
        if (rect.left <= 0 || rect.right >= window.innerWidth) {
            ball.velocityX *= -1; // 如果碰到边界，反向小球的水平速度
        }
        // 检查小球是否碰到窗口的上边界或下边界
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
            ball.velocityY *= -1; // 如果碰到边界，反向小球的垂直速度
        }

        // 碰撞检测与变色  
        balls.forEach(otherBall => {
            if (ball !== otherBall) {
                let otherRect = otherBall.getBoundingClientRect();   // 获取其他小球的边界信息
                // 检查当前小球与其他小球是否发生碰撞 
                if (rect.left < otherRect.right && rect.right > otherRect.left &&
                    rect.top < otherRect.bottom && rect.bottom > otherRect.top) {
                    // 如果发生碰撞，随机生成颜色并改变两个小球的颜色
                    ball.style.backgroundColor = getRandomColor();
                    otherBall.style.backgroundColor = getRandomColor();
                }
            }
        });

        // 更新位置
        // 根据当前速度更新小球的水平和垂直位置
        ball.style.left = rect.left + ball.velocityX + 'px';
        ball.style.top = rect.top + ball.velocityY + 'px';
    });
    requestAnimationFrame(updateBalls);  // 使用 requestAnimationFrame 进行下一帧更新，保持动画效果流畅 
}

// 随机颜色生成函数  
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 启动动画  
updateBalls();