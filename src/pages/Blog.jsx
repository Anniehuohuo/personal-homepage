import React, { useState, useEffect } from 'react';
import './Blog.css';

/**
 * 技术博客页面组件
 * 展示技术文章列表，支持分类筛选和搜索功能
 */
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // 博客文章数据
  const blogPosts = [
    {
      id: 1,
      title: 'React Hooks 深度解析：从入门到精通',
      excerpt: '深入探讨React Hooks的工作原理，包括useState、useEffect、useContext等核心Hook的使用技巧和最佳实践。',
      content: '完整的React Hooks学习指南...',
      category: 'react',
      tags: ['React', 'Hooks', 'JavaScript', '前端开发'],
      author: '张三',
      date: '2024-01-15',
      readTime: '8 分钟',
      views: 1250,
      likes: 89,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'CSS Grid 布局完全指南',
      excerpt: '全面介绍CSS Grid布局系统，从基础概念到高级应用，帮助你掌握现代网页布局技术。',
      content: 'CSS Grid是现代网页布局的强大工具...',
      category: 'css',
      tags: ['CSS', 'Grid', '布局', '响应式设计'],
      author: '张三',
      date: '2024-01-10',
      readTime: '12 分钟',
      views: 980,
      likes: 67,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'JavaScript 异步编程：Promise、async/await 详解',
      excerpt: '深入理解JavaScript异步编程模式，掌握Promise和async/await的使用方法和最佳实践。',
      content: '异步编程是JavaScript的核心特性...',
      category: 'javascript',
      tags: ['JavaScript', 'Promise', 'async/await', '异步编程'],
      author: '张三',
      date: '2024-01-05',
      readTime: '15 分钟',
      views: 1580,
      likes: 124,
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'Node.js 性能优化实战指南',
      excerpt: '分享Node.js应用性能优化的实用技巧，包括内存管理、数据库优化、缓存策略等。',
      content: 'Node.js性能优化是后端开发的重要技能...',
      category: 'nodejs',
      tags: ['Node.js', '性能优化', '后端开发', '缓存'],
      author: '张三',
      date: '2023-12-28',
      readTime: '10 分钟',
      views: 756,
      likes: 45,
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'Vue 3 Composition API 实践总结',
      excerpt: 'Vue 3 Composition API的实际应用经验分享，包括组件设计模式和状态管理最佳实践。',
      content: 'Vue 3 Composition API带来了全新的开发体验...',
      category: 'vue',
      tags: ['Vue.js', 'Composition API', '组件设计', '状态管理'],
      author: '张三',
      date: '2023-12-20',
      readTime: '9 分钟',
      views: 892,
      likes: 73,
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      title: 'TypeScript 进阶：类型系统深度解析',
      excerpt: '深入探讨TypeScript的高级类型特性，包括泛型、条件类型、映射类型等复杂概念。',
      content: 'TypeScript的类型系统是其核心优势...',
      category: 'typescript',
      tags: ['TypeScript', '类型系统', '泛型', '高级特性'],
      author: '张三',
      date: '2023-12-15',
      readTime: '18 分钟',
      views: 1120,
      likes: 95,
      image: '/api/placeholder/400/250'
    },
    {
      id: 7,
      title: '前端工程化：Webpack 5 配置详解',
      excerpt: '全面解析Webpack 5的新特性和配置方法，帮助你构建高效的前端开发环境。',
      content: 'Webpack 5带来了许多激动人心的新特性...',
      category: 'tools',
      tags: ['Webpack', '前端工程化', '构建工具', '模块化'],
      author: '张三',
      date: '2023-12-08',
      readTime: '14 分钟',
      views: 634,
      likes: 38,
      image: '/api/placeholder/400/250'
    },
    {
      id: 8,
      title: 'Web 性能优化：从理论到实践',
      excerpt: '系统性介绍Web性能优化策略，包括资源优化、渲染优化、网络优化等多个维度。',
      content: 'Web性能优化是提升用户体验的关键...',
      category: 'performance',
      tags: ['性能优化', 'Web开发', '用户体验', '最佳实践'],
      author: '张三',
      date: '2023-12-01',
      readTime: '16 分钟',
      views: 1340,
      likes: 108,
      image: '/api/placeholder/400/250'
    }
  ];

  // 分类配置
  const categories = [
    { key: 'all', label: '全部', icon: '📚' },
    { key: 'react', label: 'React', icon: '⚛️' },
    { key: 'vue', label: 'Vue.js', icon: '💚' },
    { key: 'javascript', label: 'JavaScript', icon: '⚡' },
    { key: 'typescript', label: 'TypeScript', icon: '📘' },
    { key: 'css', label: 'CSS', icon: '🎨' },
    { key: 'nodejs', label: 'Node.js', icon: '🟢' },
    { key: 'tools', label: '工具', icon: '🛠️' },
    { key: 'performance', label: '性能优化', icon: '🚀' }
  ];

  /**
   * 根据搜索词和分类筛选文章
   */
  useEffect(() => {
    let filtered = blogPosts;

    // 按分类筛选
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // 重置到第一页
  }, [searchTerm, activeCategory]);

  /**
   * 处理搜索输入
   * @param {Event} e - 输入事件
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * 处理分类切换
   * @param {string} category - 分类键
   */
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  /**
   * 格式化日期显示
   * @param {string} dateString - 日期字符串
   * @returns {string} 格式化后的日期
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays} 天前`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} 周前`;
    return date.toLocaleDateString('zh-CN');
  };

  // 分页逻辑
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  /**
   * 处理分页
   * @param {number} pageNumber - 页码
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-page">
      <div className="blog-container">
        {/* 页面标题 */}
        <div className="blog-header">
          <h1 className="blog-title">
            <span className="title-icon">📝</span>
            技术博客
          </h1>
          <p className="blog-subtitle">
            分享技术心得，记录学习历程，与你一起成长
          </p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="blog-controls">
          {/* 搜索框 */}
          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="搜索文章标题、内容或标签..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="categories-container">
            <div className="categories-scroll">
              {categories.map((category) => (
                <button
                  key={category.key}
                  className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.key)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="blog-content">
          {currentPosts.length > 0 ? (
            <>
              <div className="posts-grid">
                {currentPosts.map((post, index) => (
                  <article 
                    key={post.id}
                    className="post-card"
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <div className="post-image">
                      <img src={post.image} alt={post.title} />
                      <div className="post-category-badge">
                        {categories.find(cat => cat.key === post.category)?.icon}
                        {categories.find(cat => cat.key === post.category)?.label}
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-date">{formatDate(post.date)}</span>
                        <span className="post-read-time">{post.readTime}</span>
                      </div>
                      
                      <h2 className="post-title">{post.title}</h2>
                      <p className="post-excerpt">{post.excerpt}</p>
                      
                      <div className="post-tags">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="post-tag">#{tag}</span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="tag-more">+{post.tags.length - 3}</span>
                        )}
                      </div>
                      
                      <div className="post-footer">
                        <div className="post-stats">
                          <span className="stat-item">
                            <span className="stat-icon">👁️</span>
                            {post.views}
                          </span>
                          <span className="stat-item">
                            <span className="stat-icon">❤️</span>
                            {post.likes}
                          </span>
                        </div>
                        
                        <button className="read-more-btn">
                          阅读全文
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* 分页组件 */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn prev-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ← 上一页
                  </button>
                  
                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className="page-btn next-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    下一页 →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3 className="no-results-title">没有找到相关文章</h3>
              <p className="no-results-text">
                {searchTerm ? `没有找到包含 "${searchTerm}" 的文章` : '该分类下暂无文章'}
              </p>
              <button 
                className="reset-btn"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;