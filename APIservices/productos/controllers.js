const fs = require('fs')
const controllers = {}

controllers.viewProducto = (req,res)=>{
    res.render('productos')
} 

controllers.getProducts = (req,res)=>{
    fs.readFile('./APIservices/productos/items.json', {encoding:'utf-8'}, (err,data)=>{
        data = JSON.parse(data)
        res.json(data)
    })
}


module.exports = controllers