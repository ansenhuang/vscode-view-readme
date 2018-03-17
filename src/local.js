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
    var files = vscode.workspace.textDocuments;
    if (files.length) {
        var last = files.length - 1;
        handlePath(path.dirname(files[last].fileName));
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
        var modules = fs.readdirSync(nodeModulesPath).filter(function (module) {
            return module[0] !== '.';
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