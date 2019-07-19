import fs from 'fs';
import path from 'path';
import vscode from 'vscode';
import { findNodeModules } from '../utils';

const window = vscode.window;
const readmeFiles = ['README.md', 'readme.md', 'Readme.md', 'README', 'readme'];

function handleNodeModules(nodeModulesPath: string) {
  const modules: string[] = [];
  // collect modules
  fs.readdirSync(nodeModulesPath).forEach((moduleName) => {
    if (moduleName[0] === '.') {
      return;
    } else if (moduleName[0] !== '@') {
      modules.push(moduleName);
    } else {
      // collect scope modules
      fs.readdirSync(path.join(nodeModulesPath, moduleName)).forEach((scopeModuleName) => {
        modules.push(moduleName + '/' + scopeModuleName);
      });
    }
  });
  // show vscode options box
  window.showQuickPick(modules, {
    placeHolder: 'Pick a moduleName',
  }).then((moduleName) => {
    if (moduleName) {
      const readmeFile = readmeFiles.find((file) =>
        fs.existsSync(path.join(nodeModulesPath, moduleName, file))
      );
      if (readmeFile) {
        // open readme in markdown
        vscode.commands.executeCommand(
          'markdown.showPreview',
          vscode.Uri.file(path.join(nodeModulesPath, moduleName, readmeFile))
        );
      } else {
        window.showInformationMessage('It doesn\'t seem to have readme!');
      }
    }
  });
}

export default function docsCommand() {
  if (window.activeTextEditor && window.activeTextEditor.document) {
    const currentDir = path.dirname(window.activeTextEditor.document.fileName);
    const nodeModulesPath = findNodeModules(currentDir);
    if (nodeModulesPath) {
      handleNodeModules(nodeModulesPath);
    } else {
      window.showInformationMessage('I can\'t find node_modules from current file!');
    }
  } else {
    window.showInformationMessage('Please open a file first so I can search from node_modules.');
  }
}
