var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var request = require('request');
var {
    MARKDOWN_PREVIEW,
    REMOTE_URL,
    CACHE_DAYS,
    NO_README,
    BAD_NETWORK,
    WRITE_FAILED,
    SAVE_PATH,
    TIMEOUT
} = require('./config');
// var statusBar = require('./statusBar');
var configuration = vscode.workspace.getConfiguration('view-readme');
var remoteUrl = configuration.get('remoteUrl') || REMOTE_URL;
var cacheTime = (+configuration.get('cacheDays') || CACHE_DAYS) * 86400000;

if (!/\/$/.test(remoteUrl)) {
    remoteUrl += '/';
}

if (!fs.existsSync(SAVE_PATH)) {
    fs.mkdirSync(SAVE_PATH);
}

function remote (moduleName) {
    var cacheFile = path.join(SAVE_PATH, moduleName + '.md');

    if (fs.existsSync(cacheFile)) {
        var stats = fs.statSync(cacheFile);

        // 缓存超过之后时间限定后从新获取
        if (+new Date() - (+stats.birthtime) < cacheTime) {
            vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse('file://' + cacheFile));
            return;
        }
    }

    request({
        method: 'GET',
        url: remoteUrl + moduleName,
        timeout: TIMEOUT
    }, function (error, response, body) {
        if (error) {
            vscode.window.showInformationMessage(BAD_NETWORK);
            return;
        }

        var data = {};
        try {
            data = JSON.parse(body);
        } catch (error) {
            data = {};
        }

        if (data.readme) {
            handleReadme(data);
        } else {
            vscode.window.showInformationMessage(NO_README);
        }
    });
}

function handleReadme (data) {
    var readmePath = path.join(SAVE_PATH, data.name + '.md');
    var content = '`version: ' + data['dist-tags'].latest + '`\n\n' + data.readme;

    fs.writeFile(readmePath, content, function (error) {
        if (error) {
            vscode.window.showInformationMessage(WRITE_FAILED);
            return;
        }

        vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse('file://' + readmePath));
    });
}

module.exports = remote;