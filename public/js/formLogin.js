const d = document;

export default function login (){
    const tkn = localStorage.getItem('tkn')
    if(!tkn){
        const $loginForm = d.getElementById('login-form')
        $loginForm.addEventListener('submit', e=>{
        (async ()=>{
            e.preventDefault()
            // e.target.btnlogin.setAttribute('disabled', true)
            try {
                const options = {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                        usuario: e.target.usuario.value,
                        password: e.target.password.value
                    })
                }
                const res = await fetch('http://localhost:3000/login', options),
                data = await res.json()
                if (res.err) throw err
                console.log(data)
                if (data.codigo != '002'){
                    e.target.btnlogin.setAttribute('disabled', true)
                    localStorage.setItem('tkn',JSON.stringify(data.token))
                    e.target.innerHTML = "Ha iniciado sesión correctamente"
                    setTimeout(() => {
                        location.reload()
                    }, 500);
                } else {
                    e.target.btnlogin.style.margin = '0'
                    d.getElementById('msg-login').innerText = data.msg
                }
                // alert(data.token)
                
            } catch (err) {
                console.log('Error: ', err)
            }

        })()
    })
    }
    
}
