import { TextEdit, languages } from 'vscode'
import { documentSelector, service } from './commons'
import { formatError } from './utils'

class ProvideDocumentRangeFormattingEdits {
    async provideDocumentRangeFormattingEdits(document, range, options, token) {
        const text = document.getText()

        try {
            const newText = service.stdioFormat(text)
            console.log(newText)

            return [TextEdit.replace(range, newText)]
        } catch (error) {
            console.error(error)
            this.outputChannel.append(formatError(error))
            this.outputChannel.show()
        }
    }
}

export default languages.registerDocumentRangeFormattingEditProvider(
    documentSelector,
    new ProvideDocumentRangeFormattingEdits()
)
