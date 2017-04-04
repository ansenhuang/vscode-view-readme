var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var request = require('request');
var StatusBar = require('./StatusBar');
var {
    MARKDOWN_PREVIEW,
    NOT_FOUND,
    NOT_GOOD_NETWORK,
    WRITE_FAILED,
    SAVE_PATH,
    ERROR_COLOR,
    DELAY_TIME,
    TIMEOUT
} = require('./config');
var configuration = vscode.workspace.getConfiguration('view-readme');
var npmUrl = configuration.get('npmUrl');

if ( !fs.existsSync(SAVE_PATH)) {
    fs.mkdirSync(SAVE_PATH);
}

function Remote (moduleName) {
    this.moduleName = moduleName;
    this.statusBar = new StatusBar();

    moduleName && this.init();
}

Remote.prototype = {
    init: function () {
        var self = this;
        this.statusBar.show('Fetching ' + this.moduleName);

        request({
            method: 'GET',
            url: npmUrl + this.moduleName,
            timeout: TIMEOUT
        }, function (error, response, body) {
            if (error) {
                self.statusBar.show(NOT_GOOD_NETWORK, ERROR_COLOR, DELAY_TIME, true);
                return;
            }
            self.statusBar.show('Loaded ' + self.moduleName);

            var data = JSON.parse(body);
            if (data.readme) {
                self.handleWriteFile(data.readme);
            } else {
                self.statusBar.show(NOT_FOUND, ERROR_COLOR, DELAY_TIME, true);
            }
        });
    },
    handleWriteFile (readme) {
        var self = this;
        var readmePath = path.join(SAVE_PATH, this.moduleName + '.md');
        fs.writeFile(readmePath, readme, function (error) {
            if (error) {
                self.statusBar.show(WRITE_FAILED, ERROR_COLOR, DELAY_TIME, true);
                return;
            }
            self.statusBar.dispose();
            vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse('file://' + readmePath));
        });
    }
};

module.exports = Remote;