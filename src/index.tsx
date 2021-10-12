import 'bulmaswatch/solar/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './state'
import { TextEditor } from './components'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
