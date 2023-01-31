import Productos from "./Productos.js";

const d = document;

const productos = new Productos()

const $main = d.getElementsByClassName('main')[0]
export default function formCompra(){
    const $confirmarCompra = d.getElementById('confirmar-compra')
    let items = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'));
    items = Object.values(items)
    console.log(items)
    $confirmarCompra.addEventListener('submit', e=>{ 
        (async ()=>{
            e.preventDefault()
            try {
                const body = items.map(el=>{
                    return {id:el.id, cantidad:el.cantidad, total:+el.cantidad* +el.valor}
                })
                const tkn = localStorage.getItem('tkn')
                console.log('Bearer '+tkn.replace(/['"]+/g, ''))
                const options = {
                    method:"POST",
                    headers: new Headers({
                        'Authorization': `Bearer ${tkn.replace(/['"]+/g, '')}`, 
                        'Accept': "application/json",
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify(body)
                }
                const res = await fetch('http://localhost:3000/carrito', options),
                data = await res.json()
                localStorage.removeItem('itemsListCarroDeCompras')
                $main.innerHTML = `<h2>Compra realizada!</h2>`
                productos.stockToLS()
            } catch (error) {
                d.getElementById("inicio-sesion-modal").classList.toggle('active')
                console.log("Error:--", error)
            }

        })()
    })
}