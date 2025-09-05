import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StreamingBackground from './components/StreamingBackground';
import SnowflakeEffect from './components/SnowflakeEffect';
import Navigation from './components/Navigation';
import ParticleText from './components/ParticleText';
import Skills from './pages/Skills';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// 首页组件
const Home = () => {
  const navigate = useNavigate();

  /**
   * 处理联系我按钮点击事件
   * 跳转到联系页面
   */
  const handleContactClick = () => {
    navigate('/contact');
  };

  /**
   * 处理查看作品按钮点击事件
   * 跳转到作品集页面
   */
  const handlePortfolioClick = () => {
    navigate('/portfolio');
  };

  return (
    <main className="main-content">
      {/* 个人信息展示区 */}
      <section className="hero-section">
        <div className="hero-container">
          {/* 个人头像 */}
          <div className="avatar-container">
            <div className="avatar">
              <div className="avatar-placeholder">头像</div>
            </div>
            <div className="avatar-glow"></div>
          </div>
          
          {/* 个人信息 */}
          <div className="personal-info">
            <h1 className="name">您的姓名</h1>
            <h2 className="title">前端开发工程师</h2>
            <p className="description">
              热爱编程，专注于现代化Web开发技术，
              <br />
              致力于创造优雅的用户体验和高质量的代码。
            </p>
            
            {/* 快速联系按钮 */}
             <div className="contact-buttons">
               <button 
                 className="btn btn-primary" 
                 onClick={handleContactClick}
                 aria-label="跳转到联系我页面"
               >
                 联系我
               </button>
               <button 
                 className="btn btn-secondary" 
                 onClick={handlePortfolioClick}
                 aria-label="查看我的作品集"
               >
                 查看作品
               </button>
             </div>
          </div>
        </div>
      </section>
      
      {/* 技能标签云区域 */}
      <section className="skills-section">
        <div className="section-container">
          <h3 className="section-title">核心技能</h3>
          <div className="skills-cloud">
            <span className="skill-tag">React</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">CSS3</span>
            <span className="skill-tag">HTML5</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Vue.js</span>
            <span className="skill-tag">Git</span>
          </div>
        </div>
      </section>
      
      {/* 个人亮点区域 */}
      <section className="highlights-section">
        <div className="section-container">
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">💻</div>
              <h4>代码质量</h4>
              <p>注重代码规范和最佳实践</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🎨</div>
              <h4>设计感知</h4>
              <p>具备良好的UI/UX设计理念</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <h4>持续学习</h4>
              <p>紧跟技术发展趋势</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * 个人主页应用主组件
 * 整合流光背景和雪花特效，展示个人信息和作品
 */
function App() {
  // GitHub Pages 部署时的基础路径配置
  const basename = process.env.NODE_ENV === 'production' ? '/personal-homepage' : '';
  
  return (
    <Router basename={basename}>
      <div className="app">
        {/* 流光背景动效 */}
        <StreamingBackground />
        
        {/* 雪花鼠标跟随特效 */}
        <SnowflakeEffect />
        
        {/* 导航组件 */}
        <Navigation />
        
        {/* 路由配置 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        {/* 底部粒子文字特效 */}
        <footer className="app-footer">
          <ParticleText />
        </footer>
      </div>
    </Router>
  );
}

export default App;
