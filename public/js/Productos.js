export default class Productos{
    constructor(){
        this.items = this.getAll()
    }
    async getAll(){
        const res = await fetch('http://localhost:3000/productos', {"Content-Type": "application/json"}),
        items = await res.json()
        return items
    }

    async stockToLS(){
        localStorage.setItem('itemsListStock', JSON.stringify(await this.getAll()))
    }
}