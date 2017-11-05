import { RouterConfiguration, RouteConfig, activationStrategy } from "aurelia-router";
import { AuthorizeStep } from "./core/authorize-step";
import { IdentityService } from "./core/identity-service";
import { autoinject } from "aurelia-dependency-injection";

@autoinject()
export class App {
  constructor(private identityService: IdentityService) {
    console.log(this.identityService)
  }

  configureRouter(config: RouterConfiguration) {
    config.title = "OcenUczelnie"
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      { route: ['', 'home'], moduleId: './home', activationStrategy: activationStrategy.invokeLifecycle },
      { route: 'user', moduleId: "./users/config/route-config" },
      { route: 'universities', moduleId: "./universities/config/route-config" },
      { route: 'test', moduleId: './test', settings: { roles: ['user'] } }
    ]);
  }
}
