/**
 * FarShoreLab Author Links - Test Plugin
 * 
 * A sample plugin to demonstrate and test the fsl_author_manager.js functionality.
 */

(function () {
    let action;

    // --- Embedded Manager Code Begin ---
    const FSL_AUTHOR_LINKS_URL = 'https://raw.githubusercontent.com/FarShoreLab/FSL-Author-Links/main/links.json';

    const ALLOWED_DOMAINS = [
        "https://space.bilibili.com/",
        "https://www.xiaohongshu.com/",
        "https://x.com/",
        "https://twitter.com/",
        "https://discord.gg/",
        "https://github.com/"
    ];

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
                    { "type": "url", "title": "Twitter (𝕏)", "url": "https://x.com/FarShoreLab", "color": "#000000", "icon": "𝕏" },
                    { "type": "url", "title": "Discord (Under Construction)", "url": "https://discord.gg/H3fhBAZVtQ", "color": "#5865F2", "icon": "forum" },
                    { "type": "url", "title": "GitHub", "url": "https://github.com/FarShoreLab", "color": "#6e5494", "icon": "code" },
                    { "type": "copy", "title": "QQ 闲聊群 1013352982 (点击复制)", "text": "1013352982", "color": "#12B7F5", "icon": "people", "copyType": "QQ 交流群" }
                ],
                "updateInstructionsHtml": `
                    <div style="padding: 10px; font-size: 13px; line-height: 1.8; color: #ffffff;">
                        <div style="margin-bottom: 12px;">
                            <span style="color: var(--color-accent); font-weight: bold;">1. </span>
                            <strong style="color: #ffffff;">加入 FSL 腾讯频道</strong>
                            <div style="font-size: 11px; opacity: 0.8; margin-top: 2px;">
                                点击复制频道号: 
                                <span style="color: var(--color-accent); cursor: pointer; text-decoration: underline; font-weight: bold;" onclick="window.fslCopyText('pd31262197', '腾讯频道 ID')">pd31262197</span>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <span style="color: var(--color-accent); font-weight: bold;">2. </span>
                            <strong style="color: #ffffff;">联系作者并发送购买记录截屏</strong>
                            <div style="font-size: 11px; opacity: 0.7; line-height: 1.4; margin-top: 4px;">
                                进入频道后，可直接发帖（无板块要求）或私信联系 FarShoreLab 官方。
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 4px;">
                            <span style="color: var(--color-accent); font-weight: bold;">3. </span>
                            <strong style="color: #ffffff;">等待审核并获取插件</strong>
                            <div style="font-size: 11px; opacity: 0.7; line-height: 1.4; margin-top: 4px;">
                                审核通过后，作者将第一时间发送最新版本插件给您。
                            </div>
                        </div>
                    </div>`
            },
            "en": {
                "title": "About Author",
                "message": "Experimentation is a lifestyle",
                "license": "Please read and agree to the LICENSE before use",
                "overseasWarning": "<div style=\"margin-top: 4px;\">This plugin is only authorized for use in Mainland China.<br/>For overseas use, please contact the author by email.</div>",
                "links": [
                    { "type": "none", "title": "Patreon (Coming soon)", "color": "#FF424D", "icon": "favorite" },
                    { "type": "url", "title": "Twitter (𝕏)", "url": "https://x.com/FarShoreLab", "color": "#000000", "icon": "𝕏" },
                    { "type": "url", "title": "Discord", "url": "https://discord.gg/H3fhBAZVtQ", "color": "#5865F2", "icon": "forum" },
                    { "type": "url", "title": "GitHub", "url": "https://github.com/FarShoreLab", "color": "#6e5494", "icon": "code" },
                    { "type": "copy", "title": "farshorelab@gmail.com", "text": "farshorelab@gmail.com", "color": "#4285F4", "icon": "email", "copyType": "Email" },
                    { "type": "url", "title": "Bilibili", "url": "https://space.bilibili.com/3494365045459688", "color": "#FF6699", "icon": "subscriptions" },
                    { "type": "url", "title": "Rednote", "url": "https://www.xiaohongshu.com/user/profile/64e75d2b000000000200f7f9", "color": "#FF2442", "icon": "bookmark" },
                    { "type": "copy", "title": "Tencent Channel (Click to copy ID)", "text": "pd31262197", "color": "#0099FF", "icon": "hub", "copyType": "Tencent Channel" }
                ],
                "updateInstructionsHtml": `
                    <div style="padding: 20px 0; font-size: 13px; line-height: 1.8; color: #ffffff; text-align: center;">
                        <i class="material-icons" style="font-size: 48px; color: #E57373; display: inline-block; margin-bottom: 15px; overflow: visible;">language</i>
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">Currently, no overseas sales channels are open.</div>
                        <div style="opacity: 0.7; font-size: 11px;">
                            This plugin is only authorized for use in Mainland China.<br/>
                            For overseas use, please contact the author by email.
                        </div>
                    </div>`
            }
        }
    };

    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function isUrlSafe(url) {
        if (typeof url !== 'string') return false;
        return ALLOWED_DOMAINS.some(domain => url.startsWith(domain));
    }

    // --- FSL Version Manager Utils ---
    function compareSemVer(v1, v2) {
        if (!v1 || !v2) return 0;
        let parts1 = v1.split('-')[0].split('.').map(Number);
        let parts2 = v2.split('-')[0].split('.').map(Number);
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            let p1 = parts1[i] || 0;
            let p2 = parts2[i] || 0;
            if (p1 > p2) return 1;
            if (p1 < p2) return -1;
        }
        return 0;
    }

    /*
    function calculateFileHash(filePath) {
        if (typeof require === 'undefined') return null;
        try {
            const fs = require('fs');
            const crypto = require('crypto');
            if (!fs.existsSync(filePath)) return null;
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/\r\n/g, '\n').trim();
            return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
        } catch (e) { return null; }
    }

    function generateGitHubIssueUrl(pluginId, currentVersion, localHash) {
        const title = encodeURIComponent(`[Tamper Alert] Hash Mismatch in ${pluginId} v${currentVersion}`);
        const body = encodeURIComponent(
            `**Plugin ID:** ${pluginId}\n` +
            `**Version:** ${currentVersion}\n` +
            `**Local Hash:** \`${localHash || 'Unknown'}\`\n` +
            `**Environment:** ${typeof Blockbench !== 'undefined' ? Blockbench.version : 'Unknown'}\n\n` +
            `*Please describe where you downloaded this plugin from:* \n\n`
        );
        return `https://github.com/FarShoreLab/FSL-Author-Links/issues/new?title=${title}&body=${body}`;
    }
    */

    window.fslShowUpdateInstructions = function () {
        let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
        let localeKey = isZh ? 'zh' : 'en';

        let localesSource = window.fslCurrentLocales || LOCAL_AUTHOR_LINKS.locales;
        let t = localesSource[localeKey] || localesSource['en'] || LOCAL_AUTHOR_LINKS.locales[localeKey];
        let instructionsHtml = t.updateInstructionsHtml || LOCAL_AUTHOR_LINKS.locales[localeKey].updateInstructionsHtml;

        let updateDateStr = window.fslCurrentUpdateDate || LOCAL_AUTHOR_LINKS.updateDate;
        let dateFooter = `<div style="text-align: right; font-size: 10px; opacity: 0.4; margin-top: 10px; padding-right: 5px;">${isZh ? '流程最后同步' : 'Steps last synced'}: ${escapeHTML(updateDateStr)}</div>`;

        new Dialog({
            id: 'fsl_update_instructions',
            title: isZh ? '获取更新步骤' : 'Update Steps',
            width: 340,
            buttons: [],
            lines: [instructionsHtml + dateFooter]
        }).show();
    };
    // --- FSL Version Manager Utils End ---

    window.fslCopyText = function (text, type) {
        let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                Blockbench.showQuickMessage(isZh ? (`✅ ${type} 已复制到剪贴板: ${text}`) : (`✅ ${type} copied to clipboard: ${text}`), 3000);
            }).catch(() => {
                Blockbench.showQuickMessage(isZh ? (`❌ 复制失败，请手动复制: ${text}`) : (`❌ Failed to copy, please copy manually: ${text}`), 3000);
            });
        } else if (typeof require !== 'undefined') {
            require('electron').clipboard.writeText(text);
            Blockbench.showQuickMessage(isZh ? (`✅ ${type} 已复制到剪贴板: ${text}`) : (`✅ ${type} copied to clipboard: ${text}`), 3000);
        } else {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            Blockbench.showQuickMessage(isZh ? (`✅ ${type} 已复制到剪贴板: ${text}`) : (`✅ ${type} copied to clipboard: ${text}`), 3000);
        }
    };

    async function showFslAuthorDialog(pluginId, pluginVersion = 'Unknown', pluginFilePath = null) {
        let linkData = LOCAL_AUTHOR_LINKS;
        let versionData = null;
        let isOnline = false;
        let timeOffset = 0;

        // Fast fail if OS reports no network
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            isOnline = false;
        } else {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s forced timeout

            const fetchLinksUrl = `https://raw.githubusercontent.com/FarShoreLab/FSL-Author-Links/main/links.json?t=${Date.now()}`;
            const fetchVersionUrl = pluginId ? `https://raw.githubusercontent.com/FarShoreLab/FSL-Author-Links/main/projects/${pluginId}/version.json?t=${Date.now()}` : null;

            try {
                const [linksRes, versionRes] = await Promise.all([
                    fetch(fetchLinksUrl, { cache: "no-store", signal: controller.signal }),
                    fetchVersionUrl ? fetch(fetchVersionUrl, { cache: "no-store", signal: controller.signal }).catch(() => null) : Promise.resolve(null)
                ]);

                clearTimeout(timeoutId);

                if (linksRes && linksRes.ok) {
                    let serverDateStr = linksRes.headers.get('date');
                    if (serverDateStr) {
                        timeOffset = new Date(serverDateStr).getTime() - Date.now();
                    }

                    let parsedData = await linksRes.json();

                    // Security: Schema validation to prevent Malformed JSON attacks
                    if (parsedData && parsedData.locales && parsedData.locales.zh && parsedData.locales.en) {
                        let isCompromised = false;
                        for (let locale in parsedData.locales) {
                            let links = parsedData.locales[locale].links;
                            if (Array.isArray(links)) {
                                if (links.length > 20) { isCompromised = true; break; }
                                for (let link of links) {
                                    if (link.type === 'url' && !isUrlSafe(link.url)) { isCompromised = true; break; }
                                }
                            }
                        }
                        if (!isCompromised) {
                            linkData = parsedData;
                            isOnline = true;
                        }
                    }
                }

                if (versionRes && versionRes.ok) {
                    versionData = await versionRes.json();
                }
            } catch (e) { clearTimeout(timeoutId); }
        }

        let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
        let localeKey = isZh ? 'zh' : 'en';

        if (!linkData || !linkData.locales || !linkData.locales[localeKey]) return;

        // Cache the loaded locales and update date globally so fslShowUpdateInstructions can access them dynamically
        window.fslCurrentLocales = linkData.locales;
        window.fslCurrentUpdateDate = linkData.updateDate;

        let t = linkData.locales[localeKey];
        let currentMessage = escapeHTML(t.message);
        let currentLinks = t.links;

        if (window.fslParalysisMode && !isOnline) {
            currentMessage = isZh ? '处于本地瘫痪模式' : 'In Local Paralysis Mode';
            currentLinks = [{ "type": "url", "title": isZh ? "GitHub 测试作者链接" : "GitHub Test Author Link", "url": "https://github.com/FarShoreLab", "color": "#24292e", "icon": "code" }];
        }

        let updateDate = escapeHTML(linkData.updateDate || 'Unknown');

        let now = new Date(Date.now() + timeOffset);
        let localTime = now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 60 * 60000); // UTC+8
        let bjDate = new Date(localTime);
        let yyyy = bjDate.getFullYear();
        let mm = String(bjDate.getMonth() + 1).padStart(2, '0');
        let dd = String(bjDate.getDate()).padStart(2, '0');
        let HH = String(bjDate.getHours()).padStart(2, '0');
        let min = String(bjDate.getMinutes()).padStart(2, '0');
        let ss = String(bjDate.getSeconds()).padStart(2, '0');
        updateDate = `${yyyy}-${mm}-${dd} ${HH}:${min}:${ss}`;

        // Status Indicator Logic (Clean UI)
        let onlineStatusIcon = isOnline ? 'cloud_done' : 'cloud_off';
        let onlineStatusColor = isOnline ? '#4CAF50' : '#E57373';
        let onlineStatusText = isOnline ? (isZh ? '作者链接已同步' : 'Author Links Synced') : (isZh ? '离线作者链接' : 'Offline Author Links');

        // Version Display Logic
        let versionDisplayHtml = '';
        if (!isOnline) {
            versionDisplayHtml = `
                <span style="color: var(--color-text);">${isZh ? '当前版本' : 'Current Version'}: ${escapeHTML(pluginVersion)}</span>
                <span style="opacity: 0.3;">|</span>
                <span style="opacity: 0.7; font-size: 11px;">${isZh ? '联网检查最新版本' : 'Connect to check latest'}</span>
            `;
        } else if (versionData && versionData.latestVersion) {
            let isLatest = compareSemVer(pluginVersion, versionData.latestVersion) >= 0;
            if (isLatest) {
                versionDisplayHtml = `
                    <span style="color: var(--color-text); font-size: 11px;">${isZh ? '当前版本' : 'Current Version'}: ${escapeHTML(pluginVersion)}</span>
                    <span style="opacity: 0.3;">|</span>
                    <span style="color: #4CAF50; font-size: 11px;">${isZh ? '已是最新版本' : 'Latest Version'}</span>
                `;
            } else {
                versionDisplayHtml = `
                <span style="color: var(--color-text); font-size: 11px;">${isZh ? '当前版本' : 'Current Version'}: ${escapeHTML(pluginVersion)}</span>
                <span style="opacity: 0.3;">|</span>
                <a href="javascript:void(0)" onclick="window.fslShowUpdateInstructions()" style="color: #4CAF50; font-size: 11px; text-decoration: none; cursor: pointer;">
                    ${isZh ? '点击获取最新版本' : 'Click to get latest'}: v${escapeHTML(versionData.latestVersion)}
                </a>
            `;
            }
        } else {
            versionDisplayHtml = `
                <span>${isZh ? '当前版本' : 'Current Version'}: ${escapeHTML(pluginVersion)}</span>
            `;
        }

        let buttonsHtml = '';
        if (Array.isArray(currentLinks)) {
            currentLinks.forEach(link => {
                let onclickStr = '';
                let safeTitle = escapeHTML(link.title);
                let safeColor = escapeHTML(link.color || '#444');

                if (link.type === 'url') {
                    let safeUrl = escapeHTML(link.url);
                    onclickStr = `onclick="Blockbench.openLink('${safeUrl}')"`;
                } else if (link.type === 'copy') {
                    let safeText = escapeHTML(link.text).replace(/'/g, "\\'");
                    let safeCopyType = escapeHTML(link.copyType || 'Text').replace(/'/g, "\\'");
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
                        <div>${currentMessage}</div>
                        <div style="margin: 4px 0;">
                            <div style="display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 12px;">
                                ${versionDisplayHtml}
                            </div>
                            <div style="display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 4px; color: ${onlineStatusColor}; opacity: 0.9;">
                            <i class="material-icons" style="font-size: 13px;">${onlineStatusIcon}</i>
                            <span id="fsl_sync_time_display" style="font-size: 10px; cursor: help;" title="${isZh ? '云端数据最后抓取时间' : 'Cloud data last fetched'}: ${escapeHTML(updateDate)}">
                                ${onlineStatusText} ${isOnline ? `(${isZh ? '当前时间' : 'Current Time'}: ${escapeHTML(updateDate)})` : `(${escapeHTML(linkData.updateDate)})`}
                            </span>
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

        let clockInterval = null;
        aboutDialog.onCancel = function () {
            if (clockInterval) clearInterval(clockInterval);
        };
        aboutDialog.onConfirm = function () {
            if (clockInterval) clearInterval(clockInterval);
        };

        if (isOnline) {
            clockInterval = setInterval(() => {
                let el = document.getElementById('fsl_sync_time_display');
                if (el) {
                    let now = new Date(Date.now() + timeOffset);
                    let localTime = now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 60 * 60000);
                    let bjDate = new Date(localTime);
                    let yyyy = bjDate.getFullYear();
                    let mm = String(bjDate.getMonth() + 1).padStart(2, '0');
                    let dd = String(bjDate.getDate()).padStart(2, '0');
                    let HH = String(bjDate.getHours()).padStart(2, '0');
                    let min = String(bjDate.getMinutes()).padStart(2, '0');
                    let ss = String(bjDate.getSeconds()).padStart(2, '0');
                    let timeString = `${yyyy}-${mm}-${dd} ${HH}:${min}:${ss}`;

                    el.innerText = `${onlineStatusText} (${isZh ? '当前时间' : 'Current Time'}: ${timeString})`;
                    el.title = `${isZh ? '云端数据最后抓取时间' : 'Cloud data last fetched'}: ${timeString}`;
                } else {
                    clearInterval(clockInterval);
                }
            }, 1000);
        }

        aboutDialog.onOpen = function () {
            setTimeout(() => {
                let $dialog = $(aboutDialog.object);
                let $handle = $dialog.find('.dialog_handle');
                if ($handle.length && !$handle.find('.fsl-header-btn').length) {
                    let $btn = $(`<div class="dialog_close_button fsl-header-btn" title="${isZh ? '刷新同步数据' : 'Refresh sync data'}" style="right: 33px; z-index: 3; border-radius: 6px; position: absolute;"><i class="material-icons">refresh</i></div>`);
                    $btn.click(function () {
                        aboutDialog.hide();
                        showFslAuthorDialog(pluginId, pluginVersion, pluginFilePath);
                    });
                    $handle.append($btn);
                }
            }, 10);
        };

        aboutDialog.show();

        /*
        // Trigger Hash Warning independently after dialog opens, if tampered
        if (versionData && versionData.hashes && versionData.hashes[pluginVersion] && pluginFilePath && typeof require !== 'undefined') {
            const expectedHash = versionData.hashes[pluginVersion];
            const localHash = calculateFileHash(pluginFilePath);
            if (localHash && localHash !== expectedHash) {
                let warningDialog = new Dialog({
                    id: 'fsl_tamper_warning_dialog',
                    title: isZh ? '安全警告: 文件损坏或被篡改' : 'Security Warning: File Tampered',
                    width: 400,
                    buttons: [isZh ? '向官方提交 Issue 报警' : 'Report Issue on GitHub', isZh ? '继续使用 (风险自负)' : 'Continue (At Your Own Risk)'],
                    lines: [`
                        <div style="text-align: center; padding: 10px 0;">
                            <i class="material-icons" style="font-size: 40px; color: #E57373;">warning</i>
                            <h3 style="margin: 10px 0; color: #E57373;">${isZh ? '插件完整性校验失败' : 'Plugin Integrity Verification Failed'}</h3>
                            <div style="font-size: 12px; opacity: 0.8; text-align: left; background: var(--color-back); padding: 10px; border-radius: 4px; border-left: 3px solid #E57373;">
                                ${isZh ? '系统检测到您运行的插件与 FarShoreLab 官方发布的哈希值不匹配。这可能意味着：' : 'The system detected that the plugin you are running does not match the official hash. This could mean:'}<br/>
                                <ul style="padding-left: 20px; margin-top: 5px;">
                                    <li>${isZh ? '插件在下载过程中发生数据损坏。' : 'The plugin was corrupted during download.'}</li>
                                    <li>${isZh ? '您正在使用被第三方非官方修改过的高风险版本，代码已被注入。' : 'You are using an unofficial modified version with high security risks.'}</li>
                                </ul>
                            </div>
                        </div>
                    `],
                    onConfirm() {
                        const issueUrl = generateGitHubIssueUrl(pluginId, pluginVersion, localHash);
                        if (typeof require !== 'undefined') {
                            require('electron').shell.openExternal(issueUrl);
                        } else {
                            window.open(issueUrl, '_blank');
                        }
                        warningDialog.hide();
                    }
                });
                warningDialog.show();
            }
        }
        */
    }
    // --- Embedded Manager Code End ---

    let aboutAction;
    let paralysisAction;
    let downgradeAction;

    Plugin.register('fsl_author_link_test_plugin', {
        title: 'FSL Author Links Test',
        author: 'FarShoreLab',
        description: 'A test plugin to verify the FSL Author Links Manager.',
        icon: 'hub',
        version: '1.2.0-test',
        variant: 'both',
        onload() {
            // ============================================================================
            // ⚠️ ATTENTION: FSL INTERNAL TESTING TOOLS
            // DO NOT INCLUDE THE FOLLOWING VARIABLES AND ACTIONS IN PRODUCTION PLUGINS!
            // THESE ARE STRICTLY FOR TESTING MANAGER BEHAVIORS IN THE DEV ENVIRONMENT.
            // ============================================================================
            window.fslParalysisMode = false;
            window.fslDowngradeMode = false;

            paralysisAction = new Action('fsl_paralysis_toggle', {
                name: '本地瘫痪测试',
                description: 'Toggle Local Paralysis Mode',
                icon: 'warning',
                category: 'tools',
                click: () => {
                    window.fslParalysisMode = !window.fslParalysisMode;
                    Blockbench.showQuickMessage(window.fslParalysisMode ? '⚠️ 已开启本地瘫痪模式 (Offline Simulation)' : '✅ 已关闭本地瘫痪模式');
                }
            });
            MenuBar.addAction(paralysisAction, 'tools');

            downgradeAction = new Action('fsl_downgrade_toggle', {
                name: '模拟降级测试',
                description: 'Toggle Version Downgrade Simulation',
                icon: 'arrow_downward',
                category: 'tools',
                click: () => {
                    window.fslDowngradeMode = !window.fslDowngradeMode;
                    Blockbench.showQuickMessage(window.fslDowngradeMode ? '⬇️ 已开启模拟降级 (Version forced to 0.0.1)' : '✅ 已恢复真实版本');
                }
            });
            MenuBar.addAction(downgradeAction, 'tools');
            // ============================================================================

            aboutAction = new Action('fsl_test_about', {
                name: 'About FarShoreLab',
                description: 'Show Author Links',
                icon: 'info',
                click: () => {
                    // In production, just use: showFslAuthorDialog(this.id, this.version, this.path);
                    let testVersion = window.fslDowngradeMode ? '0.0.1' : this.version;
                    showFslAuthorDialog(this.id, testVersion, this.path);
                }
            });
            MenuBar.addAction(aboutAction, 'help');
        },
        onunload() {
            aboutAction.delete();
            paralysisAction.delete();
            downgradeAction.delete();
        }
    });
})();
