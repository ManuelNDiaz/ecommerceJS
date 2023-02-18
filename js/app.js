let carrito = [];

const contenedor = document.querySelector("#ventarp");
const carritoContenedor = document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal = document.querySelector('#precioTotal')
const procesarCompra = document.querySelector('#procesarCompra')


document.addEventListener('DOMContentLoaded', () => {
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
}) // LocalStorage

fetch('js/productos.json')

.then((response) => response.json())

.then((data) => {

  productosJson = data;

  return new Promise((resolve) => resolve(data));

})

.then((productosJson) => productosJson.forEach((prod) => {
  const {id, nombre, precio, img, cantidad, fondo} = prod
  contenedor.innerHTML += `
  <div class="cards" id="${fondo}">
  <div class="objetfitcover imgBx">
      <img src="${img}" alt="${nombre}" class="img-fluid">
  </div>
  <div class="precio">
      <h3 class="titulo">${nombre}</h3>
  </div>
  <div class="content">
      <div class="detalles">
          <h2 class="prcio"><span>${precio}$ARS</span></h2>
          <button onclick="agregarProducto(${id})" class="cart-button">
              <span class="add-to-cart">Comprar</span>
              <span class="added">Añadido</span>
              <i class="fas fa-shopping-cart"></i>
              <i class="fas fa-box"></i>
          </button>
      </div>
  </div>
</div>
      `      // Código HTML donde se muestran los próductos a ofrecer.
    
      const cartButtons = document.querySelectorAll('.cart-button');

      cartButtons.forEach(button => {
          button.addEventListener('click', cartClick);
      });
      
      function cartClick() {
          let button = this;
          button.classList.add('clicked');
          setTimeout(() => {
              button.classList.remove('clicked');
          }, 2100);
      }}));
      
      // Animación del botón de comprar, el cual aparece un carrito añadiendo cosas.
      


procesarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "¡Tu carrito está vacio!",
      text: "Escoje alguno de nuestros servicios para poder continuar con el pago",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
      Swal.fire({
          title: "¡Tu compra fue procesada!",
          text: "A continuación nos contactaremos para realizar la compra solicitada",
          icon: "success",
          confirmButtonText: "Aceptar",
        });

      }
}); // Librería sweetAlert, código el cual se ejecuta cuando el usuario hace click en comprar dentro del carrito.
  

vaciarCarrito.addEventListener('click', () => {
  carrito.length = []
  Toastify({
    text: "Carrito vacío",
    duration: 1500,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(118deg, rgba(18,118,173,1) 31%, rgba(2,57,110,1) 85%)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem', 
        y: '1.5rem' 
      },
    onClick: function(){} 
  }).showToast();
  mostrarCarrito()
}) // Función para vaciar el carrito con un click.

function agregarProducto (id) {

  Toastify({
    text: "Producto agregado",
    duration: 1500,
    close: true,
    gravity: "top", 
    position: "right",
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(118deg, rgba(18,118,173,1) 31%, rgba(2,57,110,1) 85%)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem', 
        y: '1.5rem' 
      },
    onClick: function(){} // Callback after click
  }).showToast();

  const existe = carrito.some(prod => prod.id === id)

  if(existe){
      const producto = carrito.map(prod => {
          if(prod.id === id) {
              prod.cantidad++
          }
      })
  } else {
      const item = productosJson.find((prod) => prod.id === id)
      carrito.push(item)
  }

  mostrarCarrito()
}

const mostrarCarrito = () => {
  const modalBody = document.querySelector('.modal .modal-body')
  
  modalBody.innerHTML = ''

  carrito.forEach((prod) => {
      const {id, nombre, img, cantidad, precio} = prod
      modalBody.innerHTML += `
      <div class="modal-contenedor">
      <div>
      <img class="img-fluid img-carrito" src="${img}"/>
      </div>
      <div class="txtCarrito">
      <p>Producto: ${nombre}</p>
    <p>Precio: ${precio}$ARS</p>
    <p>Cantidad: ${cantidad}</p>
    <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
    <div class="divider"></div>
      </div>
    </div>
    

    `
      
  })

  if (carrito.length === 0) {
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo"> ¡Tu carrito está vacío! </p>
      `
  } else {

  }
  
  carritoContenedor.textContent = carrito.length

  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

  guardarStorage()

} // Código de carrito de compras, todo ésto es lo que se vé una vez que el usuario agrega productos o cuando simplemente apreta en el carrito.

function eliminarProducto(id){
  const juegoId = id 
  carrito = carrito.filter((juego) => juego.id !== juegoId)

  Toastify({
    text: "Producto eliminado",
    duration: 1500,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(118deg, rgba(18,118,173,1) 31%, rgba(2,57,110,1) 85%)",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem', 
        y: '1.5rem' 
      },
    onClick: function(){} 
  }).showToast();

  mostrarCarrito()

}

function guardarStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
} // LocalStorage

