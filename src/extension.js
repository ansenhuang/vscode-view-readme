var vscode = require('vscode');
var local = require('./local');
var remote = require('./remote');

function activate (context) {
    console.log('Congratulations, your extension [view-readme] is now active!');

    var disposableLocal = vscode.commands.registerCommand('viewReadme.markdown', local);

    var disposableRemote = vscode.commands.registerCommand('viewReadme.remoteMarkdown', function () {
        vscode.window.showInputBox({
            prompt: 'Search moduleName'
        }).then(function (moduleName) {
            var name = moduleName && moduleName.trim();
            if (name) {
                remote(name);
            }
        });
    });

    context.subscriptions.push(disposableLocal);
    context.subscriptions.push(disposableRemote);
}

function deactivate () {}

// exports
exports.activate = activate;
exports.deactivate = deactivate;