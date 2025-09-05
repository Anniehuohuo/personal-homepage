import React, { useState } from 'react';
import './Contact.css';

/**
 * 联系我页面组件
 * 提供联系表单和社交媒体链接，方便用户与我取得联系
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // 社交媒体链接配置
  const socialLinks = [
    {
      name: 'GitHub',
      icon: '🐙',
      url: 'https://github.com',
      description: '查看我的开源项目和代码',
      color: '#333'
    },
    {
      name: '微信',
      icon: '💬',
      url: '#',
      description: '扫码添加微信好友',
      color: '#07c160'
    },
    {
      name: 'QQ',
      icon: '🐧',
      url: '#',
      description: '点击添加QQ好友',
      color: '#12b7f5'
    },
    {
      name: '邮箱',
      icon: '📧',
      url: 'mailto:example@email.com',
      description: '发送邮件联系我',
      color: '#ea4335'
    },
    {
      name: '知乎',
      icon: '🔍',
      url: 'https://zhihu.com',
      description: '关注我的知乎动态',
      color: '#0084ff'
    },
    {
      name: 'CSDN',
      icon: '📝',
      url: 'https://csdn.net',
      description: '阅读我的技术博客',
      color: '#fc5531'
    }
  ];

  // 联系信息配置
  const contactInfo = [
    {
      icon: '📍',
      title: '位置',
      content: '中国 · 北京',
      description: '欢迎线下交流'
    },
    {
      icon: '📞',
      title: '电话',
      content: '+86 138-0000-0000',
      description: '工作时间：9:00-18:00'
    },
    {
      icon: '📧',
      title: '邮箱',
      content: 'example@email.com',
      description: '24小时内回复'
    },
    {
      icon: '💼',
      title: '工作状态',
      content: '寻求机会',
      description: '开放合作与全职机会'
    }
  ];

  /**
   * 处理表单输入变化
   * @param {Event} e - 输入事件
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * 处理表单提交
   * @param {Event} e - 提交事件
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 这里应该是实际的表单提交逻辑
      console.log('表单数据:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 验证表单是否完整
   * @returns {boolean} 表单是否有效
   */
  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.subject.trim() && 
           formData.message.trim();
  };

  /**
   * 处理社交链接点击
   * @param {Object} social - 社交媒体对象
   */
  const handleSocialClick = (social) => {
    if (social.url === '#') {
      // 对于微信、QQ等，可以显示二维码或其他信息
      alert(`请通过其他方式联系我的${social.name}`);
    } else {
      window.open(social.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* 页面标题 */}
        <div className="contact-header">
          <h1 className="contact-title">
            <span className="title-icon">📧</span>
            联系我
          </h1>
          <p className="contact-subtitle">
            有任何问题或合作意向，欢迎随时与我联系
          </p>
        </div>

        <div className="contact-content">
          {/* 联系表单 */}
          <div className="contact-form-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">✉️</span>
                发送消息
              </h2>
              <p className="section-description">
                填写下方表单，我会尽快回复您
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <span className="label-icon">👤</span>
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="label-icon">📧</span>
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="请输入您的邮箱"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  <span className="label-icon">📋</span>
                  主题
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="请输入消息主题"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <span className="label-icon">💬</span>
                  消息内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="请输入您想说的话..."
                  rows={6}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    发送中...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    发送消息
                  </>
                )}
              </button>
              
              {/* 提交状态提示 */}
              {submitStatus === 'success' && (
                <div className="status-message success">
                  <span className="status-icon">✅</span>
                  消息发送成功！我会尽快回复您。
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="status-message error">
                  <span className="status-icon">❌</span>
                  发送失败，请稍后重试或通过其他方式联系我。
                </div>
              )}
            </form>
          </div>

          {/* 联系信息和社交媒体 */}
          <div className="contact-info-section">
            {/* 联系信息 */}
            <div className="contact-info">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">📞</span>
                  联系信息
                </h2>
                <p className="section-description">
                  多种方式联系我
                </p>
              </div>
              
              <div className="info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3 className="info-title">{info.title}</h3>
                      <p className="info-value">{info.content}</p>
                      <p className="info-description">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 社交媒体 */}
            <div className="social-media">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🌐</span>
                  社交媒体
                </h2>
                <p className="section-description">
                  关注我的社交媒体动态
                </p>
              </div>
              
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <button
                    key={index}
                    className="social-card"
                    onClick={() => handleSocialClick(social)}
                    style={{ '--social-color': social.color }}
                  >
                    <div className="social-icon">{social.icon}</div>
                    <div className="social-content">
                      <h3 className="social-name">{social.name}</h3>
                      <p className="social-description">{social.description}</p>
                    </div>
                    <div className="social-arrow">→</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;