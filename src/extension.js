import { window } from 'vscode'
import disposables from './ocamlformat/disposables'

export const activate = context => {
    window.showInformationMessage('extension "ocamlformat" is now active!')
    context.subscriptions.push(...disposables)
}

export const deactivate = () => {}
