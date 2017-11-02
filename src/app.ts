import { RouterConfiguration, RouteConfig } from "aurelia-router";
import { AuthorizeStep } from "./core/authorize-step";

export class App {
  configureRouter(config: RouterConfiguration) {
    config.title = "OcenUczelnie"
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      { route: '', moduleId: './home' },
      { route: 'user', moduleId: "./user/config/route-config" },
      { route: 'test', moduleId: './test', settings: { roles: ['user'] } }
    ]);
  }
}
