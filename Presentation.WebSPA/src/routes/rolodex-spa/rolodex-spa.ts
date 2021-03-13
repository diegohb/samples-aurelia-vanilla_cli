﻿import { PLATFORM } from "aurelia-pal";
import { Router, RouterConfiguration, NavigationInstruction } from "aurelia-router";
import { Aurelia } from "aurelia-framework"

export class RolodexSPAViewModel {
    public router: Router;

    public configureRouter(pConfig: RouterConfiguration, pRouter: Router) {
        pConfig.title = "Contacts";
        pConfig.options.pushState = true;
        pConfig.options.root = "/Rolodex";
        const navStratRedirect = (instruction: NavigationInstruction) => {
            window.location.href = "/pokemon"; //eeggh .. shouldn't know about the other spa routes. hack for pushstate and routing
        }
        pConfig.map([
            { route: "", moduleId: PLATFORM.moduleName("./no-selection"), title: "Select" },
            { route: "contacts/:id", moduleId: PLATFORM.moduleName("./contact-detail"), name: "contacts" },
            { route: "pokemon", name: "pokemon", navigationStrategy: navStratRedirect }
        ]);

        this.router = pRouter;
    }
}