import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'

import { createCellsRouter } from './routes'

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express()

  app.use(createCellsRouter(filename, dir))

  if (useProxy) {
    // local development of react app
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    )
  } else {
    // running on user's machine
    const pkgAbsPath = require.resolve('@zeusnotebook/client/build/index.html')
    app.use(express.static(path.dirname(pkgAbsPath)))
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
