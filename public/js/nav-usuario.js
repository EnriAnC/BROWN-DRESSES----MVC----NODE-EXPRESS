const d = document;

export default function navUsuario(e){
    cerrarSesion(e)
}

function cerrarSesion(e){
 if (e.target.matches('#cerrar-sesion')){
    localStorage.removeItem('tkn')
    d.getElementsByClassName('opciones-usuario')[0].innerHTML = `<p>Sesión cerrada</p>`
    setTimeout(() => {
        location.reload()   
    }, 500);
    
 }
}