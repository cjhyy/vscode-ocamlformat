import { commands, window } from 'vscode'
import { formatError, service } from './commons'

const inplaceFormat = commands.registerCommand('extension.ocamlformat', async () => {
    const editor = window.activeTextEditor
    if (!editor) return

    const targetFile = window.activeTextEditor.document.fileName

    try {
        await service.inplaceFormat(targetFile)
    } catch (error) {
        console.error(error)
        this.outputChannel.append(formatError(error))
        this.outputChannel.show()
    }
})

export default inplaceFormat
