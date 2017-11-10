export class UniversityRouterConfig {
    configureRouter(config) {
      config.map([
        { route: ':id', moduleId:'../view-models/course-details'},
      ])
  
    }
  }