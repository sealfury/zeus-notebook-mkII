import 'bulmaswatch/solar/bulmaswatch.min.css'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import { CodeEditor, Preview } from './components'
import { bundle } from './bundler'

const App = () => {
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

ReactDOM.render(<App />, document.querySelector('#root'))
