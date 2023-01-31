import Modal from "../../js/activarModales.js";
import CarroDeCompras from "../../js/carro-compras.js";
import login from "../../js/formLogin.js";
import navUsuario from "../../js/nav-usuario.js";
import { itemsStockGeneral, itemsStockNuevo } from "../../js/vistaPrincipal.js";

const d = document;
window.addEventListener("storage", e=>{
    if (typeof e.newValue == 'object'){
        console.log(e)
    }
})
let carroDecompras = new CarroDeCompras;

d.addEventListener("DOMContentLoaded", e=>{
    e.preventDefault()
    let modal = new Modal;   
    carroDecompras.stockToLS();
    itemsStockNuevo();
    itemsStockGeneral();
    modal.modalCarroCompras();
    modal.modalInicioSesion();

    carroDecompras.actualizarCarroDeCompras();
    carroDecompras.botonAñadir();
    carroDecompras.numberObjectLS();
    // modal.abrirPaginaPorItem()
    document.addEventListener("click", (e)=>{
        // e.preventDefault()
        // console.log(e)
        carroDecompras.botonEliminar(e);
        navUsuario(e)
    })

    document.addEventListener("change", e=>{
        console.log(e)
        carroDecompras.actualizarCantidadCarroDeCompras(e)
        
    });

    login()  

});

