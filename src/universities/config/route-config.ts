export class UniversityRouterConfig {
    configureRouter(config) {
      config.map([
        { route: '', moduleId:'../../home'},
        { route: ':id', moduleId:'../view-models/university-details'},
      ])
  
    }
  }