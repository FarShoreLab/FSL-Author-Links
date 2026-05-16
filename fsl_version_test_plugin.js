(function () {
    let testAction;

    Plugin.register('fsl_version_test_plugin', {
        title: 'FSL Version Test',
        author: 'FarShoreLab',
        description: 'Tests the FSL Version Manager functionality.',
        icon: 'verified_user',
        version: '1.0.0', // Outdated version to trigger update UI
        variant: 'both',
        onload() {
            // Trigger check on load
            setTimeout(() => {
                if (typeof fslCheckVersion === 'function') {
                    // Pass the plugin ID, version, and the absolute path to this file
                    fslCheckVersion(this.id, this.version, this.path);
                } else {
                    console.error("FSL Version Manager not found! Make sure fsl_version_manager.js is loaded first.");
                }
            }, 1000);

            testAction = new Action('fsl_test_trigger_version', {
                name: 'Trigger Version Check',
                description: 'Manually trigger FSL Version Check',
                icon: 'refresh',
                click: () => {
                    if (typeof fslCheckVersion === 'function') {
                        fslCheckVersion(this.id, this.version, this.path);
                    }
                }
            });
            MenuBar.addAction(testAction, 'help');
        },
        onunload() {
            testAction.delete();
        }
    });
})();
