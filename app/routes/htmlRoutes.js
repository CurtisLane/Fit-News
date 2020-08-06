const path = require('path')

module.exports = function(app){

    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/html/index.html'))
    });
    app.get('/js/app.js', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/js/app.js'))
    });
    app.get('/images/:image', function(req,res){
        let image = req.params.image
        res.sendFile(path.join(__dirname, "../public/images/" + image))
    })
}