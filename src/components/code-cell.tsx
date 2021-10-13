import React, { useState, useEffect } from 'react'

import { CodeEditor, Preview, Resizable } from './'
import { bundle } from '../bundler'
import { Cell } from '../state'
import { useActions } from '../hooks'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const { updateCell } = useActions()

  // Debounce bundling logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content)
      setCode(output!.code)
      setErr(output!.err)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  )
}

export default CodeCell
