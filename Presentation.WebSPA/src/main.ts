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

    aurelia.start().then((pAurelia: Aurelia) => {
        let startModuleName = (<any>pAurelia.host.attributes).start.value;
        pAurelia.setRoot(startModuleName);
        $("#loader").fadeOut("slow");
    });
}
