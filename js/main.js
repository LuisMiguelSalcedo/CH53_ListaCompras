const txtName = document.getElementById("Name");  //Nombre
const txtNumber = document.getElementById("Number"); // Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeracion de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//lenght<= Si la longitud es igual a 0 sera falso, el 

    if(isNaN(txtNumber.value)){  //Si el valor de txtNumber no es un numero se regresa falso
        return false; 
    }//isNaN
    
    if(Number(txtNumber.value)<=0){ //Este if es para validar que el numero es mayor que 0
        return false;
    }
    //Mayor de 0
    return true;
};// Funcion creada para validar la cantidad que no sea 0, que es un numero y que es mayor de 0

function getPrecio(){ //En esta funcion se hara un precio alatorio
    return Math.round((Math.random()*10000)) / 100; 
}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //Bandera, al ser true permite agregar los datos a la tabla
    let isValid = true;

    alertValidacionesTexto.innerHTML=""; //
    alertValidaciones.style.display="none"; //Quitar borde
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid medium red";//El borde lo marca con color rojo
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto.</strong>";//Te da un mensaje
        alertValidaciones.style.display="block";
        isValid = false;
    }//length>=3

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";//El borde lo marca con color rojo
        alertValidacionesTexto.innerHTML +="<br/><strong>La cantidad no es correcta.</strong>"; //Se añade a la validacion del nombre
        alertValidaciones.style.display="block";
        isValid = false;
    }//validad cantidad

    if(isValid){ //Si paso las validaciones
        cont++;
        let precio = getPrecio();
        let row =`<tr>
                  <td>${cont}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>
                  <td>${precio}</td>   
                  </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value); //Suma los precios de los productos
        precioTotal.innerText = "$" + costoTotal.toFixed(2); 
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos; //Suma los productos
        contadorProductos.innerText = cont;
        


        txtName.value = ""; //Dejar en blanco el nombre despues de agregar
        txtNumber.value = ""; //Dejar en blanco la cantidad despues de agregar
        txtName.focus();
    }//if isValid

});//btnAgregar


