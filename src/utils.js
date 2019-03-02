import { trim } from 'ramda'

export const formatterMissingCommandMessage = 'Please install the target formatter command line tool.'
export const formatterInvalidSassPathMessage = 'The formatter path setting is invalid.'
export const formatterErrorMessage = 'There was an error formatting your file. See Output panel for more details.'

export const errorFirstPromisify = fn => (...args) =>
    new Promise((resolve, reject) => {
        fn(...args, (err, ...values) => {
            if (err) {
                reject(err)
                return
            }

            resolve(values)
        })
    })

export const formatError = error => (error |> toString |> trim) + '\n'
