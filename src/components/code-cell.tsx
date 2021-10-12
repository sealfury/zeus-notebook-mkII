import { useState } from 'react'

import { CodeEditor, Preview, Resizable } from './'
import { bundle } from '../bundler'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  }

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor
          initialValue='/* Start Writing Some Code! */'
          onChange={value => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell
