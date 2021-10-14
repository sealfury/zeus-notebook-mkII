import { Command } from 'commander'

// [] = optional value, <> = required value
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server', '4005')
  .action((filename = 'notes.js', options) => {
    console.log(filename, options)
  })
