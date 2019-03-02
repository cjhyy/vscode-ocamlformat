import { window } from 'vscode'
import { outputChannel } from './commons'
import languageFormatProvider from './language-format-provider'
import inplaceFormatCommand from './inplace-format-commands'

const disposables = [outputChannel, languageFormatProvider, inplaceFormatCommand]

export const activate = context => {
    window.showInformationMessage('extension "ocamlformat" is now active!')
    disposables.forEach(disposable => context.subscriptions.push(disposable))
}

export const deactivate = () => {
    window.showInformationMessage('extension "ocamlformat" is now deactived!')
}
