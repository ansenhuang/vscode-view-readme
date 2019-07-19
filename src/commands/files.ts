import fs from 'fs';
import path from 'path';
import vscode from 'vscode';
import glob from 'glob';
import { findNodeModules } from '../utils';

const window = vscode.window;

function handleDirname(dirname: string) {
  glob('*', {
    cwd: dirname
  }, (err, matches) => {
    if (err) {
      console.log(err);
      return;
    }
    window.showQuickPick(matches).then(file => {
      if (file) {
        const pickFile = path.join(dirname, file);
        if (fs.statSync(pickFile).isDirectory()) {
          handleDirname(pickFile);
        } else {
          // open file
          vscode.commands.executeCommand(
            'vscode.open',
            vscode.Uri.file(pickFile)
          );
        }
      }
    });
  });
}

export default function filesCommand() {
  if (window.activeTextEditor && window.activeTextEditor.document) {
    const currentDir = path.dirname(window.activeTextEditor.document.fileName);
    const nodeModulesPath = findNodeModules(currentDir);
    if (nodeModulesPath) {
      handleDirname(nodeModulesPath);
    } else {
      window.showInformationMessage('I can\'t find node_modules from current file!');
    }
  } else {
    window.showInformationMessage('Please open a file first so I can search from node_modules.');
  }
}
