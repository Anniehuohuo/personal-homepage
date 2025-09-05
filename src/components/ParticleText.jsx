import React, { useEffect, useRef, useState } from 'react';
import './ParticleText.css';

/**
 * 粒子文字特效组件
 * 实现"AI编程"文字的粒子扰动和鼠标悬停颗粒化散开效果
 */
const ParticleText = () => {
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  /**
   * 粒子类定义
   * 每个粒子包含位置、速度、颜色等属性
   */
  class Particle {
    constructor(x, y, originalX, originalY) {
      this.x = x;
      this.y = y;
      this.originalX = originalX;
      this.originalY = originalY;
      this.vx = 0;
      this.vy = 0;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.color = `rgba(138, 43, 226, ${this.opacity})`; // 深紫色
      this.returnSpeed = 0.05;
      this.disperseSpeed = Math.random() * 2 + 1;
    }

    /**
     * 更新粒子位置
     * @param {boolean} shouldDisperse - 是否应该散开
     * @param {number} mouseX - 鼠标X坐标
     * @param {number} mouseY - 鼠标Y坐标
     */
    update(shouldDisperse, mouseX = 0, mouseY = 0) {
      if (shouldDisperse) {
        // 计算与鼠标的距离和方向
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * this.disperseSpeed;
          this.vy += Math.sin(angle) * force * this.disperseSpeed;
        }
        
        // 添加随机扰动
        this.vx += (Math.random() - 0.5) * 0.5;
        this.vy += (Math.random() - 0.5) * 0.5;
        
        // 应用阻力
        this.vx *= 0.98;
        this.vy *= 0.98;
      } else {
        // 回到原位置
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.vx += dx * this.returnSpeed;
        this.vy += dy * this.returnSpeed;
        this.vx *= 0.9;
        this.vy *= 0.9;
      }
      
      this.x += this.vx;
      this.y += this.vy;
    }

    /**
     * 绘制粒子
     * @param {CanvasRenderingContext2D} ctx - 画布上下文
     */
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // 添加发光效果
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      
      ctx.restore();
    }
  }

  /**
   * 从文字创建粒子
   * 分析文字像素并生成对应的粒子
   */
  const createParticlesFromText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 设置文字样式 - 增大字体确保完整显示
    ctx.font = 'bold 180px Arial, sans-serif';
    ctx.fillStyle = '#8A2BE2';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 绘制文字
    const text = 'AI编程';
    const x = width / 2;
    const y = height / 2;
    ctx.fillText(text, x, y);
    
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    // 清空粒子数组
    particlesRef.current = [];
    
    // 从像素创建粒子
    const step = 4; // 采样步长，控制粒子密度
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];
        
        if (alpha > 128) { // 如果像素不透明
          // 添加一些随机偏移
          const offsetX = (Math.random() - 0.5) * 2;
          const offsetY = (Math.random() - 0.5) * 2;
          const particle = new Particle(
            x + offsetX, 
            y + offsetY, 
            x + offsetX, 
            y + offsetY
          );
          particlesRef.current.push(particle);
        }
      }
    }
    
    // 清空画布，准备绘制粒子
    ctx.clearRect(0, 0, width, height);
  };

  /**
   * 动画循环函数
   * 更新和绘制所有粒子
   */
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 更新和绘制粒子
    particlesRef.current.forEach(particle => {
      particle.update(isHovered);
      particle.draw(ctx);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  /**
   * 处理鼠标移动事件
   * 更新粒子的散开效果
   */
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particlesRef.current.forEach(particle => {
      particle.update(true, mouseX, mouseY);
    });
  };

  /**
   * 初始化组件
   * 设置画布尺寸并创建粒子
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 设置画布尺寸 - 增大尺寸确保文字完整显示
    canvas.width = 900;
    canvas.height = 250;
    
    // 创建粒子
    createParticlesFromText();
    
    // 开始动画
    animate();
    
    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /**
   * 监听悬停状态变化
   * 重新启动动画循环
   */
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  }, [isHovered]);

  return (
    <div className="particle-text-container">
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      />
      
      {/* 备用文字，用于无法显示canvas时 */}
      <div className="fallback-text">
        AI编程
      </div>
    </div>
  );
};

export default ParticleText;