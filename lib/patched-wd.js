let commands = require('wd/lib/commands');
const { simpleCallback } = require('wd/lib/callbacks');

// uiautomator2 has a precise tap method that's not part of the official api
// so monkey-patch wd to use it
commands.preciseTap = function (x, y, cb) {
  this._jsonWireCall({
    method: 'POST'
    , relPath: '/appium/tap'
    , cb: simpleCallback(cb)
    , data: {x, y}
  });
};

const wd = require('wd');

module.exports = wd;
