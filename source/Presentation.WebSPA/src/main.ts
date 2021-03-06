import { Aurelia } from "aurelia-framework"
import fs from "fs"
import * as auPathUtil from "aurelia-path";
import environment from "./environment";
import $ from "jquery";
import "bootstrap";

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature("resources");

    aurelia.use.globalResources("bootstrap.css");

    aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

    if (environment.testing) {
        aurelia.use.plugin("aurelia-testing");
    }

    //Uncomment the line below to enable animation.
    // aurelia.use.plugin('aurelia-animator-css');
    //if the css animator is enabled, add swap-order="after" to all router-view elements

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin('aurelia-html-import-template-loader');

    //Following enables multi-spa support with each container 
    //specifying via html-attribute what spa module to load
    const startModuleName = (<any>aurelia.host.attributes).start.value;
    const spaRootedResourcesPath: string = auPathUtil.relativeToFile("./resources", startModuleName);
    aurelia.use.feature(spaRootedResourcesPath); //TODO: if folder exists so we dont need blank default file.
    
    aurelia.start().then((pAurelia: Aurelia) => {
        pAurelia.setRoot(startModuleName);
        $("#loader").fadeOut("slow");
    });
}
