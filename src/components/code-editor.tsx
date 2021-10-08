import { useRef } from 'react'
import Monaco, { EditorDidMount } from '@monaco-editor/react'
import Prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getCurrentValue, editor) => {
    editorRef.current = editor

    editor.onDidChangeModelContent(() => {
      onChange(getCurrentValue())
    })

    editor
      .getModel()
      ?.updateOptions({ tabSize: 2, indentSize: 2, trimAutoWhitespace: true })
  }

  const onFormatClick = () => {
    // get current value from editor
    const unformattedCode = editorRef.current.getModel().getValue()

    // format the value
    const formattedCode = Prettier.format(unformattedCode, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: false,
      singleQuote: true,
      jsxSingleQuote: true,
      bracketSpacing: true,
      bracketSameLine: false,
      arrowParens: 'always',
    })

    // set the formatted value back in the editor
    editorRef.current.setValue(formattedCode)
  }

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
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
    </div>
  )
}

export default CodeEditor
