#!/usr/bin/env node
import { program } from 'commander'

import { serveCommand } from './commands'

// chain additional addCommands for e.g. publish, login
program.addCommand(serveCommand)

// interpret user input & run relevant command
program.parse(process.argv)
