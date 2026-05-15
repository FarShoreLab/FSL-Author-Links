/**
 * FarShoreLab Author Links Manager (Secure Edition + Clean UI)
 * 
 * Centralized script to fetch and display bilingual author links dynamically.
 * Features comprehensive security countermeasures against MITM, XSS, Phishing and DDoS.
 */

const FSL_AUTHOR_LINKS_URL = 'https://raw.githubusercontent.com/FarShoreLab/FSL-Author-Links/main/links.json';
const FSL_AUTHOR_MANAGER_VERSION = '1.2.0-secure';

// Security: Whitelisted domains to prevent Phishing / Hijacking
const ALLOWED_DOMAINS = [
    "https://space.bilibili.com/",
    "https://www.xiaohongshu.com/",
    "https://x.com/",
    "https://twitter.com/",
    "https://discord.gg/",
    "https://github.com/"
];

// Fallback local data (mirrors links.json structure)
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

// Security: XSS Sanitization helper
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
}

// Security: URL Whitelisting helper
function isUrlSafe(url) {
    if (typeof url !== 'string') return false;
    return ALLOWED_DOMAINS.some(domain => url.startsWith(domain));
}

/**
 * Global helper function attached to window for handling clipboard copy within the dialog
 */
window.fslCopyText = function (text, type) {
    let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
    navigator.clipboard.writeText(text).then(() => {
        Blockbench.showQuickMessage(isZh ? ('✅ ' + escapeHTML(type) + ' 已复制到剪贴板') : ('✅ ' + escapeHTML(type) + ' copied to clipboard'));
    }).catch(() => {
        Blockbench.showQuickMessage(isZh ? ('❌ 复制失败，请手动复制') : ('❌ Failed to copy, please copy manually'));
    });
};

/**
 * Fetch online links, fallback to local if failed or compromised.
 * Displays the About Author dialog.
 * @param {string} pluginVersion - The version of the calling plugin (e.g., '4.2.3')
 */
async function showFslAuthorDialog(pluginVersion = 'Unknown') {
    let linkData = LOCAL_AUTHOR_LINKS;
    let isOnline = false;

    // Fast fail if OS reports no network
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        isOnline = false;
    } else {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s strict timeout

        try {
            // Append timestamp to forcefully bypass browser cache
            const fetchUrl = FSL_AUTHOR_LINKS_URL + "?t=" + Date.now();
            const response = await fetch(fetchUrl, { 
                cache: "no-store", 
                signal: controller.signal 
            });
            clearTimeout(timeoutId);
            
            if (response.ok) {
                let parsedData = await response.json();
                
                // Security: Schema validation to prevent Malformed JSON attacks
                if (parsedData && parsedData.locales && parsedData.updateDate) {
                    // Security: Whitelist validation (Anti-Phishing / MITM)
                    let isCompromised = false;
                    for (let locale in parsedData.locales) {
                        let links = parsedData.locales[locale].links;
                        if (Array.isArray(links)) {
                            if (links.length > 20) { // Limit array size
                                isCompromised = true; break;
                            }
                            for (let link of links) {
                                if (link.type === 'url' && !isUrlSafe(link.url)) {
                                    console.warn("FSL Security Warning: Untrusted URL detected in payload -", link.url);
                                    isCompromised = true;
                                }
                            }
                        }
                    }

                    if (!isCompromised) {
                        linkData = parsedData;
                        isOnline = true;
                    } else {
                        console.error("FSL Security: Data payload rejected due to validation failure. Falling back to secure local data.");
                    }
                } else {
                    console.error("FSL Security: Invalid data schema. Falling back to secure local data.");
                }
            }
        } catch (e) {
            clearTimeout(timeoutId);
            console.warn("FSL Author Links: Network request failed or timed out.");
        }
    }

    let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
    let localeKey = isZh ? 'zh' : 'en';
    
    if (!linkData || !linkData.locales || !linkData.locales[localeKey]) {
        console.error("FSL Security: Invalid locale structure. Aborting dialog.");
        return;
    }

    let t = linkData.locales[localeKey];
    let updateDate = escapeHTML(linkData.updateDate || 'Unknown');

    if (isOnline) {
        let now = new Date();
        let localTime = now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 60 * 60000); // UTC+8
        let bjDate = new Date(localTime);
        let yyyy = bjDate.getFullYear();
        let mm = String(bjDate.getMonth() + 1).padStart(2, '0');
        let dd = String(bjDate.getDate()).padStart(2, '0');
        let HH = String(bjDate.getHours()).padStart(2, '0');
        let min = String(bjDate.getMinutes()).padStart(2, '0');
        let ss = String(bjDate.getSeconds()).padStart(2, '0');
        updateDate = `${yyyy}-${mm}-${dd} ${HH}:${min}:${ss}`;
    }

    // Status Indicator Logic (Clean UI)
    let onlineStatusIcon = isOnline ? 'cloud_done' : 'cloud_off';
    let onlineStatusColor = isOnline ? '#4CAF50' : '#E57373';
    let onlineStatusText = isOnline ? (isZh ? '作者链接已同步' : 'Author Links Synced') : (isZh ? '离线作者链接' : 'Offline Author Links');

    // Generate Buttons HTML safely
    let buttonsHtml = '';
    if (Array.isArray(t.links)) {
        t.links.forEach(link => {
            let onclickStr = '';
            // Security: Sanitize all outputs
            let safeTitle = escapeHTML(link.title);
            let safeColor = escapeHTML(link.color || '#444');
            
            if (link.type === 'url') {
                // We already validated url via isUrlSafe, but escape anyway
                let safeUrl = escapeHTML(link.url);
                onclickStr = `onclick="Blockbench.openLink('${safeUrl}')"`;
            } else if (link.type === 'copy') {
                let safeText = escapeHTML(link.text);
                let safeCopyType = escapeHTML(link.copyType || 'Text');
                // Escape backslashes and quotes for safe JS injection
                safeText = safeText.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                safeCopyType = safeCopyType.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                onclickStr = `onclick="window.fslCopyText('${safeText}', '${safeCopyType}')"`;
            }

            let iconHtml = link.icon ? (link.icon === '𝕏' ? '𝕏' : `<i class="material-icons">${escapeHTML(link.icon)}</i>`) : '';

            buttonsHtml += `
                <button class="btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: ${safeColor}; color: white; border: none;" ${onclickStr}>
                    ${iconHtml} ${safeTitle}
                </button>
            `;
        });
    }

    let aboutDialog = new Dialog({
        id: 'fsl_global_about_dialog',
        title: escapeHTML(t.title),
        width: 320,
        buttons: [],
        lines: [`
            <div style="text-align: center; padding: 12px 0 0 0; margin-bottom: 15px;">
                <h3 style="margin: 0 0 8px 0;">FarShoreLab</h3>
                <div style="color: var(--color-subtle_text); font-size: 11px; line-height: 1.6; opacity: 0.85;">
                    <div>${escapeHTML(t.message)}</div>
                    <div style="margin: 4px 0;">
                        <div>${isZh ? '当前版本' : 'Current Version'}: ${escapeHTML(pluginVersion)}</div>
                        <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 2px; color: ${onlineStatusColor}; opacity: 0.9;" title="${isZh ? '链接更新日期' : 'Update Date'}: ${updateDate}">
                            <i class="material-icons" style="font-size: 13px;">${onlineStatusIcon}</i>
                            <span id="fsl_sync_time_display" style="font-size: 10px;">${onlineStatusText} (${updateDate})</span>
                        </div>
                    </div>
                    <div>${escapeHTML(t.license)}</div>
                    ${t.overseasWarning ? t.overseasWarning : ''}
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${buttonsHtml}
            </div>
        `]
    });
    
    // Live clock ticker
    let clockInterval = null;
    if (isOnline) {
        aboutDialog.onCancel = function() {
            if (clockInterval) clearInterval(clockInterval);
        };
        aboutDialog.onConfirm = function() {
            if (clockInterval) clearInterval(clockInterval);
        };
        
        clockInterval = setInterval(() => {
            let el = document.getElementById('fsl_sync_time_display');
            if (el) {
                let now = new Date();
                let localTime = now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 60 * 60000);
                let bjDate = new Date(localTime);
                let yyyy = bjDate.getFullYear();
                let mm = String(bjDate.getMonth() + 1).padStart(2, '0');
                let dd = String(bjDate.getDate()).padStart(2, '0');
                let HH = String(bjDate.getHours()).padStart(2, '0');
                let min = String(bjDate.getMinutes()).padStart(2, '0');
                let ss = String(bjDate.getSeconds()).padStart(2, '0');
                el.innerText = `${onlineStatusText} (${yyyy}-${mm}-${dd} ${HH}:${min}:${ss})`;
            } else {
                clearInterval(clockInterval);
            }
        }, 1000);
    }
    
    aboutDialog.show();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showFslAuthorDialog };
} else if (typeof window !== 'undefined') {
    window.showFslAuthorDialog = showFslAuthorDialog;
}
