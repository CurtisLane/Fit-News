const path = require('path')


module.exports = function(){
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, '../app/public/HTML/index.html'))
    });
}