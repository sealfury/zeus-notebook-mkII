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
      // Loads files named exactly index.js
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        }
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check if file has already been fetched & is in cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        )

        // if so return immediately
        if (cachedResult) {
          return cachedResult
        }
      })

      // Loads **.css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        // Append escaped CSS string into style element of some
        // html doc via a Javascript snippet
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        const fileContents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style)
          `

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: fileContents,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
        // Store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })
    },
  }
}
