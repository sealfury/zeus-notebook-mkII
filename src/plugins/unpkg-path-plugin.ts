import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage' // allowSyntheticDefaultImports: true import syntax

const fileCache = localForage.createInstance({
  name: 'filecache',
})

export const unpkgPathPlugin = (userInput: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // onResolve -> Handle entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' }
      })

      // onResolve -> Handle relative module paths beginning with './' or '../'
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        }
      })

      // onResolve -> Handle main file of module (ideally)
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        }
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: userInput,
          }
        }

        // Check if file has already been fetched & is in cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        )

        // if so return immediately
        if (cachedResult) {
          return cachedResult
        }

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
