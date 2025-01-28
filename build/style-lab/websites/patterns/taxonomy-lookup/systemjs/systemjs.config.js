/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      // Copy of compiler options in standard tsconfig.json
      "target": "es5",
      // "outDir": "./dist/out-tsc",
      "baseUrl": "src",
      "sourceMap": true,
      "declaration": false,
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      // "module": "commonjs",
      // "moduleResolution": "node",
      // "sourceMap": true,
      // "emitDecoratorMetadata": true,
      // "experimentalDecorators": true,
      "lib": ["es2016", "dom"],
      // "noImplicitAny": true,
      "typeRoots": [
        "node_modules/@types"
      ],
      // "suppressImplicitAnyIndexErrors": true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    paths: {
      // paths serve as alias
      // "*": "*.ts", // should load all libraries with .ts appended
      'npm:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'environments/environment': 'http://localhost:8000/websites/patterns/taxonomy-lookup/tax/src/environments/environment.ts',
      'app': 'app',

      // angular bundles
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      // '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      // '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      // '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs@5.0.1',
      // 'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts':                        'npm:plugin-typescript@5.2.7/lib/plugin.js',
      'typescript':                'npm:typescript@2.2.1/lib/typescript.js',
      'ngx-bootstrap':             'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.js'

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        transpiler: 'ts',
        main: './main.ts',
        defaultExtension: 'ts',
        meta: {
          // './*.ts': {
          //   loader: 'systemjs-angular-loader.js'
          // }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });

})(this);
