var markx = require('markx');
var path = require('path');
var fs = require('fs');
var aug = require('aug');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var exists = fs.exists || path.exists;

var defaults = {
  designPath: path.join(__dirname, '../designs'),
  output: '.'
};

var ghPages = function(options, callback) {
  callback = callback || function() {};

  options = aug({}, defaults, options);

  if (!options.input) {
    return callback(new Error('input must be passed in'));
  }

  if (!options.design) {
    return callback(new Error('design must be passed in'));
  }

  var design = path.join(options.designPath, options.design);

  exists(design, function(exist) {
    if (!exist) {
      return callback(new Error(options.design + ' is not a valid design option'));
    }

    //extend default data
    options.template = path.join(design, 'layout.html');

    markx(options, function(err, html) {
      if (err) {
        return callback(err);
      }

      mkdirp(options.output, function(err) {
        if (err) {
          return callback(err);
        }

        fs.writeFile(path.join(options.output, 'index.html'), html, function(err) {
          if (err) {
            return callback(err);
          }

          ncp(path.join(design, 'public'), path.join(options.output, 'public'), function(err) {
            if (err) {
              return callback(err);
            }

            callback(null);
          });

        });

      });
      //copy public folder

    });

  });


};


module.exports = ghPages;
