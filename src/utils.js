import { split, slice, join, replace, trim } from 'ramda'

export const formatterMissingCommandMessage = 'Please install the target formatter command line tool.'
export const formatterInvalidSassPathMessage = 'The ocamlformatter path setting is not valid.'
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

export const formatError = error => {
    const errorString = error.toString('utf8').trim()
    console.log(error)

    return (
        (errorString
            |> split('\n')
            |> slice(1)
            |> join('\n')
            |> replace('Use --trace for backtrace.', '')
            |> replace('Use --trace for backtrace', '')
            |> trim) +
        '\n'
    )
}
