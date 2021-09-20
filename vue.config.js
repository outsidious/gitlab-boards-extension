module.exports = {
    runtimeCompiler: true,
    css: {
        extract: false,
    },
    pages: {
        popup: {
            template: "public/browser-extension.html",
            entry: "./src/popup/main.js",
            title: "Popup",
        },
        options: {
            template: "./src/options.html",
            entry: "./src/options.js",
            title: "Options",
        },
    },
    pluginOptions: {
        browserExtension: {
            componentOptions: {
                background: {
                    entry: "src/background.js",
                },
                contentScripts: {
                    entries: {
                        "gitlab-script": "src/content-scripts/gitlab-script.js",
                        "restruct-card": "src/content-scripts/restruct-card.js",
                        "main": "src/content-scripts/main.js",
                    },
                },
            },
        },
    },
};
