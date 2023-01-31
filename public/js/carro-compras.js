import Productos from "./Productos.js";

const d = document;

export default class CarroDeCompras extends Productos{
    constructor(){
        super()
        console.log(this.items)
    }

    actualizarCarroDeCompras(){
        const $table = d.getElementById("table-carro");
        const $total = d.getElementById("total");
    
        // Obtener carroDeCompras desde LocalStorage
        //------------------------------------------
    
        let newArrayCarroDeCompras = this.NuevoArraySinItemsRepetidos()
    
        //--- BUSCAR TABLA Y AÑADIR ELEMENTO---------
        
        $table.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Sub-total</th>
            <th></th>
        </tr>
        `
        let href = './productos/producto'
        if (location.pathname.match('productos')) href = '../productos/producto'

        let fragment = d.createDocumentFragment()
        let totalAPagar = 0
        if (newArrayCarroDeCompras.length != 0){
            for (let i=0; i < newArrayCarroDeCompras.length; i++){
                let tr = d.createElement("tr")
                tr.innerHTML = `
                <td class="item"><a href='${href}'>${newArrayCarroDeCompras[i].nombre}</a></td>
                <td class="valor">$${newArrayCarroDeCompras[i].valor}</td>
                <td class="btn-eliminar cantidad" ><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/></svg><input type="number" value="${+newArrayCarroDeCompras[i].cantidad}" max="${+newArrayCarroDeCompras[i].stock}" class="inputCantidad" min=0></td>   
                <td class="subtotal">$${+newArrayCarroDeCompras[i].cantidad*+newArrayCarroDeCompras[i].valor}</td>
                <td class="btn-eliminar"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"/></svg></td>
                `
                fragment.appendChild(tr);
    
                totalAPagar += +newArrayCarroDeCompras[i].cantidad*+newArrayCarroDeCompras[i].valor
            }  
    
            $table.appendChild(fragment)
    
        } else {
            console.log("ARRAY VACIO CARRO COMPRAS")
        }
        if ($total != null){
            $total.innerText = totalAPagar
        }
    
        
    }


    actualizarCantidadCarroDeCompras(e){
        if (e.target.className == 'inputCantidad'){
            e.preventDefault()
            console.log(e.target.value)
            let getCarroDeComprasLS = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'))
            let arrayCarroDeComprasLS = Object.values(getCarroDeComprasLS)
            let itemName = e.target.parentElement.parentElement.firstElementChild.innerText
            // console.log(location)
            // if (location.pathname.match('/productos/producto')){
            //     itemName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText
            // }
            let index = arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName )
            arrayCarroDeComprasLS[index].cantidad = +e.target.value
            // console.log("NUEVO VALOR INPUT A LS: ", arrayCarroDeComprasLS[index])
            // console.log(arrayCarroDeComprasLS)
            localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
    
            this.actualizarCarroDeCompras()
        }  
        if (e.target.className == 'agregarAlCarro'){
            e.preventDefault()
            console.log(e.target.previousElementSibling.value)
            let getCarroDeComprasLS = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'))
            if (getCarroDeComprasLS != undefined){
                let arrayCarroDeComprasLS = Object.values(getCarroDeComprasLS)
                let itemName = e.target.parentElement.parentElement.firstElementChild.innerText
                // console.log(location)
                if (location.pathname.match('/productos/producto')){
                    itemName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText
                }
                let index = arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName )
                if (index != -1){
                    arrayCarroDeComprasLS[index].cantidad += +e.target.previousElementSibling.value - 1
                    // console.log("NUEVO VALOR INPUT A LS: ", arrayCarroDeComprasLS[index])
                    // console.log(arrayCarroDeComprasLS)
                    localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
            
                    this.actualizarCarroDeCompras()
                }
            } else {
                let { i, carroDeCompras } = this.obtenerCarroDeComprasLS()
                carroDeCompras[i] = {
                    "id": e.target.parentNode.parentNode.parentNode.children[0].id,
                    "nombre": e.target.parentNode.parentNode.parentNode.children[0].outerText,
                    "valor": e.target.parentNode.previousElementSibling.outerText.split('$')[1],
                    "cantidad": +e.target.previousElementSibling.value - 1,
                    "stock":e.target.previousElementSibling.dataset.stock
                }

                i++
                console.log(carroDeCompras)
                localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(carroDeCompras))
                this.actualizarCarroDeCompras();
            }
            
            
        }  
    }

    // OBTENER EL ATRIBUTO PRODUCNUMBER DE CADA ITEM AL HACER CLICK SOBRE ÉL Y GUARDAR EN LS
    numberObjectLS(){
        let getCarroDeComprasLS = JSON.parse(localStorage.getItem('itemsListStock'))
        if (!getCarroDeComprasLS) return;
        let arrayCarroDeComprasLS = Object.values(getCarroDeComprasLS)
        // console.log(arrayCarroDeComprasLS)
        let arrayProductNumber = []
        let idItemLS = arrayProductNumber.push(JSON.parse(localStorage.getItem('idItemClickOnHome')))
        // console.log(arrayProductNumber, 'prod')
        if (idItemLS == null){
            arrayProductNumber = []
        }
        arrayProductNumber.push(idItemLS)
        
        
        document.addEventListener('click', e=>{
            
            if (e.target.parentElement.className == 'item'){
                // console.log(arrayProductNumber.push(indexx[0].id.split('00')[1]))
                let indexx = arrayCarroDeComprasLS.filter(el=> el.nombre == e.target.textContent)
                arrayProductNumber.push(+indexx[0].id.split('00')[1])
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
            if (e.target.parentElement.className == 'card'){
                console.log(e)
                arrayProductNumber.push(e.target.parentElement.getAttribute('productnumber'))
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
        
            if (e.target.className == 'card'){
                arrayProductNumber.push(e.target.getAttribute('productnumber'))
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
        })    
        document.addEventListener('auxclick', e=>{
            if (e.target.parentElement.className == 'item'){
                // console.log(arrayProductNumber.push(indexx[0].id.split('00')[1]))
                let indexx = arrayCarroDeComprasLS.filter(el=> el.nombre == e.target.textContent)
                arrayProductNumber.push(+indexx[0].id.split('00')[1])
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
            if (e.target.parentElement.className == 'card'){
                console.log(e)
                arrayProductNumber.push(e.target.parentElement.getAttribute('productnumber'))
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
        
            if (e.target.className == 'card'){
                arrayProductNumber.push(e.target.getAttribute('productnumber'))
                localStorage.setItem('idItemClickOnHome', JSON.stringify(arrayProductNumber))
            }
        })  
    }



    botonEliminar(e){
        if (localStorage.getItem('itemsListCarroDeCompras') != undefined){
            let getCarroDeComprasLS = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'))
            let arrayCarroDeComprasLS = Object.values(getCarroDeComprasLS)
            // console.log(e)
            if (e.target.nodeName == "svg" && e.target.parentElement.classList[0] == "btn-eliminar"){
                let itemName = e.target.parentElement.parentElement.firstElementChild.innerText
                // console.log('itemName: '+itemName)
                // console.log('findIndex: '+arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName))
                let index = arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName )
                // console.log('index: '+index)
                arrayCarroDeComprasLS.splice(index, 1)
                // console.log(JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
                localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
        
                this.actualizarCarroDeCompras()
                e.stopImmediatePropagation();
        
            }   
            else if (e.target.nodeName == "path" && e.target.parentElement.parentElement.classList[0] == "btn-eliminar"){
                let itemName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText
                // console.log('itemName: '+itemName)
                // console.log('findIndex: '+arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName ))
                let index = arrayCarroDeComprasLS.findIndex(el => el.nombre == itemName )
                // console.log('index: '+index)
                arrayCarroDeComprasLS.splice(index, 1)
                // console.log(JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
                localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(Object.assign({}, arrayCarroDeComprasLS)))
        
                this.actualizarCarroDeCompras()
                e.stopImmediatePropagation();
            }
        }        
    }


    NuevoArraySinItemsRepetidos(){
        let newArrayCarroDeCompras = []
    
        if (localStorage.getItem('itemsListCarroDeCompras') != undefined){
            let getCarroDeComprasLS = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'))
            // console.log(getCarroDeComprasLS)
            let arrayCarroDeComprasLS = Object.values(getCarroDeComprasLS)
        
            if (arrayCarroDeComprasLS.length != 0){
                let nombreItems = []
                let itemsUnicos = []
                for (let i=0; i < arrayCarroDeComprasLS.length; i++){
                    // console.log(arrayCarroDeComprasLS[i].nombre)
                    nombreItems.push(arrayCarroDeComprasLS[i].nombre)
                }
        
                nombreItems = new Set(nombreItems)
                itemsUnicos = [...nombreItems]
                // console.log(itemsUnicos)
        
                for (const i in itemsUnicos) {
                    // console.log(arrayCarroDeComprasLS.findIndex(el => el.nombre == itemsUnicos[i]))
                    // console.log(arrayCarroDeComprasLS.filter(el => el.nombre == itemsUnicos[i]).length)
                    newArrayCarroDeCompras.push(arrayCarroDeComprasLS.filter(el => el.nombre == itemsUnicos[i])[0])
                    newArrayCarroDeCompras[i].cantidad += arrayCarroDeComprasLS.filter(el => el.nombre == itemsUnicos[i]).length - 1
        
                    // console.log("NEWARRAYYY: ", newArrayCarroDeCompras)
        
                    if (newArrayCarroDeCompras[i].cantidad <= 0){
                        newArrayCarroDeCompras[i].cantidad = 0
                    }
                }
                localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(Object.assign({}, newArrayCarroDeCompras)))
                // console.log("Items Repetidos: " + itemsRepetidos) 
                // console.log("NombreItems: " + nombreItems)   
                // console.log("Items Unicos: " + itemsUnicos)     
            
            } else {
                console.log("ARRAY VACIO CARRO COMPRAS")
            }
            // console.log("newArrayCarroDeCompras:  ",newArrayCarroDeCompras)
            return newArrayCarroDeCompras
        } else {
            return newArrayCarroDeCompras
        }
    }

    obtenerCarroDeComprasLS(i = 0, carroDeCompras = {}){
        if (localStorage.getItem('itemsListCarroDeCompras') != undefined){
            carroDeCompras = JSON.parse(localStorage.getItem('itemsListCarroDeCompras'))
            // console.log(Object.values(carroDeCompras).length)
            i = Number(Object.values(carroDeCompras).length)
            // console.log(i)
        }
        return {i, carroDeCompras }
    }


    botonAñadir(){
        // Obtener el boton de añadir
        const $addCircleSVG = d.getElementsByTagName('svg')
        // const $sumaUno = d.querySelector('.sumarUno')
        const topTransalate = [
            { opacity:1, transform: 'translateY(0)' },
            { opacity:1, transform: 'translateY(-1.75rem)' },
            { opacity:0, transform: 'translateY(-2rem)' },
            { opacity:0, transform: 'translateY(-2.5rem)' }
        ];
          
        const translateTiming = {
            duration: 1000,
            iterations: 1,

        }
        // for (let item of $svgHTML)
        
        
        for (let e of $addCircleSVG){
            // console.log(e)
            if (e.parentNode.className == "card"){
                e.addEventListener("click", el=>{
                    el.preventDefault()
                    let { i, carroDeCompras } = this.obtenerCarroDeComprasLS()
                    
                    // console.log(el.target.parentNode.parentNode.outerHTML)
                    if (el.target.nodeName == "use"){
                        el.target.parentNode.parentNode.children[3].animate(topTransalate, translateTiming)
                        carroDeCompras[i] = {
                            "id": el.target.parentNode.parentNode.id,
                            "nombre": el.target.parentNode.previousElementSibling.outerText.split('\n')[0],
                            "valor": el.target.parentNode.previousElementSibling.outerText.split('$')[1],
                            "cantidad": 1,
                            "stock":el.target.parentNode.previousElementSibling.dataset.stock
                        }
                    }
                    if (el.target.nodeName == "svg"){
                        el.target.parentNode.children[3].animate(topTransalate, translateTiming)
                        carroDeCompras[i] = {
                            "id": el.target.parentNode.id,
                            "nombre": el.target.previousElementSibling.outerText.split('\n')[0],
                            "valor": el.target.previousElementSibling.outerText.split('$')[1],
                            "cantidad": 1,
                            "stock":el.target.previousElementSibling.dataset.stock
                        }
                    }
                    i++
                    console.log(carroDeCompras)
                    localStorage.setItem('itemsListCarroDeCompras', JSON.stringify(carroDeCompras))
                    this.actualizarCarroDeCompras();
                })
            }
        }
    }
}