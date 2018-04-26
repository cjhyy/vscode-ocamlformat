import { Range, TextEdit, window } from 'vscode'
import { formatError } from '../utils'
import Service from './Service'

export const outputChannel = window.createOutputChannel('ocamlformat')

export const documentSelector = [{ language: 'ocaml' }]

const service = new Service()

const provideDocumentFormattingEdits = async (textDocument, formattingOptions, cancellationToken) => {
    const text = textDocument.getText()

    try {
        const newText = await service.formatText(text)

        const rangeStart = textDocument.lineAt(0).range.start
        const rangeEnd = textDocument.lineAt(textDocument.lineCount - 1).range.end
        const range = new Range(rangeStart, rangeEnd)

        return [TextEdit.replace(range, newText)]
    } catch (error) {
        this.outputChannel.append(formatError(error))
        this.outputChannel.show()
    }
}

export default { provideDocumentFormattingEdits }
