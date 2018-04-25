import { window } from 'vscode'
import Service from './Service'

export const outputChannel = window.createOutputChannel('ocamlformatter')

export const documentSelector = { language: 'ocaml' }

const service = new Service(outputChannel)

const provideDocumentFormattingEdits = doc => {
    const text = document.getText()
    console.log(document)

    // errorFirstPromisify(exec)()
}

export default { provideDocumentFormattingEdits }
