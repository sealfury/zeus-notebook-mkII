import { useState } from 'react'

import { CodeEditor, Preview } from './'
import { bundle } from '../bundler'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
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

export default CodeCell
