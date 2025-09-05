# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1. 准备工作
确保你的项目已经推送到GitHub仓库，并且仓库名为 `personal-homepage`。

### 2. 启用GitHub Pages
1. 进入你的GitHub仓库页面
2. 点击 `Settings`（设置）选项卡
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `GitHub Actions`
5. 保存设置

### 3. 自动部署
当你推送代码到 `main` 分支时，GitHub Actions 会自动：
- 安装项目依赖
- 构建生产版本
- 部署到GitHub Pages

### 4. 访问网站
部署完成后，你的网站将在以下地址可用：
```
https://你的用户名.github.io/personal-homepage/
```

## 🔧 配置说明

### Vite 配置 (vite.config.js)
```javascript
// 设置正确的base路径，确保资源能正确加载
base: process.env.NODE_ENV === 'production' ? '/personal-homepage/' : '/'
```

### React Router 配置 (App.jsx)
```javascript
// 设置basename，确保路由在GitHub Pages上正常工作
const basename = process.env.NODE_ENV === 'production' ? '/personal-homepage' : '';
<Router basename={basename}>
```

## 🐛 常见问题解决

### 问题1：页面显示空白
**原因**：资源路径不正确或路由配置错误

**解决方案**：
1. 确保 `vite.config.js` 中的 `base` 路径正确
2. 确保 `App.jsx` 中的 `basename` 配置正确
3. 检查仓库名是否为 `personal-homepage`

### 问题2：刷新页面后显示404
**原因**：GitHub Pages 不支持客户端路由

**解决方案**：
1. 使用 Hash Router（不推荐，会有#号）
2. 或者添加 `404.html` 重定向到 `index.html`

### 问题3：CSS/JS文件加载失败
**原因**：资源路径不正确

**解决方案**：
1. 检查 `vite.config.js` 中的 `base` 配置
2. 确保构建后的文件路径正确

### 问题4：部署失败
**原因**：权限不足或配置错误

**解决方案**：
1. 确保仓库的 Actions 权限已启用
2. 检查 `.github/workflows/deploy.yml` 文件是否正确
3. 查看 Actions 日志了解具体错误

## 📝 部署检查清单

- [ ] 仓库名为 `personal-homepage`
- [ ] 代码已推送到 `main` 分支
- [ ] GitHub Pages 设置为 `GitHub Actions`
- [ ] `vite.config.js` 配置正确
- [ ] `App.jsx` 路由配置正确
- [ ] `.github/workflows/deploy.yml` 文件存在
- [ ] Actions 权限已启用

## 🎯 验证部署

1. 检查 GitHub Actions 是否成功运行
2. 访问部署的网站地址
3. 测试所有页面路由是否正常
4. 检查所有功能是否正常工作

## 📞 需要帮助？

如果遇到问题，可以：
1. 检查 GitHub Actions 的运行日志
2. 确认所有配置文件是否正确
3. 验证仓库设置是否正确

---

**注意**：首次部署可能需要几分钟时间，请耐心等待。