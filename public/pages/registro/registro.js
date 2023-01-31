import Modal from "../../js/activarModales.js";
import CarroDeCompras from "../../js/carro-compras.js";
import login from "../../js/formLogin.js";
import { formRegistroYValidación } from "../../js/formRegistro.js";
const d=document;
d.addEventListener('DOMContentLoaded', ()=>{
    formRegistroYValidación()
    const modal = new Modal
    const carroDecompras = new CarroDeCompras

    modal.modalCarroCompras()
    modal.modalInicioSesion()

    carroDecompras.numberObjectLS()
    carroDecompras.actualizarCarroDeCompras();

    document.addEventListener("click", (e)=>{
        carroDecompras.botonEliminar(e);
    })

    document.addEventListener("change", e=>{
        carroDecompras.actualizarCantidadCarroDeCompras(e)
    })
    login()
})
