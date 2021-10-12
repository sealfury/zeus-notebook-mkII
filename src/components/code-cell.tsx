import { useState, useEffect } from 'react'

import { CodeEditor, Preview, Resizable } from './'
import { bundle } from '../bundler'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  // Debounce bundling logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='/* Start Writing Some Code! */'
            onChange={value => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell
