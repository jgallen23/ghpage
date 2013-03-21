var assert = require('assert');

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var existsSync = fs.existsSync || path.existsSync;

var cmd = 'node bin/ghpage.js';

suite('cli', function() {

  test('no input', function(done) {
    exec(cmd + ' --design test1', function(err, stdout, stderr) {
      assert.ok(stdout.match(/Error: must pass in a file/));
      done();
    });
  });

  test('no design', function(done) {
    exec(cmd + ' test/fixtures/input.md', function(err, stdout, stderr) {
      assert.ok(stderr.match(/Missing required arguments: d/));
      done();
    });
  });

  suite('build', function() {

    teardown(function(done) {
      exec('rm -r out', function() {
        done();
      });
    });

    test('file', function(done) {

      exec(cmd + ' test/fixtures/input.md --design test1 --data test/fixtures/data.json --output out', function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.ok(existsSync('out'));
        assert.ok(existsSync('out/index.html'));
        assert.ok(existsSync('out/public'));
        assert.ok(existsSync('out/public/common.css'));
        assert.equal(fs.readFileSync('out/index.html', 'utf8'), fs.readFileSync('test/fixtures/output.html', 'utf8'));
        done();
      
      });
    });
    
  });
  
  
});

