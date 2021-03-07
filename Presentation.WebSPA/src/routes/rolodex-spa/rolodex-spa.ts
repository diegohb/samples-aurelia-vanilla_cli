import { PLATFORM } from "aurelia-pal";
import { Router, RouterConfiguration, RouteConfig } from "aurelia-router";

export class RolodexSPAViewModel {
    public router: Router;

    public configureRouter(pConfig: RouterConfiguration, pRouter: Router) {
        pConfig.title = "Contacts";
        pConfig.options.pushState = true;
        pConfig.options.root = "/Rolodex/";
        pConfig.map([
            { route: "", moduleId: PLATFORM.moduleName("./no-selection"), title: "Select" },
            { route: "contacts/:id", moduleId: PLATFORM.moduleName("./contact-detail"), name: "contacts" }
        ]);

        this.router = pRouter;
    }
}