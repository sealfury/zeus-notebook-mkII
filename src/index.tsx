import 'bulmaswatch/solar/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { unpkgPathPlugin, fetchPlugin } from './plugins'
import { CodeEditor } from './components'

const App = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
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

    // Reset iframe contents before processing code input
    iframe.current.srcdoc = html

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

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  const html = /*template*/ `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              // intercept error to display in code preview area
              const root = document.querySelector('#root')
              root.innerHTML = 
                '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err) // output detailed error in console again
            }
          }, false);
        </script>
      </body>
    </html>
  `

  return (
    <div>
      <CodeEditor
        initialValue='/* Start Writing Some Code! */'
        onChange={value => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title='User Code Preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
