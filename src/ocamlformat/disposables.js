import { languages } from 'vscode'
import provider, { documentSelector, outputChannel } from './provider'
import commands from './commands'

export default [
    outputChannel,
    languages.registerDocumentFormattingEditProvider(documentSelector, provider),
    ...commands
]
