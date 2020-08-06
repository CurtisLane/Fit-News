const path = require('path')


module.exports = function(app){
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/html/index.html'))
    });
    app.get('/js/app.js', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/js/app.js'))
    });
    app.get('/images/favicon.ico', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/images/favicon.ico'))
    });
}