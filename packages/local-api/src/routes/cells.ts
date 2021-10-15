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

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    // Ensure cell storage file exists
    // If file doesn't exist add a default list of cells
    // Read file
    // Parse list of cells from file
    // Send list of cells to browser
  })

  router.post('/cells', async (req, res) => {
    // Serialize list of cells from request object
    const { cells }: { cells: Cell[] } = req.body

    // Write cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 201 })
  })

  return router
}
