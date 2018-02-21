import { Aurelia } from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');


  if (environment.debug) {
    console.log("debug");
    aurelia.use.developmentLogging();
    aurelia.use.plugin('aurelia-configuration', config => {
      config.setEnvironment('development');
    });
  }
  else {
    aurelia.use.plugin('aurelia-configuration', config => {
      config.setEnvironment('production');
    });
  }

  if (environment.testing) {
    console.log("testing");
    aurelia.use.plugin('aurelia-testing');
  }
  //custom plugins
  aurelia.use.plugin('aurelia-validation');
  //
  aurelia.start().then(() => aurelia.setRoot());
}
