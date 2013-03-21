#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version;
var ghPages = require('../');

var opt = require('optimist')
  .usage('gh-pages '+version+'\nUsage: $0 input.md [opts]')
  .options('d', {
    alias: 'design',
    describe: 'design option',
    demand: true
  })
  .options('t', {
    alias: 'data',
    type: 'string',
    describe: 'JSON data file that gets passed to input and template'
  })
  .options('o', {
    alias: 'output',
    type: 'string',
    describe: 'Output directory to write the files',
    'default': '.'
  })
  .options('h', {
    alias: 'help',
    describe: 'Show help info'
  });

var argv = opt.argv;

if (argv.help || argv._.length === 0) {
  return opt.showHelp(function(help) {
    console.log(help);
    if (argv._.length === 0) {
      console.log('Error: must pass in a file');
    }
  });
}

var data;
if (argv.data) {
  var dataPath = path.resolve(process.cwd(), argv.data);
  data = require(dataPath);
}

ghPages({
  input: argv._[0],
  design: argv.design,
  output: argv.output,
  data: data
}, function(err) {
  if (err) {
    throw err;
  }
  console.log(argv._[0] + ' has been converted to html using the ' + argv.design + ' design. It has been saved in the ' + argv.output + ' directory.');
});


