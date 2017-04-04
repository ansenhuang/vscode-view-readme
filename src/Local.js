var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var {
    MARKDOWN_PREVIEW,
    README_NAMES,
    NO_FILE,
    NOT_FOUND
} = require('./config');

function Local (moduleName) {
    this.moduleName = moduleName;

    moduleName && this.init();
}

Local.prototype = {
    init: function () {
        var files = vscode.workspace.textDocuments;
        if (files.length) {
            var last = files.length - 1;
            this.handlePath(path.dirname(files[last].fileName));
        } else {
            vscode.window.showInformationMessage(NO_FILE);
        }
    },
    handlePath: function (dir) {
        if (dir === '/') {
            vscode.window.showInformationMessage(NOT_FOUND);
            return;
        }

        var modulePath = path.join(dir, 'node_modules', this.moduleName);
        if (fs.existsSync(modulePath)) {
            this.handleReadme(modulePath);
        } else {
            this.handlePath(path.dirname(dir));
        }
    },
    handleReadme: function (modulePath) {
        var readmeName = README_NAMES.find(function (name) {
            return fs.existsSync(path.join(modulePath, name));
        });

        if (readmeName) {
            var readmePath = path.join(modulePath, readmeName);
            vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse('file://' + readmePath));
        } else {
            vscode.window.showInformationMessage(NOT_FOUND);
        }
    }
};

module.exports = Local;