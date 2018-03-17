var path = require('path');

exports.MARKDOWN_PREVIEW = 'markdown.showPreview';
exports.README_NAMES = ['README.md', 'readme.md', 'Readme.md', 'README', 'readme'];
exports.PICK_PLACE_HOLDER = 'Pick a module name';
exports.NO_FILE = 'Please open a file first so we can search node_modules.';
exports.NOT_FOUND = 'There is no node_modules from current path to root path!';

exports.REMOTE_URL = 'https://registry.npmjs.org/'; // 'https://registry.npm.taobao.org/'; + moduleName
exports.CACHE_DAYS = 7;
exports.BAD_NETWORK = 'It seems newwork is not good so request failed!';
exports.NO_README = 'There is no readme content of this package!';
exports.WRITE_FAILED = 'Save readme file failed, please try again!';
exports.SAVE_PATH = path.join(process.env.HOME, '.vscode-view-readme');
// exports.ERROR_COLOR = '#e74c3c';
// exports.DELAY_TIME = 5000;
exports.TIMEOUT = 20000;