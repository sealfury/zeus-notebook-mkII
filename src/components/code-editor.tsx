import React from 'react'
import Monaco, { EditorDidMount } from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: EditorDidMount = (getCurrentValue, editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(getCurrentValue())
    })

    editor
      .getModel()
      ?.updateOptions({ tabSize: 2, indentSize: 2, trimAutoWhitespace: true })
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
