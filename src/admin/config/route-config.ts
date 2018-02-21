export class UniversityRouterConfig {
  configureRouter(config) {
    config.map([
      { route: '', moduleId: "../view-models/universities-menu" },
      { route: ['university-creator', 'university-editor/:id'], moduleId: '../view-models/university-form' },
      { route: 'courses-editor/:universityId', moduleId: "../view-models/courses-editor" },
    ])

  }
}