import express from 'express'

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  router.get('/cells', async (req, res) => {
    // Ensure cell storage file exists
    // If file doesn't exist add a default list of cells
    // Read file
    // Parse list of cells from file
    // Send list of cells to browser
  })

  router.post('/cells', async (req, res) => {
    // Ensure cell storage file exists
    // If file doesn't exist, create it
    // Take list of cells from request object
    // Serialize list of cells
    // Write cells into file
  })

  return router
}
