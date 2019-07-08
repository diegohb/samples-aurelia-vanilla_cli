import { Aurelia } from "aurelia-framework"
import environment from "./environment";
import * as $ from "jquery";
import "bootstrap";

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature("resources");

    aurelia.use.globalResources("bootstrap/css/bootstrap.css");

    aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

    if (environment.testing) {
        aurelia.use.plugin("aurelia-testing");
    }

    //Uncomment the line below to enable animation.
    // aurelia.use.plugin('aurelia-animator-css');
    //if the css animator is enabled, add swap-order="after" to all router-view elements

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin('aurelia-html-import-template-loader');

    aurelia.start().then((pAurelia: Aurelia) => {
        //Following enables multi-spa support with each container 
        //specifying via html-attribute what spa module to load
        let startModuleName = (<any>pAurelia.host.attributes).start.value;
        pAurelia.setRoot(startModuleName);
        $("#loader").fadeOut("slow");
    });
}
