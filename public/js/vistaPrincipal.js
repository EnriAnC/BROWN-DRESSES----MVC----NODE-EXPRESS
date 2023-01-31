const d = document;

export function itemsStockNuevo(){

    const $carruselInventario = d.getElementsByClassName("carrusel-inventario")
    // console.log($carruselInventario)
    if ($carruselInventario.length != 0){
        const itemsList= JSON.parse(localStorage.getItem('itemsListStock'))
        console.log(itemsList)
        if (!itemsList) return
        else {
            const arrayItemsList = Object.values(itemsList),
            $itemTemplate = d.getElementById('item-template').content;
    
            let fragment = d.createDocumentFragment(),
                divRow1 = d.createElement('div'),
                divRow2 = d.createElement('div');
            divRow1.className = 'itemsNuevos';
            divRow2.className = 'itemsNuevos';
    
            arrayItemsList.forEach((item, index)=>{
                // console.log(item, index)
                if(index < 4){
                    let $a = $itemTemplate.children[0]
                    $a.id = item.id;
                    $a.setAttribute('productnumber', (+index + 1)) ;
                    $itemTemplate.getElementById('item-img').src = item.img;
                    $itemTemplate.getElementById('item-detalles').innerHTML = `${item.nombre}<br>$${item.precio}`;
                    $itemTemplate.getElementById('item-detalles').setAttribute('data-stock', item.stock);
                    divRow1.append(d.importNode($itemTemplate, true));
                }
            })
            divRow1.innerHTML += divRow1.innerHTML + divRow1.innerHTML
            fragment.appendChild(divRow1)
    
            arrayItemsList.forEach((item, index)=>{
                // console.log(item, index)
                if(index < 8 && index >= 4){
                    let $a = $itemTemplate.children[0]
                    $a.id = item.id;
                    $a.setAttribute('productnumber', (+index + 1));
                    $itemTemplate.getElementById('item-img').src = item.img;
                    $itemTemplate.getElementById('item-detalles').innerHTML = `${item.nombre}<br>$${item.precio}`;
                    $itemTemplate.getElementById('item-detalles').setAttribute('data-stock', item.stock);
                    divRow2.append(d.importNode($itemTemplate, true))
                }
            })
            divRow2.innerHTML += divRow2.innerHTML + divRow2.innerHTML
            fragment.appendChild(divRow2)
    
            $carruselInventario[0].appendChild(fragment)
        }
        
    }    
}

export function itemsStockGeneral(){
    const $flexInventario = d.getElementsByClassName("flex-inventario"),
    $itemTemplate = d.getElementById('item-template').content;

    // console.log($flexInventario)
    if ($flexInventario.length != 0){
        const itemsList= JSON.parse(localStorage.getItem('itemsListStock'))
        if (!itemsList) return
        else {
            const arrayItemsList = Object.values(itemsList)

            let fragment = d.createDocumentFragment()
            let divRow1 = d.createElement('div')
            let divRow2 = d.createElement('div')
            divRow1.className = 'container-inventario'
            divRow2.className = 'container-inventario'
            divRow1.id = "inventario1"
            divRow2.id = "inventario2"
    
            arrayItemsList.forEach((item, index)=>{
                // console.log(item, index)
                if(index < 5){
                    let $a = $itemTemplate.children[0]
                    $a.id = item.id;
                    $a.setAttribute('productnumber', (+index + 1)) ;
                    $itemTemplate.getElementById('item-img').src = item.img;
                    $itemTemplate.getElementById('item-detalles').innerHTML = `${item.nombre}<br>$${item.precio}`;
                    $itemTemplate.getElementById('item-detalles').setAttribute('data-stock', item.stock);
                    divRow1.append(d.importNode($itemTemplate, true))
                }
            })
            divRow1.innerHTML += divRow1.innerHTML + divRow1.innerHTML
            fragment.appendChild(divRow1)
    
            arrayItemsList.forEach((item, index)=>{
                // console.log(item, index)
                if(index < 10 && index >= 5){
                    let $a = $itemTemplate.children[0]
                    $a.id = item.id;
                    $a.setAttribute('productnumber', (+index + 1));
                    $itemTemplate.getElementById('item-img').src = item.img;
                    $itemTemplate.getElementById('item-detalles').innerHTML = `${item.nombre}<br>$${item.precio}`;
                    $itemTemplate.getElementById('item-detalles').setAttribute('data-stock', item.stock);
                    divRow2.append(d.importNode($itemTemplate, true))
                }
            })
            divRow2.innerHTML += divRow2.innerHTML + divRow2.innerHTML
            fragment.appendChild(divRow2)
    
            $flexInventario[0].appendChild(fragment)
        }

    }        
}