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

  // get code from current cell and all previous cells
  const cumulative = useTypedSelector(state => {
    const { data, order } = state.cells
    const orderedCells = order.map(id => data[id])
    /*
    ** create array of code cells excluding current cell 
    ** with functionality to render user code in preview window
    */
    const cumulativeCode = [
      `
        const show = () => {
          document.querySelector('#root).innerHTML = value
        }
      `
    ]
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content)
      }
      if (c.id === cell.id) {
        break
      }
    }
    return cumulativeCode
  })

  useEffect(() => {
    // eager bundling on page render
    if (!bundleRes) {
      createBundle(cell.id, cumulative.join('\n'))
      return
    }

    // Debounce bundling logic
    // bundle user code after 750ms between keystrokes
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulative.join('\n'))
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // adding bundleRes as dependency creates infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulative.join('\n'), createBundle])

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
