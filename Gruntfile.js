module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            build: {
                options: {
                    paths: ['./Less'],
                    compress: true
                },
                files: {
                    './css/v8.min.css': './css/bootstrap.less'
                }
            }
        },
        uncss: {
            production: {
                files: {
                  './css/v8.min.css': ['v8.html', 'v8design.html', 'v8intuition.html', 'v8help.html', 'uncss-jsclasses.html']
                }
            },
            development: {
                files: {
                  './css/bootstrap.css': ['v8.html', 'v8design.html', 'v8intuition.html', 'v8help.html', 'uncss-jsclasses.html']
                }
            }
        },
        cssmin: {
            options: {
                report: 'gzip'
            },
            combine: {
                files: {
                    './css/v8.min.css': './css/v8.min.css'
                }
            }
        },
        uglify: {
            options: {
                    report: 'gzip',
                    beautify: false,
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                },
            js: {
                files: {
                    './js/v8.min.js': ['./js/modernizr.js', './js/picturefill.js', './js/scrollto.js', './js/form.js', './js/effects.js']
                }
            }
        },
        jshint: {
            all: ['./js/form.js', './js/effects.js']
        },
        watch: {
            css: {
                files: ['./css/*.less'], 
                tasks: ['less', 'uncss:production', 'cssmin'],
                options: {
                  livereload: true,
                }
            },
            js: {
                files: ['./js/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                  livereload: true,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.task.registerTask('default', ['less','uncss:production', 'cssmin', 'jshint', 'uglify', 'watch']);
    grunt.task.registerTask('dev', ['less','uncss:development', 'jshint', 'uglify']);
};