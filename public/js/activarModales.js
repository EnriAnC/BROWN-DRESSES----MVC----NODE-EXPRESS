import CarroDeCompras from "./carro-compras.js";

export default class Modal{
    constructor(){
        this.carroDeCompras = new CarroDeCompras
    }

    async modalCarroCompras(){
        await this.htmlCarroCompras();
        await this.abrirModalCarro();
    }

    htmlCarroCompras(){
        let href = '/carro-compras'
        if (location.pathname.match('productos')){
            href = `../carro-compras`
        }
        const div = document.createElement('div');
        div.className = 'ventana-modal';
        div.id = 'ventana-modal';
        div.innerHTML = `
        <div class="carro-modal">
            <div class="overflow-modal">
                <button class="closeModal"><b>-</b></button>
                <h2 style="font-size: 1.5rem; margin-bottom: 1rem; text-align: center; color: var(--color1);">Carro de compras</h2>
                <table>
                    <tbody id="table-carro">
                       <!-- SCRIPT ACTUALIZAR CARRO DE COMPRAS -->
                    </tbody>
                </table>
                <div class="totalDiv" style="display: flex; justify-content: end; margin-top: 1rem;">
                    <p style="font-size: 1.5rem; margin-right: .5rem;">Total:</p>usd<span style="font-size: 1.5rem;" id="total"></span>
                    <a href="${href}"><button class="irAPagar">Detalles e ir a pagar</button></a>
                </div>
            </div>
        </div>`
        const estilos = document.styleSheets[0];
        // console.log(estilos)
        const cssCarroCompras = `
                .closeModal{
            font-family: Arial;
            font-size: 2rem;
            border-style:groove;
            background-color: rgb(230, 68, 68);
            color: rgb(22, 19, 19);
            position: absolute;
            right: 1vh;
            top: 1vh;
            height: 6px;
            width: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
        }/
        
        .closeModal b{
            position: relative;
            top: -.05rem;
        }/
        .ventana-modal{
            display: flex;
            width: 40%;
            height: 40%;
            max-height: 340px;
            position: fixed;
            margin: 0 auto;
            bottom: 0;
            left: -60vw;
            right: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.315);
            justify-content: center;
            transform: translate(0,50vw);
            transition: all 0.5s;
            border-radius: 10px;
        }/
        
        .active{
            transform: translate(0,0);
        }/
        .carro-modal{
            border: #c7502b;
            display: flex;
            padding-left: .5rem;
            height: 100%;
            min-width: 40vw;
            justify-content: center;
            align-items: flex-start;
            justify-self: center;
            padding-top: 1rem;
            background-color: var(--black-smooth);
            border-radius: 10px;
            border: solid 2.5px rgb(22, 21, 21)
        }/
        .carro-modal .overflow-modal{
            height: 90%;
            overflow-y: scroll;
        }/
        
        .overflow-modal h2{
            letter-spacing: .1rem;
        }/
        .overflow-modal::-webkit-scrollbar{
            background-color: var(--black-smooth);
        }/
        .carro-modal div table{
            min-width: 35vw;
            padding: 0 0;
            border-radius: 4px 4px 0 0;
            max-width: 100vw;
            max-height: 50%;
            background-color: rgb(253, 227, 153);
            text-align: center;
            border-collapse: collapse;
            font-family: Arial, Helvetica, sans-serif;
        }/
        @media (max-width: 1020px) {
            .ventana-modal{
                max-height: 100vh;
                left: 60vw;
                top: calc(30vh + 20%);
                height: 40%;
                transform: translate(0,100vh);
                
            }
            .carro-modal{
                padding-left: .5rem;
            }
            .active{
                transform: translate(0,0);
        
            }
        }/
        @media (max-width:670px) {
            .ventana-modal{
                width: 60vw;
                left: 40vw;
            }
        }/
        @media (max-width:520px) {
            .ventana-modal{
                top: calc(30vh + 10%);
                width: 100%;
                height: 50%;
                left:0; 
            }
            .carro-modal{
                width: 100%;
                padding-left: 1rem;
            }
            .carro-modal div table{
                min-width: 90vw;
            }
        }/
        .carro-modal table .cantidad{
            display: flex; 
            justify-content: center;
            align-items: center;
        }/
        
        .carro-modal table .cantidad svg{
            margin-right: .25rem;
            background-color: rgb(245, 116, 116);
            border-radius: 50%;
            display: none;
        }/
        
        
        .carro-modal table tr input{
            width: 2rem;
            text-align: center;
            font-size: 1rem;
        }/
        
        
        .carro-modal table tr, .main table td, .main table th{
            vertical-align: center;
            padding: .5rem .45rem;
        }/
        .carro-modal table tr,th,td{
            vertical-align: center;
        }/
        @media (max-width: 300px) {
            .main table tr, .main table td, .main table th{
                padding: .40rem .1rem;
            }
        }/
        .carro-modal div .irAPagar{
            margin-left: 1rem;
            padding: .5 1rem;
            border-radius: 5px;
            height: 90%;
            font-size: 1.25rem;
            background-color: black;
            color: var(--color1);
            border-bottom: solid 3.5px rgb(65, 63, 45);
            border-right: solid 3.5px rgb(65, 63, 45);
            border-top: solid 3.5px rgb(109, 104, 64);
            border-left: solid 3.5px rgb(109, 104, 64);
        }/
        .carro-modal div .irAPagar:hover{
            background-color: var(--color1);
            color: black;
        }/
        .carro-modal div .irAPagar:active{
            background-color: black;
            color: var(--color1);
            border-bottom: solid 3.5px rgb(82, 77, 77);
            border-right: solid 3.5px rgb(82, 77, 77);
            border-top: solid 3.5px rgb(37, 35, 35);
            border-left: solid 3.5px rgb(37, 35, 35);
        }/
        
        .carro-modal .btn-eliminar svg{
            display: block;
            margin-right: .25rem;
            background-color: rgb(245, 116, 116);
            border-radius: 50%;
        }/
        .carro-modal .btn-eliminar svg:hover{
            background-color: rgb(211, 35, 35);
        }/
        
        .totalDiv{
            color: var(--color1);
        }/
        
        @media (max-width:500px) {
            .carro-modal .btn-eliminar{
                display: none;
            }
            .carro-modal table .cantidad svg{
                display: block;
            }
            .carro-modal .cantidad{
                flex-direction: column;
            }
            .carro-modal table .cantidad{
                margin-bottom: 0;
            }
            .carro-modal table .cantidad svg{
                margin-right: 0;
                margin-bottom: .25rem;
            }
        }/
        .item a{
            cursor: pointer;
            text-decoration: none;
            color: #000;
        }
        `
        
        const arrayCssCarroCompras = cssCarroCompras.split('}/')
        // console.log(arrayCssCarroCompras)
        arrayCssCarroCompras.forEach(rule => {
            // console.log(rule)
            estilos.insertRule(rule, estilos.cssRules.length)
            // console.log(estilos.cssRules.length)
            if (estilos.cssRules[estilos.cssRules.length] == 'CSSMediaRule'){
                rule.forEach(el=>{
                    rule.insertRule(el, rule.cssRules.length)
                })
            }
        })
        document.body.append(div)

        return div
    }

    abrirPaginaPorItem(){
        const $item = document.getElementsByClassName('item')
        Object.values($item).forEach(el=>{
            console.log(el)
        })
    }

    abrirModalCarro(){
        const $cartIcon = document.getElementById("cartIcon");
        const $ventanaModal = document.getElementById("ventana-modal");
        const $closeModal = document.getElementsByClassName('closeModal');
        // console.log($ventanaModal)
        if ($ventanaModal != null){
            $cartIcon.addEventListener("click", e=>{
                e.preventDefault()
                this.carroDeCompras.actualizarCarroDeCompras()
                $ventanaModal.classList.toggle("active")
            })
            $closeModal[0].addEventListener("click", e=>{
                e.preventDefault()
                $ventanaModal.classList.remove("active")
            })
        } else {
            console.log("Estás en el carro de compras")
        }
    }

    async modalInicioSesion(){
        await this.htmlInicioSesion();
        await this.abrirModalInicioSesion();
    }

    htmlInicioSesion(){
        // console.log(location.pathname.match('pages'))
        let href = '/registro'
        if (location.pathname.match('productos')){
            href = `../registro`
        }
        const tkn = localStorage.getItem('tkn')
        const div = document.createElement('div');
        div.className = 'inicio-sesion-modal';
        div.id = 'inicio-sesion-modal';
        
        if(tkn){
            div.append(htmlMenuUsuario())
            const estilos = document.styleSheets[0];
        // console.log(estilos)
            const cssInicioSesion = `
                .inicio-sesion-modal{
                    display: none;
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background-color: var(--color2) !important;
                    justify-content: center;
                    
                }/
                .nav-modal{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                }/
                .opciones-usuario{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                }/
                .opciones-usuario a{
                    text-decoration: none;
                    color: var(--color1);
                    margin: 1rem 0;
                }/
                .opciones-usuario p{
                    color: var(--color1);
                    margin: 1rem 0;
                    height: 2rem;
                }`
                
        
        const arrayCssInicioSesion = cssInicioSesion.split('/\n')
        // console.log(arrayCssInicioSesion)
        arrayCssInicioSesion.forEach(rule => {
            estilos.insertRule(rule, estilos.cssRules.length)
        })
        } else {
            div.innerHTML = `
            <div class="inicio-sesion-ventana">
                <!-- <div class="inicio-sesion-posicion"> -->
                    <h2>Inicio de sesión</h2>
                    <form class="inicio-sesion-form" id="login-form">
                        <label for="usuario">Nombre de usuario</label>
                        <input type="text" id='usuario' name="usuario" placeholder="usuario1">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" name="password" value="user123">
                        <input type="submit" value="Iniciar sesion" name="btnlogin" id="botonInicioSesion">
                        <p id="msg-login"></p>
                        <p id="registrate-aqui"><a href="${href}">¿No tienes cuenta? Registrate aqui.</a></p>
                    </form>
                <!-- </div> -->
            </div>`
        }


        const estilos = document.styleSheets[0];
        // console.log(estilos)
        const cssInicioSesion = `
        .inicio-sesion-modal{
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.315);
            justify-content: center;
            
        }/
        .active{
            display: flex;
            animation: opacidadActiva .25s linear forwards;
        }/
        @keyframes opacidadActiva {
            0%{
                transform: opacity(0);
            }
            100%{
                transform: opacity(1);
            }
        }/
        .inicio-sesion-ventana{
            background-color: wheat;
            position: absolute;
            margin: auto auto;
            height: auto;
            min-width: 40%;
            transform: translate(0,50%);
            padding: 2rem;
        }/
        .inicio-sesion-ventana h2{
            text-align: center;
            margin-bottom: 1rem;
        }/
        .inicio-sesion-form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }/
        .inicio-sesion-form input{
            margin-bottom: 1rem;
            font-size: .9rem;
        }/
        
        .inicio-sesion-form #botonInicioSesion{
            background-color: black;
            color: wheat;
            font-size: 1.1rem;
            border-radius: 1rem;
            padding: 0 .5rem;
            margin-bottom:1.20rem;
            
        }/
        #registrate-aqui{
            font-family: Arial, Helvetica, sans-serif;
            text-align:center;
        }/
        #msg-login{
            font-family: Arial, Helvetica, sans-serif;
            color: #6a665a;
            text-align:center;
            margin: .25rem 0;
        }`
        
        const arrayCssInicioSesion = cssInicioSesion.split('/\n')
        // console.log(arrayCssInicioSesion)
        arrayCssInicioSesion.forEach(rule => {
            estilos.insertRule(rule, estilos.cssRules.length)
        })
        document.body.append(div)
        return div
    }

    abrirModalInicioSesion(){
        const $cartIcon = document.getElementById("userIcon");
        const $ventanaModal = document.getElementById("inicio-sesion-modal");
        // console.log($ventanaModal)
        
        if ($ventanaModal != null){
            $cartIcon.addEventListener("click", e=>{
                e.preventDefault()
                $ventanaModal.classList.toggle("active")
            })
        } else {
            console.log("Estás en el carro de compras")
        }
    }
}

function htmlMenuUsuario(){
    const $navUsuario = document.getElementById('nav-usuario').content;
    const $clone = document.importNode($navUsuario, true)
    return $clone
}