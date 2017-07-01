var vscode = require('vscode');
var local = require('./local');
// var Remote = require('./Remote');

function activate (context) {
    var disposableLocal = vscode.commands.registerCommand('viewReadme.showLocal', function () {
        local();
    });

    // var disposableRemote = vscode.commands.registerCommand('viewReadme.showRemote', function () {
    //     vscode.window.showInputBox({
    //         prompt: INPUT_PROMPT
    //     }).then(function (moduleName) {
    //         new Remote(moduleName);
    //     });
    // });

    context.subscriptions.push(disposableLocal);
    // context.subscriptions.push(disposableRemote);
}

function deactivate () {}

// exports
exports.activate = activate;
exports.deactivate = deactivate;