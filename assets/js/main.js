const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'assets/images/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'assets/images/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'assets/images/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    }
  ]

document.addEventListener( "DOMContentLoaded", () =>{
    load()
    showProducts( items )
})

/* =========== LOADER ========== */
const loader = document.getElementById( "loader" )
function load () {
    setTimeout(() => {
        loader.classList.add( "hide" )
    }, 3000);
}

/* =========DARK MODE======== */
const themeButton = document.getElementById( "theme-button" )

themeButton.addEventListener( "click", () =>{
    document.body.classList.toggle( "dark-theme" )

    if( themeButton.classList.contains( "bx-moon" ) ){
        themeButton.classList.replace( "bx-moon", "bx-sun" )
    }else{
        themeButton.classList.replace( "bx-sun", "bx-moon" )
    }
})


/*=======  CARRITO =========== */
const cartOpen = document.getElementById( "cart-shop" )
const cartClose = document.getElementById( "close-cart" )
const cartContainer = document.getElementById( "cart-container" )

cartOpen.addEventListener( "click", () => {
    cartContainer.classList.remove( "hide" )
})

cartClose.addEventListener( "click", () => {
    cartContainer.classList.add( "hide" )
})



/* ========SCROLL========= */
const header = document.getElementById("header")

window.addEventListener( "scroll", () =>{
    if( window.scrollY >= 50 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})

/* AÑADIR PRODUCTO */
const productContainer = document.querySelector( "#products-list" )
function showProducts( products ){
    let fragment = ``

    products.map( product => {
        fragment += `
        <div class="product-card" id="${product.id}">
            <img src=${product.image} alt="">
            <button class="btn-add">ADD</button>
        </div>
        ` 
    } )

    productContainer.innerHTML = fragment
    cartFunctionality()
}

/* AGREGAR AL CARRITO */
function cartFunctionality( ){
    const cartProducts =  document.getElementById('cart-products')
    const cart = []
    let productsHTML = ` `
    const btns = document.querySelectorAll( ".btn-add" ) //NodeList    
    btns.forEach( button =>{
        //Arreglo con todos los botones
        button.addEventListener( "click", e => {
            const id = parseInt(e.target.parentElement.id)
            const selectedProduct = items.find( item => item.id === id)

            if( cart.indexOf(selectedProduct)!== -1 ){
                if(selectedProduct.units>=1 && selectedProduct.units!==selectedProduct.quantity){
                    selectedProduct.subtotal += selectedProduct.price
                    selectedProduct.units++
                }else{
                    window.alert("We do not have enough in stock");
                }
            }else{
                cart.push( selectedProduct )
                selectedProduct.units = 1
                selectedProduct.subtotal = selectedProduct.price
            }
            
            //Mostrar productos en el carro
            cart.map(element =>{
                if (element.units===1){
                    productsHTML +=` 
                    <div class="products--item" id="${element.id}">
                    <div class="item--container-img">
                    <img src=${element.image} class="item--img" alt="">
                    </div>
                    <div class="item--info">
                    <h4>${element.name}</h4>
                    <small>Stock: ${element.quantity}|</small>
                    <p>$${element.price}</p>
                    <p id="subtotal${element.id}">Subtotal: $${element.subtotal}.00</p>
                    <div class="info--button">
                    <button id='button-less'>-</button>
                    <p id="units${element.id}">${element.units} units</p>
                    <button id='button-plus'>+</button>
                    </div>
                    </div>
                    <i class='bx bx-trash-alt'></i>          
                    </div> `
                    cartProducts.innerHTML = productsHTML
                    }else{
                        document.getElementById(`subtotal${element.id}`).textContent=`Subtotal: $${element.subtotal}.00`
                        document.getElementById(`units${element.id}`).textContent=`${element.units} units`
                    }})

            //Mostrar unidades en el contador
            
        })
    })
}

 /* MENU */
const menuOpen = document.getElementById("nav-toggle")
const menu = document.getElementById("nav-menu")
const menuClose= document.querySelector('.menu--close')
const navList = document.querySelector('.nav--list')
menuOpen.addEventListener( "click", () => {
    menu.classList.add( "nav--menu__show" )
})

menuClose.addEventListener( "click", () => {
    menu.classList.remove( "nav--menu__show" )
})
navList.addEventListener( "click", () => {
    menu.classList.remove( "nav--menu__show" )
})