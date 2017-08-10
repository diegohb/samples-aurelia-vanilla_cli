import {Aurelia} from "aurelia-framework"
import environment from "./environment";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("resources");

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin("aurelia-testing");
  }

    aurelia.start().then((pAurelia:Aurelia) => {
        let startModuleName = (<any>pAurelia.host.attributes).start.value;
        pAurelia.setRoot(startModuleName);
    });
}
