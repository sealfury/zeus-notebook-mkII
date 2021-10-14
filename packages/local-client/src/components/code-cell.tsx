import './code-cell.css'
import { useEffect } from 'react'

import { CodeEditor, Preview, Resizable } from './'
import { Cell } from '../state'
import { useActions, useTypedSelector, useCumulativeCode } from '../hooks'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundleRes = useTypedSelector(state => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    // eager bundling on page render
    if (!bundleRes) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    // Debounce bundling logic
    // bundle user code after 750ms between keystrokes
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // adding bundleRes as dependency creates infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle])

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
        {/* prevent flashing preview background with wrapper */}
        <div className='progress-wrapper'>
          {!bundleRes || bundleRes.loading ? (
            <div className='progress-window'>
              <progress className='progress is-normal is-success' max='100'>
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundleRes.code} bundlingStatus={bundleRes.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
