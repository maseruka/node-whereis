var cp = require('child_process');

module.exports = function whereis(name, cb) {
  cp.exec('which ' + name, function(error, stdout, stderr) {
    stdout = stdout.split('\n')[0];
    if (error || stderr || stdout === '' || stdout.charAt(0) !== '/') {
      stdout = stdout.split('\n')[0];
      cp.exec('whereis ' + name, function(error, stdout, stderr) {
        if (error || stderr || stdout === '' || stdout.indexOf('/') === -1) {
          return cb(new Error('Could not find ' + name + ' or system not supported'));
        }

        return cb(null, stdout.split(' ')[1]);
      });
    } else {
      return cb(null, stdout);
    }
  });
};

