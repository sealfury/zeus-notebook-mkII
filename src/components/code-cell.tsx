import { useEffect } from 'react'

import { CodeEditor, Preview, Resizable } from './'
import { Cell } from '../state'
import { useActions, useTypedSelector } from '../hooks'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundleRes = useTypedSelector(state => state.bundles[cell.id])

  // Debounce bundling logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [cell.id, cell.content])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        {bundleRes && (
          <Preview code={bundleRes.code} bundlingStatus={bundleRes.err} />
        )}
      </div>
    </Resizable>
  )
}

export default CodeCell
