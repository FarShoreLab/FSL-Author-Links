// fsl_version_manager.js
// FarShoreLab Version Manager
// Version: 1.3.0

function compareSemVer(v1, v2) {
    let parts1 = v1.split('.').map(Number);
    let parts2 = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        let p1 = parts1[i] || 0;
        let p2 = parts2[i] || 0;
        if (p1 > p2) return 1;
        if (p1 < p2) return -1;
    }
    return 0;
}

function calculateFileHash(filePath) {
    if (typeof require === 'undefined') return null; // Web App fallback
    try {
        const fs = require('fs');
        const crypto = require('crypto');
        if (!fs.existsSync(filePath)) return null;
        
        let content = fs.readFileSync(filePath, 'utf8');
        // Normalize line endings to prevent hash mismatch due to OS git crlf conversions
        content = content.replace(/\r\n/g, '\n').trim();
        
        return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
    } catch (e) {
        console.warn('FSL Version Manager: Hash calculation failed', e);
        return null;
    }
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

async function fslCheckVersion(pluginId, currentVersion, pluginFilePath) {
    const fetchUrl = `https://raw.githubusercontent.com/FarShoreLab/FSL-Author-Links/main/projects/${pluginId}/version.json?t=${Date.now()}`;
    let isZh = typeof Language !== 'undefined' && Language.code && Language.code.startsWith('zh');
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
        
        const response = await fetch(fetchUrl, {
            cache: "no-store",
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) return; // Fail silently if cloud is unavailable or file missing
        
        const data = await response.json();
        
        // 1. Update Check
        if (data.latestVersion && compareSemVer(data.latestVersion, currentVersion) > 0) {
            let updateMsg = data.updateMessage ? (isZh ? data.updateMessage.zh : data.updateMessage.en) : '';
            
            let updateDialog = new Dialog({
                id: 'fsl_update_dialog',
                title: isZh ? '发现新版本' : 'New Version Available',
                width: 380,
                buttons: [isZh ? '获取更新' : 'Get Update', isZh ? '忽略' : 'Ignore'],
                lines: [`
                    <div style="text-align: center; padding: 10px 0;">
                        <i class="material-icons" style="font-size: 40px; color: #4CAF50;">system_update</i>
                        <h3 style="margin: 10px 0;">${pluginId}</h3>
                        <div style="margin-bottom: 10px; opacity: 0.8;">
                            ${isZh ? '当前版本' : 'Current Version'}: ${currentVersion} <br/>
                            <strong style="color: #4CAF50;">${isZh ? '最新版本' : 'Latest Version'}: ${data.latestVersion}</strong>
                        </div>
                        <div style="font-size: 13px; color: var(--color-text); background: var(--color-back); padding: 8px; border-radius: 4px;">
                            ${updateMsg}
                        </div>
                    </div>
                `],
                onConfirm() {
                    updateDialog.hide();
                    new Dialog({
                        id: 'fsl_update_instructions',
                        title: isZh ? '获取更新' : 'Get Update',
                        width: 300,
                        lines: [`
                            <div style="text-align: center; padding: 10px;">
                                <div style="margin-bottom: 15px;">${isZh ? '请加入我们的腾讯频道获取最新的插件更新：' : 'Please join our Tencent Channel to get the latest updates:'}</div>
                                <div style="font-size: 18px; font-weight: bold; user-select: all; background: var(--color-back); padding: 8px; border-radius: 4px;">pd31262197</div>
                            </div>
                        `]
                    }).show();
                }
            });
            updateDialog.show();
        }
        
        // 2. Hash Verification (Only if Node.js fs is available and version exists in hashes)
        if (pluginFilePath && typeof require !== 'undefined') {
            if (data.hashes && data.hashes[currentVersion]) {
                const expectedHash = data.hashes[currentVersion];
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
                            const issueUrl = generateGitHubIssueUrl(pluginId, currentVersion, localHash);
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
        }
        
    } catch (e) {
        console.warn('FSL Version Manager: Network check failed or aborted.', e);
    }
}
