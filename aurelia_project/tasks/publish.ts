import * as gulp from 'gulp';
import * as gutil from 'gulp-util';
import * as ftp from 'vinyl-ftp';
import { CLIOptions } from 'aurelia-cli';
import build from './build';
import * as project from '../aurelia.json';
 
function publish(done) {
    let env = project.publish[CLIOptions.getEnvironment()];
    let assets = env.assets;
    let root = env.dest.root + "/";
 
    if (env.dest.type === "local") {
        assets.forEach((item) => {
            console.log('publish local:', item.src, '=>', root + item.dest);
            gulp.src(item.src)
                .pipe(gulp.dest(root + item.dest));
        });
    }
    else if (env.dest.type === "ftp") {
        let conn = ftp.create({
            host: env.dest.host,
            port: env.dest.port,
            user: CLIOptions.getFlagValue("username") || env.dest.username,
            password: CLIOptions.getFlagValue("password") || env.dest.password,
            parallel: 5,
            
            log: gutil.log
        });
        assets.forEach((item) => {
            gulp.src(item.src, { base: '.', buffer: false })
                .pipe(conn.dest(root + item.dest));
        });
    }
    done();
}
 
let _publish;
if (CLIOptions.hasFlag('build')) {
    _publish = gulp.series(
        build,
        publish
    );
} else {
    _publish = publish;
}
 
export { _publish as default };