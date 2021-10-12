import './preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
  code: string
  bundlingStatus: string
}

const html = /*template*/ `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            // intercept error to display in code preview area
            const root = document.querySelector('#root');
            root.innerHTML = 
              '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err); // output detailed error in console again
          };
          // Async errors
          window.addEventListener('error', (event) => {
            event.preventDefault()
            handleError(event.error)
          });
          // Runtime Errors
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              handleError(err)
            }
          }, false);
        </script>
      </body>
    </html>
  `

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>()

  useEffect(() => {
    // Reset iframe contents before processing code input
    iframe.current.srcdoc = html
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return (
    <div className='preview-wrapper'>
      <iframe
        title='User Code Preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {bundlingStatus && (
        <div className='preview-error'>
          <h4 className='error-title'>Bundling Error:</h4> <br />{' '}
          {bundlingStatus}
        </div>
      )}
    </div>
  )
}

export default Preview
