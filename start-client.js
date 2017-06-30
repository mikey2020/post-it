const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'clients', shell: true };
require('child_process').spawn('npm', args, opts);