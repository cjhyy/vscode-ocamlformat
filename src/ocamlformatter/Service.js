import { execSync } from 'child_process'
import { toString, trim } from 'ramda'
import { workspace } from 'vscode'
import { formatError, formatterInvalidSassPathMessage, formatterMissingCommandMessage } from '../utils'
import path from 'path'

export default class Service {
    constructor(outputChannel) {
        this.outputChannel = outputChannel
        this.checkoFormtatter()
    }

    get formatterCommand() {
        const configuredFormatterPath = workspace.getConfiguration('ocamlformatter').get('path')

        return configuredFormatterPath || Service.defaultFormatterCommand
    }

    checkoFormtatter() {
        try {
            const version = `${this.formatterCommand} --version` |> execSync |> toString |> trim

            this.outputChannel.appendLine(version)
            console.info(`${this.formatterCommand} version:`, version)
        } catch (error) {
            const warningMessage =
                this.formatterCommand === Service.defaultFormatterCommand
                    ? formatterMissingCommandMessage
                    : formatterInvalidSassPathMessage

            this.outputChannel.append(formatError(error))
            this.outputChannel.show()
            console.warn(`${this.formatterCommand} warn:`, error.toString('utf8').trim())
        }
    }
}
