import path from 'path'
import { Command } from 'commander'
import { serve } from 'local-api'

// [] = optional value, <> = required value
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server', '4005')
  .action((filename = 'notes.js', options: { port: string }) => {
    // calculate directory variable & user-provided path
    const dir = path.join(process.cwd(), path.dirname(filename))
    // find actual file name in whatever relative path user provides
    const fileName = path.basename(filename)

    serve(parseInt(options.port), fileName, dir)
  })
