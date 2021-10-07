import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage' // allowSyntheticDefaultImports: true import syntax

const fileCache = localForage.createInstance({
  name: 'filecache',
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          }
        }

        // // Check if file has already been fetched & is in cache
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
        //   args.path
        // )

        // // if so return immediately
        // if (cachedResult) {
        //   return cachedResult
        // }

        const { data, request } = await axios.get(args.path)

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'

        // append CSS into style element of some html doc w/ JS
        const fileContents =
          fileType === 'css'
            ? `
            const style = document.createElement('style');
            style.innerText = 'body { background-color: "blue" }';
            document.head.appendChild(style)
          `
            : data

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: fileContents,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })
    },
  }
}
