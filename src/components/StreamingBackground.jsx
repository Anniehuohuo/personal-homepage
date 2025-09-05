import React from 'react';
import './StreamingBackground.css';

/**
 * 流光背景动效组件
 * 创建动态渐变背景效果，营造现代科技感氛围
 */
const StreamingBackground = () => {
  return (
    <div className="streaming-background">
      {/* 主要流光层 */}
      <div className="stream-layer stream-layer-1"></div>
      <div className="stream-layer stream-layer-2"></div>
      <div className="stream-layer stream-layer-3"></div>
      
      {/* 粒子效果层 */}
      <div className="particles">
        {/* 生成多个粒子元素 */}
        {Array.from({ length: 20 }, (_, index) => (
          <div 
            key={index} 
            className="particle" 
            style={{
              '--delay': `${index * 0.5}s`,
              '--duration': `${8 + Math.random() * 4}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StreamingBackground;