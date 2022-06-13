# Aurelia - Vanilla Skeleton
- Platform: Web
- Bundler: Aurelia-CLI
- Loader: SystemJS
- Transpiler: TypeScript
- Markup Processor: Minimal Minification
- CSS Processor: Sass
- Unit Test Runner: Jest
- Integration Test Runner: None
- Editor: None

## Other Configurations
- ASPNET .NET 6
- Bootstrap 5 w/ Scss
- Settings for VS2022 and VS Code.

## how to setup environment and run code
1. Install chocolatey

    ` 
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
`
[see ref](https://chocolatey.org/install)

2. Execute `choco install nodejs`. Should install v16.x+

3. Execute `choco install yarn`. Should install v1.22.15

4. Execute `yarn global aurelia-cli`. Should install > v2.0.3

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
    7. CTRL+F5 and the browser should launch. (if it doesn't, click the restart button on debug toolbar)

    Visual Studio 2022:
    1. Open PowerShell or Command Prompt and CD into Presentation.Web directory.
    2. Execute `yarn install`.
    3. Open solution file.
    4. Install Web Extensions (Task Runner Explorer)
    5. Restart Visual Studio (w/ elevated permissions).
    6. If Task Runner Explorer shows an error.   
    7. Go to Tools -> Options
        1. Projects & Solutions -> Web Package Management -> External Web Tools: Ensure path to nodejs is at the top of the list, typically "c:\program files\nodejs\" 
        2. Projects & Solutions -> Web Package Management -> Package Restore: Disable NPM Restore on Project Open and Save.
    8. In Task Runner Explorer, close the au-build-watch task that threw error. Double-click "au-build-watch" task to restart.
    9. Verify last line is "Finished 'writeBundles'.
    10. CTRL+F5 to Run w/o Debugging.

