import * as vscode from 'vscode';
import { exec } from 'child_process';

const configuration = vscode.workspace.getConfiguration('emulatorLancher');
const emulatorPath = configuration.get('emulatorPath');

export function activate(context: vscode.ExtensionContext) {
	createStatusBarItem(context);

	let disposable = vscode.commands.registerCommand('androidemulatorlauncer.launchAndroidEmulator', () => {
		vscode.window.showInformationMessage('Android Emulator Launced!');
	});

	context.subscriptions.push(disposable);
}

function createStatusBarItem(context: vscode.ExtensionContext) {
	const commandId = 'AndroidEmulatorLauncer.statusBarClick';

	context.subscriptions.push(vscode.commands.registerCommand(commandId, async () => {
		const command = `${emulatorPath} -list-avds`;

		runShellCommand(command, async (output: string) => {
			const options = output.split("\n");
			if (options.length === 0) {
				vscode.window.showErrorMessage(`Cannot find virtual devides, Check your settings and configurations`);
			}
			const pageType = await vscode.window.showQuickPick(options);

			runShellCommand(`${emulatorPath} -avd ${pageType} &>/dev/null &`, (output: string) => {});
		});
	}));

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	item.command = commandId;

	context.subscriptions.push(item);

	item.text = `Launch Android Emulator`;
	item.tooltip = `Click here to view the list of your emulators and select one.`;
	item.show();
}

function runShellCommand(command: string, callback: (output: string) => void) {
	exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`Error executing command: ${error}`);
			return;
		}
		callback(stdout.trim());
	});
}

export function deactivate() { }
