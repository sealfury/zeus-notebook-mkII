import React from 'react'
import Monaco from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  return (
    <Monaco
      value={initialValue}
      theme='vs-dark'
      language='javascript'
      height='500px'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 14,
        fontLigatures: false,
        fontWeight: '440',
        fontFamily: 'Monaco',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
