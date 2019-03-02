import { window } from 'vscode'
import Service from './Service'

export const documentSelector = { scheme: 'file', language: 'ocaml' }
export const outputChannel = window.createOutputChannel('ocamlformat')
export const service = new Service()
