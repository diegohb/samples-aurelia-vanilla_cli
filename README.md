# Aurelia - Vanilla Skeleton
Created from **au new** wizard (v0.32.x), using custom (option 3) and config below:
- Platform: Web
- Bundler: Aurelia-CLI
- Loader: SystemJS
- Transpiler: TypeScript
- Markup Processor: Minimal Minification
- CSS Processor: Less
- Unit Test Runner: Karma
- Integration Test Runner: None
- Editor: None

## Other Configurations
- ASPNET Core 2.1.x
- JQuery
- Bootstrap w/ Less
- Settings for VS2017 and VS Code.

## how to setup environment and run code
1. Install chocolatey

    `
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
`
[see ref](https://chocolatey.org/install)

2. Execute `choco install nodejs`. Should install v10.x

3. Execute `choco install yarn`. Should install v1.7.x.

4. Execute `yarn global aurelia-cli`. Should install > v0.32.x

    Note: Execute `refreshenv` or restart machine if you can't run `yarn`.

5. git clone this repo...

6. Choose your poison...

    VS Code:
    1. Open root directory with VS Code.
    2. CTRL+` to open the terminal
    3. It should be in the Presentation.Web directory but if not, CD into it.
    4. Execute `yarn install`.
    5. Go to Debug (CTRL+SHIFT+D) in VS Code.
    6. Switch to "launch (web)" configuration up top.
    7. CTRL+F5 and the browser should launch.

    Visual Studio 2017:
    1.


## learning resources
1. [Official Aurelia Docs](http://aurelia.io/docs.html)
- [Aurelia Guides - From-Scractch](https://github.com/aurelia-guides/aurelia-guides.md-articles/blob/master/Building-Skeleton-Navigation-From-Scratch.md) (found this after the fact...)
- [SO Posting on Minimalistic Aurelia Project](http://stackoverflow.com/a/32081822/1240322)
- [Gitter chat room](https://gitter.im/Aurelia/Discuss)
- Pluralsight
	- [Scott Allen - Building Applications with Aurelia](https://app.pluralsight.com/library/courses/building-applications-aurelia/table-of-contents)
	- [Wes Higbee - Modern, Modular JavaScript with SystemJS and jspm](http://app.pluralsight.com/courses/javascript-systemjs-jspm)
	- [Wes Higbee - Seamless JavaScript Testing with Wallaby.js](http://app.pluralsight.com/courses/javascript-testing-wallaby-js)
