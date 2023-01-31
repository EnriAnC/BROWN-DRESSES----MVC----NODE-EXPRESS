const fs = require('fs'),
jwt = require('jsonwebtoken')

const controllers = {}

controllers.viewRegistro = (req,res)=>{
    res.render('registro.hbs')
}

controllers.register = (req,res)=>{
    let body = req.body
    fs.readFile('./APIservices/users/usuarios.json', {encoding:'utf-8'}, (err,data)=>{
        data = JSON.parse(data)
        index = data.findIndex(el=>el.usuario == body.usuario)
        console.log(index)
        body = {id:data.length, ...body}
        console.log("newbody: ", body)
        data[data.length] = {...body}
        if(index<0){
            fs.writeFile("./APIservices/users/usuarios.json", JSON.stringify(data), (err)=>{
                if (err) res.status(404).send('Error al ingresar usuario')
            })
            res.json({usuario:body.usuario, msg:"Se ha registrado correctamente"})
        } else {
            res.json({msg: 'El usuario ya existe'})
        }
        
    })   
}

controllers.login = (req,res)=>{
    let body = req.body
    console.log(body)
    fs.readFile('./APIservices/users/usuarios.json', {encoding:'utf-8'}, (err,data)=>{
        if (err) res.status(404).send({codigo:"002", msg:"El usuario o la contraseña no coinciden"})
        data = JSON.parse(data)
        u = data.filter(el=>el.usuario == body.usuario)
        console.log(u)
        if (u.length > 0){
            p = u.findIndex(el=>el.password == body.password)
            if(p != -1){
                jwt.sign({id:u[0].id}, 'secretkey', (err, token)=>{
                    fs.readFile('./APIservices/users/tokens.json', {encoding:'utf-8'}, (err,data)=>{
                        data = JSON.parse(data)
                        // tokenFragment = token.split('.')[2].slice(15)

                        data.push(token)
                        fs.writeFileSync('./APIservices/users/tokens.json', JSON.stringify(data))
                    })
                    res.json({
                        token
                    })
                })
            }
        } else {
            res.status(404).send({codigo:"002", msg:"El usuario o la contraseña no coinciden"})
        }
    })

}

// Authorization: Bearer <token>
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