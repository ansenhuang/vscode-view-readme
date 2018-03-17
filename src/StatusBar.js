var vscode = require('vscode');

var Align = vscode.StatusBarAlignment['Left'];
var statusBarItem = vscode.window.createStatusBarItem(Align);

function show ({ msg, color, delay, dispose }) {
    statusBarItem.text = msg;

    if (color) {
        statusBarItem.color = color;
    }

    statusBarItem.show();

    if (delay) {
        setTimeout(() => {
            if (!dispose) {
                hide();
            } else {
                dispose();
            }
        }, delay);
    }
}

function hide () {
    statusBarItem.hide();
}

function dispose () {
    hide();
    statusBarItem.dispose();
}

module.exports = { show, hide, dispose };