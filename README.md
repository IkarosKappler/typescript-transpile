# typescript-transpile
Translate Typescript to Javascript in your browser using typescriptServices.js and tslib.js

Being on the verge of going from vanilla Javascript to Typescript I felt the need of
having a simple development environment for using both – Javascript and Typescript –
in the browser.

This script uses https://klesun-misc.github.io/TypeScript/lib/typescriptServices.js (https://github.com/microsoft/TypeScript/blob/master/lib/typescriptServices.d.ts)
and tslib.js.

Here is a live [Demo](https://www.int2byte.de/public/typescript-transpile/ts-runner.html "Demo").

## Load the required libraries
```html
   <!-- Load the typescript compiler/transpiler -->
   <script src="lib/typescriptService.js"></script>
   <!-- Load the helper functions library for Typescript -->
   <script src="lib/tslib.js"></script>
   <!-- This runs your typescripts -->
   <script src="run-typescript-in-browser.js"></script>
```

## Load your typescript (the loader will look for language=typescript)
```html
   <!-- THIS IS A TYPESCRIPT FILE -->
   <script language="typescript" type="text/typescript" src="demoscript1.ts"></script>
   <!-- AND THIS IS AN INLINE TYPESCRIPT -->
   <script language="typescript">
      class C { }
   </script>
```

## Wait for the typescripts to be loaded and transpiled
```javascript
   window.onTypescriptsLoaded = function(status) {
      console.log( status
	 ? '===Typescript successfully loaded.'
	 : '===Error loading typescript.'
      );
   };

```


### Sources
* https://github.com/microsoft/tslib
* https://klesun-misc.github.io/TypeScript/lib/typescriptServices.js
* https://github.com/microsoft/TypeScript/blob/master/lib/typescriptServices.d.ts


Have fun!