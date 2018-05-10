import { exec, execSync } from 'child_process'
import path from 'path'
import { toString, trim } from 'ramda'
import { window, workspace } from 'vscode'
import {
    errorFirstPromisify,
    formatError,
    formatterInvalidSassPathMessage,
    formatterMissingCommandMessage
} from '../utils'
import { writeFile } from 'fs'

export default class Service {
    static defaultFormatCommand = 'ocamlformat'

    get formatCommand() {
        const configuredFormatterPath = workspace.getConfiguration('ocamlformat').get('path')

        return configuredFormatterPath || Service.defaultFormatCommand
    }

    constructor() {
        this.checkoFormtatter()
    }

    checkoFormtatter = () => {
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

    inplaceFormat = async filepath => {
        const [_, stderr] = await errorFirstPromisify(exec)(`${this.formatCommand} ${filepath} --inplace`)
        if (stderr) throw stderr
    }

    formatText = async text => {
        const tempFilePath = path.resolve(__dirname, '../../node_modules/.temp')

        await errorFirstPromisify(writeFile)(tempFilePath, text, 'utf8')
        const [newText, stderr] = await errorFirstPromisify(exec)(`${this.formatCommand} ${tempFilePath}`)
        if (stderr) throw stderr

        return newText
    }
}
