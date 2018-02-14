export class UniversityRouterConfig {
  configureRouter(config) {
    config.map([
      { route: 'university-editor', moduleId: '../view-models/university-editor' },
      { route: 'courses-editor/:universityId', moduleId: "../view-models/courses-editor" },
    ])

  }
}