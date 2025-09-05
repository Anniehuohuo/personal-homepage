import React, { useState, useEffect } from 'react';
import './Skills.css';

/**
 * 技能展示页面组件
 * 展示个人技能分类、熟练度和相关项目经验
 */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [animatedSkills, setAnimatedSkills] = useState(new Set());

  // 技能数据配置
  const skillsData = {
    frontend: {
      title: '前端开发',
      icon: '🎨',
      skills: [
        { name: 'HTML5', level: 90, icon: '📄', color: '#e34c26' },
        { name: 'CSS3', level: 85, icon: '🎨', color: '#1572b6' },
        { name: 'JavaScript', level: 88, icon: '⚡', color: '#f7df1e' },
        { name: 'React', level: 82, icon: '⚛️', color: '#61dafb' },
        { name: 'Vue.js', level: 75, icon: '💚', color: '#4fc08d' },
        { name: 'TypeScript', level: 70, icon: '📘', color: '#3178c6' }
      ]
    },
    backend: {
      title: '后端开发',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 80, icon: '🟢', color: '#339933' },
        { name: 'Python', level: 85, icon: '🐍', color: '#3776ab' },
        { name: 'Java', level: 75, icon: '☕', color: '#ed8b00' },
        { name: 'Express.js', level: 78, icon: '🚀', color: '#000000' },
        { name: 'MongoDB', level: 72, icon: '🍃', color: '#47a248' },
        { name: 'MySQL', level: 80, icon: '🐬', color: '#4479a1' }
      ]
    },
    tools: {
      title: '开发工具',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 85, icon: '📚', color: '#f05032' },
        { name: 'VS Code', level: 90, icon: '💻', color: '#007acc' },
        { name: 'Webpack', level: 70, icon: '📦', color: '#8dd6f9' },
        { name: 'Docker', level: 65, icon: '🐳', color: '#2496ed' },
        { name: 'Figma', level: 75, icon: '🎯', color: '#f24e1e' },
        { name: 'Photoshop', level: 68, icon: '🖼️', color: '#31a8ff' }
      ]
    },
    soft: {
      title: '软技能',
      icon: '🧠',
      skills: [
        { name: '团队协作', level: 88, icon: '🤝', color: '#ff6b6b' },
        { name: '问题解决', level: 85, icon: '🔍', color: '#4ecdc4' },
        { name: '学习能力', level: 92, icon: '📚', color: '#45b7d1' },
        { name: '沟通表达', level: 80, icon: '💬', color: '#96ceb4' },
        { name: '项目管理', level: 75, icon: '📋', color: '#feca57' },
        { name: '创新思维', level: 83, icon: '💡', color: '#ff9ff3' }
      ]
    }
  };

  /**
   * 组件挂载后启动技能条动画
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSkills = skillsData[activeCategory].skills;
      currentSkills.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => new Set([...prev, `${activeCategory}-${index}`]));
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  /**
   * 切换技能分类
   * @param {string} category - 技能分类
   */
  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setAnimatedSkills(new Set());
      setActiveCategory(category);
    }
  };

  /**
   * 获取技能等级描述
   * @param {number} level - 技能等级
   * @returns {string} 等级描述
   */
  const getSkillLevelText = (level) => {
    if (level >= 90) return '专家级';
    if (level >= 80) return '熟练';
    if (level >= 70) return '良好';
    if (level >= 60) return '入门';
    return '学习中';
  };

  return (
    <div className="skills-page">
      <div className="skills-container">
        {/* 页面标题 */}
        <div className="skills-header">
          <h1 className="skills-title">
            <span className="title-icon">💻</span>
            技能展示
          </h1>
          <p className="skills-subtitle">
            持续学习，不断进步，用技术创造价值
          </p>
        </div>

        {/* 技能分类导航 */}
        <div className="skills-categories">
          {Object.entries(skillsData).map(([key, category]) => (
            <button
              key={key}
              className={`category-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-title">{category.title}</span>
            </button>
          ))}
        </div>

        {/* 技能展示区域 */}
        <div className="skills-content">
          <div className="skills-grid">
            {skillsData[activeCategory].skills.map((skill, index) => {
              const skillKey = `${activeCategory}-${index}`;
              const isAnimated = animatedSkills.has(skillKey);
              
              return (
                <div 
                  key={skillKey}
                  className={`skill-card ${isAnimated ? 'animated' : ''}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="skill-header">
                    <div className="skill-info">
                      <span 
                        className="skill-icon"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </span>
                      <h3 className="skill-name">{skill.name}</h3>
                    </div>
                    <div className="skill-level-text">
                      {getSkillLevelText(skill.level)}
                    </div>
                  </div>
                  
                  <div className="skill-progress">
                    <div className="progress-track">
                      <div 
                        className={`progress-fill ${isAnimated ? 'animate' : ''}`}
                        style={{ 
                          '--target-width': `${skill.level}%`,
                          '--skill-color': skill.color
                        }}
                      ></div>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 技能总结 */}
        <div className="skills-summary">
          <div className="summary-card">
            <h3 className="summary-title">
              <span className="summary-icon">🎯</span>
              技能特点
            </h3>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">全栈开发</span>
                <span className="summary-desc">具备前后端完整开发能力</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">快速学习</span>
                <span className="summary-desc">能够快速掌握新技术和框架</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">实战经验</span>
                <span className="summary-desc">参与多个实际项目开发</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">团队合作</span>
                <span className="summary-desc">良好的沟通和协作能力</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;