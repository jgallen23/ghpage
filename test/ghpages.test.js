var assert = require('assert');
var ghPages = require('../');
var fs = require('fs');
var path = require('path');
var existsSync = fs.existsSync || path.existsSync;
var exec = require('child_process').exec;

var fixture = path.join(__dirname, 'fixtures/input.md'); 

suite('ghPages', function() {

  test('error if no input', function(done) {
    ghPages({}, function(err) {
      assert.notEqual(err, null);
      assert.equal(err.message, 'input must be passed in');
      done();
    });
  });

  test('error if no design', function(done) {
    ghPages({ input: fixture }, function(err) {
      assert.notEqual(err, null);
      assert.equal(err.message, 'design must be passed in');
      done();
    });
  });

  test('invalid design', function(done) {
    ghPages({
      input: fixture,
      design: 'invalid-design'
    }, function(err) {
      assert.notEqual(err, null);
      assert.equal(err.message, 'invalid-design is not a valid design option');
      done();
    });
  });

  suite('build', function() {

    setup(function(done) {
      ghPages({
        input: fixture,
        design: 'test1',
        output: 'out',
        data: {
          pageTitle: 'this is the page title'
        }
      }, function(err) {
        done();
      });
    });

    teardown(function(done) {
      exec('rm -r out', function() {
        done();
      });
    });

    test('/tmp/ghpages created', function() {
      assert.ok(existsSync('out'));
    });

    test('index.html created', function() {
      assert.ok(existsSync('out/index.html'));
    });

    test('public directory created', function() {
      assert.ok(existsSync('out/public'));
      assert.ok(existsSync('out/public/common.css'));
    });

    test('index.html generated with data', function() {
      assert.equal(fs.readFileSync('out/index.html', 'utf8'), fs.readFileSync('test/fixtures/output.html', 'utf8'));
    });
  });
  
  
});

