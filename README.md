# FarShoreLab Author Links Manager

这是一个用于 FarShoreLab 插件生态的集中式作者链接获取工具。它解决了硬编码在各个插件中的作者链接难以更新的问题。

## 特性

- **在线获取**: 尝试从 GitHub 读取最新的 `links.json`，确保插件内弹出的链接永远是最新的。
- **本地降级**: 在无网络连接时，自动降级使用自带的本地硬编码链接，保证插件的基础体验不受影响。
- **UI 提示**: 对话框顶部会明确显示当前的联网状态（🟢 已联网 / 🔴 本地离线）以及链接信息的更新日期。
- **双语支持**: 完全支持基于 Blockbench 环境的 `zh` 和 `en` 双语显示。

## 使用方法

### 1. 更新线上链接
如果你想更新所有使用了该脚本的插件中的链接：
1. 修改本仓库下的 `links.json` 文件（可以更新日期、修改文本或调整链接）。
2. 将其 Commit 并 Push 到 GitHub `main` 分支。
3. 所有联网的插件在下次打开“关于作者”时都会自动拉取并应用最新的 JSON。

### 2. 在新插件中接入
如果你正在开发一个新的 FarShoreLab 插件，可以通过以下方式接入此管理器：

将 `fsl_author_manager.js` 的内容直接内嵌至你的插件闭包中（或者如果处于模块化环境则直接导入），随后在原本调用弹窗的地方使用：

```javascript
// 假设你有一个按钮或菜单项触发
openAuthorLink() {
    // 传入当前插件的版本号以显示在弹窗中
    if (typeof window.showFslAuthorDialog === 'function') {
        window.showFslAuthorDialog('1.0.0');
    }
}
```

注意：由于在线地址配置为了 `https://raw.githubusercontent.com/FarShoreLab/fsl-author-links/main/links.json`，请确保本仓库最终发布在了 `FarShoreLab/fsl-author-links` 路径下。
