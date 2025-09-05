import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

/**
 * 导航栏组件
 * 提供页面间导航功能，支持响应式设计和活动状态指示
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 导航菜单项配置
  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/skills', label: '技能', icon: '💻' },
    { path: '/portfolio', label: '作品集', icon: '🎨' },
    { path: '/blog', label: '博客', icon: '📝' },
    { path: '/contact', label: '联系', icon: '📧' }
  ];

  /**
   * 监听页面滚动，实现导航栏背景变化效果
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 切换移动端菜单显示状态
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * 关闭移动端菜单
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * 检查当前路径是否为活动状态
   * @param {string} path - 路径
   * @returns {boolean} 是否为活动状态
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo区域 */}
        <div className="nav-logo">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <span className="logo-icon">✨</span>
            <span className="logo-text">个人主页</span>
          </Link>
        </div>

        {/* 桌面端导航菜单 */}
        <div className="nav-menu desktop-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="切换菜单"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>

      {/* 移动端导航菜单 */}
      <div className={`nav-menu mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 移动端菜单遮罩 */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navigation;