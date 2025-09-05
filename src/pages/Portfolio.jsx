import React, { useState, useEffect } from 'react';
import './Portfolio.css';

/**
 * 项目作品集页面组件
 * 展示个人项目作品，支持分类筛选和详情查看
 */
const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 项目数据配置
  const projects = [
    {
      id: 1,
      title: '个人主页网站',
      category: 'web',
      description: '基于React开发的响应式个人主页，具有流光背景和雪花特效',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'CSS3', 'JavaScript', 'Vite'],
      features: [
        '响应式设计，支持多设备访问',
        '流光背景动效和雪花鼠标特效',
        '技能展示和项目作品集',
        '现代化UI设计'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'completed',
      date: '2024-01'
    },
    {
      id: 2,
      title: '任务管理应用',
      category: 'web',
      description: '功能完整的任务管理系统，支持项目分组和团队协作',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
      features: [
        '任务创建、编辑和状态管理',
        '项目分组和标签系统',
        '团队成员协作功能',
        '数据可视化报表'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'completed',
      date: '2023-12'
    },
    {
      id: 3,
      title: '天气预报小程序',
      category: 'mobile',
      description: '基于微信小程序开发的天气预报应用，支持多城市查询',
      image: '/api/placeholder/400/300',
      technologies: ['微信小程序', 'JavaScript', 'CSS3'],
      features: [
        '实时天气数据获取',
        '7天天气预报',
        '多城市管理',
        '天气预警提醒'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'completed',
      date: '2023-11'
    },
    {
      id: 4,
      title: '数据可视化大屏',
      category: 'visualization',
      description: '企业数据可视化展示大屏，实时展示业务指标和趋势',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'ECharts', 'WebSocket', 'D3.js'],
      features: [
        '实时数据更新',
        '多种图表类型',
        '响应式布局',
        '数据钻取功能'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'completed',
      date: '2023-10'
    },
    {
      id: 5,
      title: '在线学习平台',
      category: 'web',
      description: '在线教育平台，支持视频学习、作业提交和进度跟踪',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Python', 'Django', 'PostgreSQL'],
      features: [
        '视频播放和进度记录',
        '在线作业系统',
        '学习进度跟踪',
        '讨论区和问答'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'in-progress',
      date: '2024-01'
    },
    {
      id: 6,
      title: 'AI聊天机器人',
      category: 'ai',
      description: '基于自然语言处理的智能聊天机器人，支持多轮对话',
      image: '/api/placeholder/400/300',
      technologies: ['Python', 'TensorFlow', 'Flask', 'NLP'],
      features: [
        '自然语言理解',
        '多轮对话管理',
        '情感分析',
        '知识库问答'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'planning',
      date: '2024-02'
    }
  ];

  // 筛选分类配置
  const filterCategories = [
    { key: 'all', label: '全部', icon: '🌟' },
    { key: 'web', label: 'Web应用', icon: '🌐' },
    { key: 'mobile', label: '移动应用', icon: '📱' },
    { key: 'visualization', label: '数据可视化', icon: '📊' },
    { key: 'ai', label: 'AI项目', icon: '🤖' }
  ];

  /**
   * 根据筛选条件过滤项目
   */
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  /**
   * 处理筛选器切换
   * @param {string} filter - 筛选条件
   */
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  /**
   * 打开项目详情模态框
   * @param {Object} project - 项目对象
   */
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  /**
   * 关闭项目详情模态框
   */
  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  /**
   * 获取项目状态显示文本
   * @param {string} status - 项目状态
   * @returns {Object} 状态信息
   */
  const getStatusInfo = (status) => {
    const statusMap = {
      completed: { text: '已完成', color: '#4ade80', icon: '✅' },
      'in-progress': { text: '进行中', color: '#fbbf24', icon: '🚧' },
      planning: { text: '规划中', color: '#60a5fa', icon: '📋' }
    };
    return statusMap[status] || statusMap.completed;
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        {/* 页面标题 */}
        <div className="portfolio-header">
          <h1 className="portfolio-title">
            <span className="title-icon">🎨</span>
            项目作品集
          </h1>
          <p className="portfolio-subtitle">
            展示我的技术实践和创意作品，每个项目都是学习和成长的见证
          </p>
        </div>

        {/* 项目筛选器 */}
        <div className="portfolio-filters">
          {filterCategories.map((category) => (
            <button
              key={category.key}
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => handleFilterChange(category.key)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </div>

        {/* 项目网格 */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const statusInfo = getStatusInfo(project.status);
            
            return (
              <div 
                key={project.id}
                className="project-card"
                style={{ '--delay': `${index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <button className="action-btn view-btn">
                        <span>查看详情</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div 
                      className="project-status"
                      style={{ '--status-color': statusInfo.color }}
                    >
                      <span className="status-icon">{statusInfo.icon}</span>
                      <span className="status-text">{statusInfo.text}</span>
                    </div>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="project-date">{project.date}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 项目详情模态框 */}
        {isModalOpen && selectedProject && (
          <div className="modal-overlay" onClick={closeProjectModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeProjectModal}>
                ✕
              </button>
              
              <div className="modal-header">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-description">{selectedProject.description}</p>
                  
                  <div className="modal-status">
                    {(() => {
                      const statusInfo = getStatusInfo(selectedProject.status);
                      return (
                        <span 
                          className="status-badge"
                          style={{ '--status-color': statusInfo.color }}
                        >
                          {statusInfo.icon} {statusInfo.text}
                        </span>
                      );
                    })()}
                    <span className="modal-date">{selectedProject.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">🚀</span>
                    主要功能
                  </h3>
                  <ul className="features-list">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="feature-item">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">🛠️</span>
                    技术栈
                  </h3>
                  <div className="technologies-grid">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <a 
                    href={selectedProject.liveUrl} 
                    className="action-link live-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-icon">🌐</span>
                    在线预览
                  </a>
                  <a 
                    href={selectedProject.githubUrl} 
                    className="action-link github-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-icon">📂</span>
                    查看代码
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;