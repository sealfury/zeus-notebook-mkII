import React from 'react'
import Monaco from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount = (
    getCurrentValue: () => string,
    monacoEditor: any
  ) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getCurrentValue())
    })
  }

  return (
    <Monaco
      editorDidMount={onEditorDidMount}
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
