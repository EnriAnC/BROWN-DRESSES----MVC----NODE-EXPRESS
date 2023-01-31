import Modal from "../../js/activarModales.js";
import CarroDeCompras from "../../js/carro-compras.js";
import formCompra from "../../js/formCompra.js";
import login from "../../js/formLogin.js";

const d = document;

d.addEventListener('DOMContentLoaded',e=>{
    const carroDeCompras = new CarroDeCompras;
    const modal = new Modal;
    modal.modalInicioSesion();
    // modal.modalCarroCompras()
    carroDeCompras.numberObjectLS()

    carroDeCompras.actualizarCarroDeCompras();
    d.addEventListener('change', e=>{
        carroDeCompras.actualizarCantidadCarroDeCompras(e)
    })
    d.addEventListener('click',e=>{
        carroDeCompras.botonEliminar(e)
    })
    formCompra()
    login()
    
})