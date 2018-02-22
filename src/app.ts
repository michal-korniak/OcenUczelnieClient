import { RouterConfiguration, RouteConfig, activationStrategy } from "aurelia-router";
import { AuthorizeStep } from "./core/authorize-step";
import { IdentityService } from "./core/identity-service";
import { autoinject } from "aurelia-dependency-injection";
import { enable, destroy } from 'splash-screen';
import { AureliaConfiguration } from "aurelia-configuration";

@autoinject()
export class App {
  constructor(private identityService: IdentityService, config:AureliaConfiguration) {
    enable('tailing');
  }

  configureRouter(config: RouterConfiguration) {
    config.title = "OcenUczelnie"
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      { route: ['', 'home'], moduleId: './home', activationStrategy: activationStrategy.invokeLifecycle },
      { route: 'user', moduleId: "./users/config/route-config" },
      { route: 'university', moduleId: "./universities/config/route-config" },
      { route: 'course', moduleId: "./courses/config/route-config" },
      { route: 'admin', moduleId: "./admin/config/route-config", settings: { roles: ["admin"] } }
    ]);
  }
  attached() {
    destroy();
  }
}
