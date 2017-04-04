var vscode = require('vscode');

function StatusBar (align) {
  var Align = vscode.StatusBarAlignment[align] || vscode.StatusBarAlignment.Left;
  this.statusBarItem = vscode.window.createStatusBarItem(Align);
}

StatusBar.prototype = {
  show: function (msg, color, delay, isDispose) {
    var self = this;
    this.statusBarItem.text = msg;
    if (color) {
      this.statusBarItem.color = color;
    }
    this.statusBarItem.show();

    if (delay) {
      setTimeout(function () {
        if (!isDispose) {
          self.hide();
        } else {
          self.dispose();
        }
      }, delay);
    }
  },
  hide: function () {
    this.statusBarItem.hide();
  },
  dispose: function () {
    this.hide();
    this.statusBarItem.dispose();
  }
};

module.exports = StatusBar;