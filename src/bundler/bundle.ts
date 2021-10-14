import * as esbuild from 'esbuild-wasm'

import { unpkgPathPlugin, fetchPlugin } from './plugins'

const WASM_URL = 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
let service: esbuild.Service

const bundle = async (codeInput: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: WASM_URL,
    })
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(codeInput)],
      define: {
        'process.env.NODE_ENV': '"production"', // replace with string "production"
        global: 'window',
      },
    })

    return {
      code: result.outputFiles[0].text,
      err: '',
    }
    // assign err any type instead of type guarding it
    // to prevent conflict in bundle action creator
  } catch (err: any) {
    return {
      code: '',
      err: err.message,
    }
  }
}

export default bundle
