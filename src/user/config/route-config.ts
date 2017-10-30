export class UserRouterConfig {
    configureRouter(config) {
      config.map([
        { route: 'login', moduleId:'../view-models/login-user', title:"Logowanie"},
        { route: 'register', moduleId:'../view-models/register-user', title:"Rejestracja"}
      ])
  
    }
  }