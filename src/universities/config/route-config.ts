export class UniversityRouterConfig {
    configureRouter(config) {
      config.map([
        { route: 'details', moduleId:'../view-models/university-details'},
      ])
  
    }
  }