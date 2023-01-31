import CarroDeCompras from "./carro-compras.js";

const d = document;
let carroDeComprasP = new CarroDeCompras

export function paginaPorItem(){
    // Traer datos desde LS
    const $main = document.getElementsByClassName("main")
    console.log($main)
    const itemsListLS= JSON.parse(localStorage.getItem('itemsListStock'))
    const itemPageReturnLS = JSON.parse(localStorage.getItem('idItemClickOnHome'))
    // console.log(itemPageReturnLS)
    // console.log(itemsListLS)
    const itemsListArrayObject = Object.values(itemsListLS)
    // console.log(itemsListArrayObject)

    // se retorna el id del item y se le resta 1 para que la primera posicion sea [0]
    let posicionProducto = itemPageReturnLS.at(-1) - 1
    
    // Enlace de página
    history.pushState(null, "", `?item=${posicionProducto}`);

    // Contenido de página
    let div = document.createElement('div');
    div.className = 'producto'
    div.innerHTML = `
    <img src="../.${itemsListArrayObject[posicionProducto].img}">
    <div class="descripcion">
        <h3 id=${itemsListArrayObject[posicionProducto].id}>${itemsListArrayObject[posicionProducto].nombre}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis officia expedita dignissimos excepturi assumenda rem facilis.</p>
        <div class="alig-precio-opcion">
            <p id="precio">$${itemsListArrayObject[posicionProducto].precio}</p>
            <div class="opciones">
                <label for="cantidad">Cantidad</label>
                <input type="number" name="cantidad" id="cantidad" placeholder="1" min=1 max=${itemsListArrayObject[posicionProducto].stock} value=1>
                <button class="agregarAlCarro">Añadir al carro</button>
            </div>
        </div>
    </div>
    `
    $main[0].appendChild(div)    
}

export function agregarItemACarro(e){
    if (e.target.innerText == 'Añadir al carro'){
        e.preventDefault()
        let { i, carroDeCompras } = carroDeComprasP.obtenerCarroDeComprasLS()
        let arrayCarroDeCompras = Object.values(carroDeCompras)
        let cantidad = +e.target.previousElementSibling.value
        let item = arrayCarroDeCompras.filter(item => item.nombre == e.target.parentNode.parentNode.parentNode.firstElementChild.outerText)
        if (item.length != 0){
            cantidad += +item[0].cantidad
        }
        // console.log(e.target.parentNode.parentNode.parentNode.firstElementChild.id)
        // console.log(e.target.parentNode.parentNode.parentNode.firstElementChild.outerText)
        // console.log(e.target.parentNode.parentNode.firstElementChild.outerText.split('$')[1])
        carroDeCompras[i] = {
            "id": e.target.parentNode.parentNode.parentNode.firstElementChild.id,
            "nombre": e.target.parentNode.parentNode.parentNode.firstElementChild.outerText,
            "valor": e.target.parentNode.parentNode.firstElementChild.outerText.split('$')[1],
            "cantidad": Number(cantidad),
            "stock":+e.target.previousElementSibling.max
        }
        console.log(carroDeCompras[i])
        i++
        console.log(carroDeCompras)
        localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(carroDeCompras))
        carroDeComprasP.actualizarCarroDeCompras()
    }
}