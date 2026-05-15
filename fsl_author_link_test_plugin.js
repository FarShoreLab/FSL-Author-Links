/**
 * FarShoreLab Author Links - Test Plugin
 * 
 * A sample plugin to demonstrate and test the fsl_author_manager.js functionality.
 */

(function () {
    let action;

    // --- Embedded Manager Code Begin ---
    const FSL_AUTHOR_LINKS_URL = 'https://raw.githubusercontent.com/FarShoreLab/fsl-author-links/main/links.json';
    
    const LOCAL_AUTHOR_LINKS = {
        "version": "1.0.0",
        "updateDate": "2026-05-16",
        "locales": {
            "zh": {
                "title": "关于作者 (About Author)",
                "message": "实验是一种生活方式",
                "license": "使用前请阅读并同意 LICENSE 相关条款",
                "overseasWarning": "",
                "links": [
                    { "type": "url", "title": "Bilibili哔哩哔哩 (主推)", "url": "https://space.bilibili.com/3494365045459688", "color": "#FF6699", "icon": "subscriptions" },
                    { "type": "url", "title": "小红书 (Rednote)", "url": "https://www.xiaohongshu.com/user/profile/64e75d2b000000000200f7f9", "color": "#FF2442", "icon": "bookmark" },
                    { "type": "copy", "title": "FSL 插件频道 (点击复制 ID)", "text": "pd31262197", "color": "#0099FF", "icon": "hub", "copyType": "腾讯频道" },
                    { "type": "url", "title": "𝕏 (Twitter)", "url": "https://x.com/FarShoreLab", "color": "#000000", "icon": "𝕏" },
                    { "type": "url", "title": "Discord (Under Construction)", "url": "https://discord.gg/H3fhBAZVtQ", "color": "#5865F2", "icon": "forum" },
                    { "type": "url", "title": "GitHub", "url": "https://github.com/FarShoreLab", "color": "#6e5494", "icon": "code" },
                    { "type": "copy", "title": "QQ 闲聊群 1013352982 (点击复制)", "text": "1013352982", "color": "#12B7F5", "icon": "people", "copyType": "QQ 交流群" }
                ]
            },
            "en": {
                "title": "About Author",
                "message": "Experimentation is a lifestyle",
                "license": "Please read and agree to the LICENSE before use",
                "overseasWarning": "<div style=\"margin-top: 4px;\">This plugin is only authorized for use in Mainland China.<br/>For overseas use, please contact the author by email.</div>",
                "links": [
                    { "type": "none", "title": "Patreon (Coming soon)", "color": "#FF424D", "icon": "favorite" },
                    { "type": "url", "title": "𝕏 (Twitter)", "url": "https://x.com/FarShoreLab", "color": "#000000", "icon": "𝕏" },
                    { "type": "url", "title": "Discord", "url": "https://discord.gg/H3fhBAZVtQ", "color": "#5865F2", "icon": "forum" },
                    { "type": "url", "title": "GitHub", "url": "https://github.com/FarShoreLab", "color": "#6e5494", "icon": "code" },
                    { "type": "copy", "title": "farshorelab@gmail.com", "text": "farshorelab@gmail.com", "color": "#4285F4", "icon": "email", "copyType": "Email" },
                    { "type": "url", "title": "Bilibili", "url": "https://space.bilibili.com/3494365045459688", "color": "#FF6699", "icon": "subscriptions" },
                    { "type": "url", "title": "Rednote", "url": "https://www.xiaohongshu.com/user/profile/64e75d2b000000000200f7f9", "color": "#FF2442", "icon": "bookmark" },
                    { "type": "copy", "title": "Tencent Channel (Click to copy ID)", "text": "pd31262197", "color": "#0099FF", "icon": "hub", "copyType": "Tencent Channel" }
                ]
            }
        }
    };

    window.fslCopyText = function (text, type) {
        let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
        navigator.clipboard.writeText(text).then(() => {
            Blockbench.showQuickMessage(isZh ? ('✅ ' + type + ' 已复制到剪贴板: ' + text) : ('✅ ' + type + ' copied to clipboard: ' + text));
        }).catch(() => {
            Blockbench.showQuickMessage(isZh ? ('❌ 复制失败，请手动复制: ' + text) : ('❌ Failed to copy, please copy manually: ' + text));
        });
    };

    async function showFslAuthorDialog(pluginVersion = 'Unknown') {
        let linkData = LOCAL_AUTHOR_LINKS;
        let isOnline = false;

        try {
            const response = await fetch(FSL_AUTHOR_LINKS_URL, { cache: "no-store", timeout: 3000 });
            if (response.ok) {
                linkData = await response.json();
                isOnline = true;
            }
        } catch (e) {
            console.warn("FSL Author Links: Failed to fetch online links, using local fallback.");
        }

        let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
        let localeKey = isZh ? 'zh' : 'en';
        
        if (!linkData || !linkData.locales || !linkData.locales[localeKey]) {
            console.error("FSL Author Links: Invalid data structure detected. Falling back to default locale parsing.");
            return;
        }

        let t = linkData.locales[localeKey];
        let updateDate = linkData.updateDate || 'Unknown';

        let statusHtml = '';
        if (isOnline) {
            statusHtml = `<div style="background: rgba(0, 255, 0, 0.1); color: #00FF55; font-size: 11px; font-weight: bold; padding: 4px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">
                            🟢 ${isZh ? ('已联网 (最新链接: ' + updateDate + ')') : ('Online (Latest Links: ' + updateDate + ')')}
                          </div>`;
        } else {
            statusHtml = `<div style="background: rgba(255, 255, 255, 0.1); color: #AAAAAA; font-size: 11px; font-weight: bold; padding: 4px; border-radius: 4px; display: inline-block; margin-bottom: 10px;">
                            🔴 ${isZh ? ('本地离线 (本地链接: ' + updateDate + ')') : ('Offline (Local Links: ' + updateDate + ')')}
                          </div>`;
        }

        let buttonsHtml = '';
        if (Array.isArray(t.links)) {
            t.links.forEach(link => {
                let onclickStr = '';
                if (link.type === 'url') {
                    onclickStr = `onclick="Blockbench.openLink('${link.url}')"`;
                } else if (link.type === 'copy') {
                    onclickStr = `onclick="window.fslCopyText('${link.text}', '${link.copyType || 'Text'}')"`;
                }

                let iconHtml = link.icon ? (link.icon === '𝕏' ? '𝕏' : `<i class="material-icons">${link.icon}</i>`) : '';

                buttonsHtml += `
                    <button class="btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: ${link.color || '#444'}; color: white; border: none;" ${onclickStr}>
                        ${iconHtml} ${link.title}
                    </button>
                `;
            });
        }

        let aboutDialog = new Dialog({
            id: 'fsl_global_about_dialog',
            title: t.title,
            width: 320,
            buttons: [],
            lines: [`
                <div style="text-align: center; padding: 12px 0 0 0; margin-bottom: 15px;">
                    ${statusHtml}
                    <h3 style="margin: 0 0 8px 0;">FarShoreLab</h3>
                    <div style="color: var(--color-subtle_text); font-size: 11px; line-height: 1.5; opacity: 0.8;">
                        <div>${t.message}</div>
                        <div>${isZh ? '当前版本' : 'Current Version'}: ${pluginVersion}</div>
                        <div>${t.license}</div>
                        ${t.overseasWarning ? t.overseasWarning : ''}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${buttonsHtml}
                </div>
            `]
        });
        aboutDialog.show();
    }
    // --- Embedded Manager Code End ---

    Plugin.register('fsl_author_link_test_plugin', {
        title: 'FSL Author Link Test',
        author: 'FarShoreLab',
        description: 'A test plugin to verify the centralized author link fetching mechanism.',
        icon: 'contact_page',
        version: '1.0.0',
        variant: 'both',
        onload() {
            action = new Action('open_fsl_author_test', {
                name: 'FSL 作者链接测试 (Author Test)',
                icon: 'contact_page',
                description: 'Open the FarShoreLab dynamic author links dialog',
                click: function () {
                    // Call the embedded function and pass a mock plugin version
                    showFslAuthorDialog('1.0.0-test');
                }
            });
            MenuBar.addAction(action, 'tools');
        },
        onunload() {
            action.delete();
        }
    });

})();
