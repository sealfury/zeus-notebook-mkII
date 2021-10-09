import 'bulmaswatch/solar/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { unpkgPathPlugin, fetchPlugin } from './plugins'
import { CodeEditor, Preview } from './components'

const App = () => {
  const ref = useRef<any>()
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const WASM_URL = 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'

  // Initialize esbuild w/ ref storing service object
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: WASM_URL,
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"', // replace with string "production"
        global: 'window',
      },
    })

    setCode(result.outputFiles[0].text)
  }

  return (
    <div>
      <CodeEditor
        initialValue='/* Start Writing Some Code! */'
        onChange={value => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
