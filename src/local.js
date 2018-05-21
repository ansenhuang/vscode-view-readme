var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var {
    MARKDOWN_PREVIEW,
    README_NAMES,
    NO_FILE,
    NOT_FOUND,
    PICK_PLACE_HOLDER
} = require('./config');

function local () {
    var activeTextEditor = vscode.window.activeTextEditor;

    if (activeTextEditor) {
        handlePath(path.dirname(activeTextEditor.document.fileName));
    } else {
        vscode.window.showInformationMessage(NO_FILE);
    }
}

function handlePath (dir) {
    if (dir === '/') {
        vscode.window.showInformationMessage(NOT_FOUND);
        return;
    }

    var nodeModulesPath = path.join(dir, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
        var modules = [];

        fs.readdirSync(nodeModulesPath).forEach(function (module) {
            if (module[0] === '@') {
                fs.readdirSync(path.join(nodeModulesPath, module)).forEach(function (name) {
                    modules.push(module + '/' + name);
                });
            } else if (module[0] !== '.') {
                modules.push(module);
            }
        });

        vscode.window.showQuickPick(modules, {
            placeHolder: PICK_PLACE_HOLDER
        }).then(function (module) {
            if (module) {
                handleReadme(path.join(nodeModulesPath, module));
            }
        });
    } else {
        handlePath(path.dirname(dir));
    }
}

function handleReadme (modulePath) {
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

module.exports = local;
