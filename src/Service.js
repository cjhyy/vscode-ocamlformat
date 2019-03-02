import { exec, spawnSync } from 'child_process'
import { workspace } from 'vscode'
import { errorFirstPromisify } from './utils'

export default class Service {
    static defaultFormatCommand = 'ocamlformat'

    get formatCommand() {
        const configuredFormatterPath = workspace.getConfiguration('ocamlformat').get('path')

        return configuredFormatterPath || Service.defaultFormatCommand
    }

    inplaceFormat = async filepath => {
        const [_, stderr] = await errorFirstPromisify(exec)(`${this.formatCommand} ${filepath} --inplace`)
        if (stderr) throw stderr
    }

    stdioFormat = text => {
        const { stdout, stderr } = spawnSync(Service.defaultFormatCommand, ['-', '--name vscode-ocamlformat'], {
            input: text
        })

        if (stderr) throw stderr
        return stdout
    }
}
