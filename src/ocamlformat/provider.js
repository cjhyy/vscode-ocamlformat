import { exec } from 'child_process'
import { Range, TextEdit, window } from 'vscode'
import { errorFirstPromisify, formatError } from '../utils'
import Service from './Service'

export const outputChannel = window.createOutputChannel('ocamlformat')

export const documentSelector = [{ language: 'ocaml' }]

const service = new Service()

const provideDocumentFormattingEdits = async (textDocument, formattingOptions, cancellationToken) => {
    try {
        const [newText, stderr] = await errorFirstPromisify(exec)(`${service.formatCommand} ${textDocument.fileName}`)
        if (stderr) throw stderr

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
