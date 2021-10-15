import path from 'path'
import { Command } from 'commander'
import { serve } from 'local-api'

// [] = optional value, <> = required value
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server', '4005')
  .action(async (filename = 'notes.js', options: { port: string }) => {
    try {
      // calculate directory variable & user-provided path
      const dir = path.join(process.cwd(), path.dirname(filename))

      // find actual file name in whatever relative path user provides
      const fileName = path.basename(filename)

      await serve(parseInt(options.port), fileName, dir)
      console.log(
        `Opened ${filename}! Navigate to http://localhost:${options.port} to edit.`
      )
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${options.port} is already in use. 
          Try a different port (hint: use the '-p' flag to select a port number)`
        )
      } else {
        console.log(`Something went wrong: ${err.message}`)
      }
      process.exit(1)
    }
  })
