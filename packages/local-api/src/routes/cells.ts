import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'code' | 'text'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json)

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    try {
      // Read file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      // Parse list of cells from file & send list of cells
      res.send(JSON.parse(result))
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        // If file doesn't exist, create it and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        console.log(err)
      }
    }
  })

  router.post('/cells', async (req, res) => {
    // Serialize list of cells from request object
    const { cells }: { cells: Cell[] } = req.body

    // Write cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router
}
