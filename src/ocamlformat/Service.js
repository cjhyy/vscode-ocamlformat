import { execSync } from 'child_process'
import { toString, trim } from 'ramda'
import { window, workspace } from 'vscode'
import { formatError, formatterInvalidSassPathMessage, formatterMissingCommandMessage } from '../utils'

export default class Service {
    static defaultFormatCommand = 'ocamlformat'

    get formatCommand() {
        const configuredFormatterPath = workspace.getConfiguration('ocamlformat').get('path')

        return configuredFormatterPath || Service.defaultFormatCommand
    }

    constructor() {
        this.checkoFormtatter()
    }

    checkoFormtatter() {
        try {
            const version = `${this.formatCommand} --version` |> execSync |> toString |> trim

            window.showInformationMessage(`${this.formatCommand} version: ${version}`)
        } catch (error) {
            const warningMessage =
                this.formatCommand === Service.defaultFormatCommand
                    ? formatterMissingCommandMessage
                    : formatterInvalidSassPathMessage

            window.showErrorMessage(formatError(error))
            window.showWarningMessage(`${this.formatCommand} warn:`, warningMessage)
        }
    }

    async formatText(text) {
        const tempFilePath = path.resolve(__dirname, '../../.temp')
        console.log(text)
        await errorFirstPromisify(writeFile)(tempFilePath, text, 'utf8')
        const [newText, stderr] = await errorFirstPromisify(exec)(`${service.formatCommand} ${tempFilePath}`)
        if (stderr) throw stderr

        return newText
    }
}
