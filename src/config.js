var path = require('path');
var { homedir } = require('os');

exports.MARKDOWN_PREVIEW = 'markdown.showPreview';
exports.README_NAMES = ['README.md', 'readme.md', 'Readme.md', 'README', 'readme'];
exports.INPUT_PROMPT = 'Enter module name';
exports.NO_FILE = 'Please open file firstly.';
exports.NOT_FOUND = 'Module not found!';

// exports.REMOTE_URL = 'https://registry.npmjs.org/'; // + moduleName  http://registry.npm.taobao.org/
exports.NOT_GOOD_NETWORK = 'Network is not good!';
exports.WRITE_FAILED = 'Write file failed!';
exports.SAVE_PATH = path.join(homedir(), '.vscode-view-readme');
exports.ERROR_COLOR = '#e74c3c';
exports.DELAY_TIME = 5000;
exports.TIMEOUT = 20000;