export class App {
  configureRouter(config) {
    config.title="OcenUczelnie"
    config.map([
      { route: '', moduleId:'./home' },
      { route: 'user', moduleId:"./user/config/route-config"}
    ])

  }
}
