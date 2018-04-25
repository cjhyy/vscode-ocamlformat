import { commands, window } from 'vscode'
import disposables from './ocamlformatter/disposables'

const registerTest = context => {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const test = commands.registerCommand('extension.test', function() {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        window.showInformationMessage('Hello World!')
    })

    context.subscriptions.push(test)
}

export const activate = context => {
    console.log('extension "auto-formatter" is now active!')
    context.subscriptions.push(...disposables)
}

export const deactivate = () => {}
