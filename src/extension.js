var vscode = require('vscode');
var Local = require('./Local');
var Remote = require('./Remote');
var { INPUT_PROMPT } = require('./config');

function activate (context) {
    var disposableLocal = vscode.commands.registerCommand('viewReadme.showLocal', function () {
        vscode.window.showInputBox({
            prompt: INPUT_PROMPT
        }).then(function (moduleName) {
            new Local(moduleName);
        });
    });

    var disposableRemote = vscode.commands.registerCommand('viewReadme.showRemote', function () {
        vscode.window.showInputBox({
            prompt: INPUT_PROMPT
        }).then(function (moduleName) {
            new Remote(moduleName);
        });
    });

    context.subscriptions.push(disposableLocal, disposableRemote);
}

function deactivate () {}

// exports
exports.activate = activate;
exports.deactivate = deactivate;