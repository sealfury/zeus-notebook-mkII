import Monaco from '@monaco-editor/react'

const CodeEditor = () => {
  return <Monaco 
    theme='vs-dark' 
    language='javascript' 
    height='500px' 
    options={{
      wordWrap: 'on'
    }}
  />
}

export default CodeEditor
