/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      files: ['grunt.js', 'bin/*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      lib: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'simplemocha']
      },
      designs: {
        files: 'designs/**/layout.html',
        tasks: 'markx'
      },
      designsLess: {
        files: [
          'designs/**/*.less'
        ],
        tasks: 'less:designs'
      },
      fixutres: {
        files: 'test/fixtures/example.md',
        tasks: 'markx'
      }
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'tdd',
          reporter: 'list',
          growl: true
        }
      }
    },
    markx: {
      simple: {
        input: 'test/fixtures/example.md',
        output: 'designs/simple/preview.html',
        template: 'designs/simple/layout.html',
        data: {
          pageTitle: 'Page title',
          builtBy: 'Greg Allen',
          builtTwitter: 'jgaui',
          analytics: 'UA-24017782-2'
        }
      }
    },
    less: {
      designs: {
        files: {
          'designs/simple/public/common.css': 'designs/simple/ui/common.less'
        }
      }
    },
    reloadr: {
      designs: [
        'designs/**/public/*',
        'designs/**/preview.html'
      ]
    },
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          base: 'designs'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-markx');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-reloadr');

  // Default task.
  grunt.registerTask('designs', ['less', 'markx']);
  grunt.registerTask('lib', ['jshint', 'simplemocha']);
  grunt.registerTask('default', ['lib', 'designs']);
  grunt.registerTask('dev', ['connect', 'reloadr', 'watch']);

};
