window.onload = ()=>{
    let txtNombre =document.getElementById("nombre")
    let nombreCliente =document.querySelector("#nombreCliente")
    let form =document.querySelector("#form")
    let arr=[]
    if(localStorage.getItem("pedido")){
        arr= JSON.parse(localStorage.getItem("pedido"))
        imprimirTabla()
    }
    let tablaPrecio=[
        { id:1, material:"Acero inoxidable", precio: 2000.50 },
        { id:2, material:"Plástico ABS", precio: 10.00 },
        { id:3, material:"Aluminio", precio: 30.00 },
        { id:4, material:"Cobre", precio: 70.00 }
    ]

    txtNombre.addEventListener('keyup',()=>{
        nombreCliente.innerText = "Nombre del Cliente: "+txtNombre.value
    })
    form.addEventListener('submit',(event)=>{
        event.preventDefault()//evita la recarga de la pagina
        let material =document.querySelector('#material')
        let cantidad= document.querySelector('#cantidad')
        let fecha = document.querySelector('#fecha')
        let observaciones = document.querySelector('#observaciones')
        let precio= tablaPrecio.find(item=>item.material== material.value)
        arr.push({
            id:arr.length+1,
            material:material.value,
            cantidad:cantidad.value,
            fecha:fecha.value,
            observaciones:observaciones.value,
            subtotal:precio.precio * parseInt(cantidad.value)
        })
        imprimirTabla()
        localStorage.setItem("pedido",JSON.stringify(arr))
    })
    const imprimirTabla=()=>{
        var trs=""
        var total=0
        arr.forEach(item=>{
            total+=item.subtotal
            trs+=` <tr>
                        <td>${item.id}</td>
                        <td>${item.material}</td>
                        <td> <input value="${item.cantidad}" type="number" /> </td>
                        <td>${item.fecha}</td>
                        <td>${item.observaciones}</td>
                        <td>$${ item.subtotal.toFixed(2)}</td>
                    </tr>`
        }) 
        document.querySelector("tbody").innerHTML=trs
        document.querySelector("#tdTotal").innerHTML=`<b>$${total.toFixed(2)}</b>`
    }
}       