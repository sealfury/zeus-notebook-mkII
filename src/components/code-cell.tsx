import './code-cell.css'
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

  useEffect(() => {
    // eager bundling on page render
    if (!bundleRes) {
      createBundle(cell.id, cell.content)
      return
    }

    // Debounce bundling logic
    // bundle user code after 750ms between keystrokes
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // remove dependency warning for bundleRes
    // (adding it creates infinite loop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle])

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
        {!bundleRes || bundleRes.loading ? (
          <div className='progress-cover'>
            <progress className='progress is-normal is-success' max='100'>
              Loading...
            </progress>
          </div>
        ) : (
          <Preview code={bundleRes.code} bundlingStatus={bundleRes.err} />
        )}
      </div>
    </Resizable>
  )
}

export default CodeCell
