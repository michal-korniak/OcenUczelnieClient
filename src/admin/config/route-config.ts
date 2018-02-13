export class UniversityRouterConfig {
    configureRouter(config) {
      config.map([
        { route: ['universities', ''], moduleId:'../view-models/universities-panel'},
      ])

    }
  }