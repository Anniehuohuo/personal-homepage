import React, { useEffect, useRef, useState } from 'react';
import './SnowflakeEffect.css';

/**
 * 黑色雪花鼠标跟随特效组件
 * 实现鼠标移动时产生雪花粒子效果，增强交互体验
 */
const SnowflakeEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);
  const snowflakeIdRef = useRef(0);
  const containerRef = useRef(null);

  /**
   * 创建单个雪花粒子
   * @param {number} x - 鼠标X坐标
   * @param {number} y - 鼠标Y坐标
   */
  const createSnowflake = (x, y) => {
    const id = snowflakeIdRef.current++;
    const size = Math.random() * 6 + 2; // 雪花大小：2-8px
    const duration = Math.random() * 2 + 1; // 动画时长：1-3秒
    const angle = Math.random() * 360; // 随机角度
    const distance = Math.random() * 100 + 50; // 飘散距离：50-150px
    
    const newSnowflake = {
      id,
      x,
      y,
      size,
      duration,
      angle,
      distance,
      opacity: Math.random() * 0.8 + 0.2 // 透明度：0.2-1.0
    };

    setSnowflakes(prev => [...prev, newSnowflake]);

    // 动画结束后移除雪花
    setTimeout(() => {
      setSnowflakes(prev => prev.filter(flake => flake.id !== id));
    }, duration * 1000);
  };

  /**
   * 处理鼠标移动事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  const handleMouseMove = (e) => {
    // 限制雪花生成频率，避免性能问题
    if (Math.random() > 0.7) {
      createSnowflake(e.clientX, e.clientY);
    }
  };

  /**
   * 处理鼠标点击事件，产生更多雪花
   * @param {MouseEvent} e - 鼠标事件对象
   */
  const handleMouseClick = (e) => {
    // 点击时产生多个雪花
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        createSnowflake(e.clientX + offsetX, e.clientY + offsetY);
      }, i * 50);
    }
  };

  // 组件挂载时添加事件监听器
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('click', handleMouseClick);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleMouseClick);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="snowflake-container">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.x,
            top: flake.y,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            '--duration': `${flake.duration}s`,
            '--angle': `${flake.angle}deg`,
            '--distance': `${flake.distance}px`
          }}
        >
          {/* 雪花形状 */}
          <div className="snowflake-shape">
            <div className="snowflake-line snowflake-line-1"></div>
            <div className="snowflake-line snowflake-line-2"></div>
            <div className="snowflake-line snowflake-line-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnowflakeEffect;