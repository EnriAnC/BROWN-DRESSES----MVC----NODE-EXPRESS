const d=document;

export function formRegistroYValidación(){
    const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");
    console.log($inputs)

    $inputs.forEach(input =>{
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none")
        input.insertAdjacentElement("afterend", $span)
    });

    d.addEventListener("keyup", e => {
        if(e.target.matches(".contact-form [required]")){
            let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;
            //console.log($input, pattern)
            if (pattern && $input.value != ""){
                console.log("input con Patron");
                let regex = new RegExp(pattern)
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }

            if (!pattern){
                console.log("input sin Patron")
                return $input.value === ""
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }
        }
    })
    $form.addEventListener("submit", e=>{
        e.preventDefault();
        alert("Registrando cuenta...");

        const $response = d.querySelector(".contact-form-response");

        const options = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                usuario: e.target.usuario.value,
                password: e.target.password.value
            })
        }

        fetch('http://localhost:3000/solicitud-registro', options)
        .then(res=>res.json())
        .then(data=>{
            $response.classList.remove("none")
            $form.innerHTML = data.msg
        })
        .catch(err=>{
            console.log('Error:', err)
        })

            
            

    })
}