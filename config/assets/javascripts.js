/**
 * Created by leonid.raizmen on 22/12/2014.
 */
module.exports = {

    dependencies: [{
        files: ['./public/lib/jquery/dist/jquery.min.js',
            './public/lib/bootstrap/dist/js/bootstrap.min.js',
            './public/lib/angular/angular.min.js',
            './public/lib/angular-animate/angular-animate.min.js',
            './public/lib/angular-bootstrap/ui-bootstrap.min.js',
            './public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './public/lib/angular-mocks/angular-mocks.js',
            './public/lib/angular-resource/angular-resource.min.js',
            './public/lib/angular-ui-router/release/angular-ui-router.min.js',
            './public/lib/angular-ui-utils/ui-utils.min.js',
            './public/lib/dotjem-angular-tree/dotjem-angular-tree.js',
            './public/lib/highlightjs/highlight.pack.js',
            './public/lib/angular-highlightjs/angular-highlightjs.min.js',
            './public/lib/lodash/lodash.min.js',
            './public/lib/postal/lib/postal.min.js']
    }],

    src: [
        {files: ['./public/config.js', './public/application.js']},
        {file: './public/dev/module.js'},
        {dir: './public/dev/*/*.js'},
        {dir: './public/modules/*/*.js'},
        {dir: './public/modules/*/*/*.js'}
    ],

    tests: [
        {dir: './public/dev/tests/*.js'}
    ]
}