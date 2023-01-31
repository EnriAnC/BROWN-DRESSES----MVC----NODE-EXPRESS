const fs = require('fs'),
jwt = require('jsonwebtoken')

const controllers = {}

controllers.viewCarroCompras = (req,res)=>{
    res.render('carro-compras')
} 
controllers.getCarro = (req,res)=>{
    fs.readFile('./APIservices/carro-compras/carro.json', {encoding:'utf-8'}, (err,data)=>{
        data = JSON.parse(data)
        res.json(data)
    })
}
controllers.postCarro = (req,res)=>{
    let body = req.body
    // console.log(body)
    fs.readFile('./APIservices/carro-compras/carro.json', {encoding:'utf-8'}, (err,data)=>{
        if (err) throw err
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.sendStatus(403)
            } else {
                data = JSON.parse(data)
                // console.log(data.length)
                const newData = {}
                newData.id = authData.id
                newData.items = []
                let total = 0
                body.map((el)=>{
                    newData.items.push( {
                        id:el.id,
                        cantidad:el.cantidad,
                        total:el.total
                    })
                    total += el.total
                })
                newData.total = total
                data[Object.values(data).length] = newData
                fs.writeFileSync('./APIservices/carro-compras/carro.json', JSON.stringify(data))
                actualizarStock(body)
                res.json(newData)
            }
        })

    })
}

async function actualizarStock(body){
    fs.readFile('./APIservices/productos/items.json', {encoding:'utf-8'}, (err, data)=>{
        data = JSON.parse(data)
        // console.log(Object.entries(data))
        body.map(a=>{
            Object.entries(data).forEach((itemData, index)=>{
                console.log("itemData:",itemData, "index:",index)
                if (itemData[1].id == a.id){
                    data[itemData[0]].stock = data[itemData[0]].stock - a.cantidad
                }
            })
        })
        // console.log(data)
        fs.writeFile('./APIservices/productos/items.json', JSON.stringify(data), err=>{
            console.log(err)
        })
    })
}

controllers.verifyToken = (req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}
module.exports = controllers