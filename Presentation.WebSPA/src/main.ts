import { Aurelia } from "aurelia-framework"
import environment from "./environment";
import * as $ from "jquery";
import "bootstrap-less";

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin("aurelia-bootstrap")
        .feature("resources");

    aurelia.use.globalResources("/less/bootstrap.css");

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin("aurelia-testing");
    }

    aurelia.start().then((pAurelia: Aurelia) => {
        let startModuleName = (<any>pAurelia.host.attributes).start.value;
        pAurelia.setRoot(startModuleName);
        $("#loader").fadeOut("slow");
    });
}
