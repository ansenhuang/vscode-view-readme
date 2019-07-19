import vscode from 'vscode';
import docsCommand from './commands/docs';
import filesCommand from './commands/files';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "view-readme" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('viewReadme.docs', docsCommand),
		vscode.commands.registerCommand('viewReadme.files', filesCommand),
	);
}

export function deactivate() {}
