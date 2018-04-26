import { languages } from 'vscode'
import provider, { documentSelector, outputChannel } from './provider'

export default [languages.registerDocumentFormattingEditProvider(documentSelector, provider), outputChannel]
