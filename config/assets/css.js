module.exports = {
    dependencies: [
        {file: './public/lib/bootstrap/dist/css/bootstrap.css'},
        {file: './public/lib/highlightjs/styles/github.css'},

    ],

    src : [
        {dir: './public/css/*.css'}
    ],

    generated_src : [
        {dir: './public/generated_css/*.css'}
    ]
}