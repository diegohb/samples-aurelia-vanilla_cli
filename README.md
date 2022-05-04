# Aurelia - Vanilla Skeleton
Created from **au new** wizard (v2.x), using custom (option 3) and config below:
- Platform: Web
- Bundler: Aurelia-CLI v2
- Loader: SystemJS
- Transpiler: TypeScript
- Markup Processor: Minimal Minification
- CSS Processor: Sass
- Unit Test Runner: Jest
- Integration Test Runner: None
- Editor: None

## Other Configurations
- ASPNET 6
- Bootstrap 5 w/ Sass
- Settings for VS2022 and VS Code.

## how to setup environment and run code
1. Install chocolatey

    `
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
`
[see ref](https://chocolatey.org/install)

2. Execute `choco install nodejs`. Should install v10.x

3. Execute `choco install yarn`. Should install v1.7.x.

4. Execute `yarn global aurelia-cli`. Should install > v2.x

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

    Visual Studio:
    1. Open PowerShell or Command Prompt and CD into Presentation.Web directory.
    2. Execute `yarn install`.
    3. Open solution file.
    4. Install Web Extensions (Task Runner Explorer)
    5. Restart Visual Studio (w/ elevated permissions).
    6. Task Runner Explorer will show an error.   
    7. Go to Tools -> Options
        1. Projects & Solutions -> Web Package Management -> External Web Tools: Ensure path to nodejs is at the top of the list, typically "c:\program files\nodejs\" 
        2.  Projects & Solutions -> Web Package Management -> Package Restore: Disable NPM Restore on Project Open and Save.
    8. In Task Runner Explorer, close the au-build-watch task that threw error. Double-click "au-build-watch" task to restart.
    9. Verify last line is "Finished 'writeBundles'.
    10. CTRL+F5 to Run w/o Debugging.


## learning resources
- [Official Aurelia Docs](http://aurelia.io/docs.html)
- [Aurelia Guides - From-Scractch](https://github.com/aurelia-guides/aurelia-guides.md-articles/blob/master/Building-Skeleton-Navigation-From-Scratch.md) (found this after the fact...)
- [SO Posting on Minimalistic Aurelia Project](http://stackoverflow.com/a/32081822/1240322)
- [Gitter chat room](https://gitter.im/Aurelia/Discuss)
- Pluralsight
	- [Scott Allen - Building Applications with Aurelia](https://app.pluralsight.com/library/courses/building-applications-aurelia/table-of-contents)
	- [Wes Higbee - Modern, Modular JavaScript with SystemJS and jspm](http://app.pluralsight.com/courses/javascript-systemjs-jspm)
	- [Wes Higbee - Seamless JavaScript Testing with Wallaby.js](http://app.pluralsight.com/courses/javascript-testing-wallaby-js)
