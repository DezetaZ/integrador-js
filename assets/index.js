const cartbtn = document.querySelector(".cart-icon");
const cartmenu = document.querySelector(".cart");
const menubtn = document.querySelector(".menuh");
const navbarmenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");

const productsContainer = document.querySelector(".catalogo-cont");
const calidadContainer = document.querySelector(".filtro-cont");
const calidadlist = document.querySelectorAll(".filter");
const showMoreBtn = document.querySelector(".cont-load");
const productsCart = document.querySelector(".cart-cont");

/* SAVE CART--------------------------------------------------------------------------------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = () =>{
    localStorage.setItem("cart", JSON.stringify(cart));
}

const createProduct = (product) => {
    const {id, name, calidad, price, img} = product;



    return`
    <div class="card-cont">
        <div class="card-img" style="background-image: url(${img});">
    

            <h2 class="card-title">${name}</h2>
            <div class="card-buy">
                <p> ${price} ${calidad}</p>
                <button class="buttom-buy"
                data-id="${id}"
                data-name="${name}"
                data-price="${price}"
                data-img="${img}"
                >
                <h2>Add</h2>

                </button>
            </div>

        </div>
    
    </div>
    `
};
/* Menus--------------------------------------------------------------------------------- */
const togglecart = () =>{
    cartmenu.classList.toggle("open-cart");
    if (navbarmenu.classList.contains("open-menu")){
        navbarmenu.classList.remove("open-menu")
        return;
    }
    overlay.classList.toggle("show-overlay");
};
const togglemenu = () =>{
    navbarmenu.classList.toggle("open-menu");
    if (cartmenu.classList.contains("open-cart")){
        cartmenu.classList.remove("open-cart")
        return;
    }
    overlay.classList.toggle("show-overlay");    
};
const closeMenus = () =>{
    if (!cartmenu.classList.contains("open-cart") && 
    !navbarmenu.classList.contains("open-menu")){
        return;
    }
    navbarmenu.classList.remove("open-menu");
    cartmenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}
const closeMenu = (e) => {
    if (!e.target.classList.contains("navbar-link")){
        return;
    };
    navbarmenu.classList.remove("open-menu");


};
/* RENDER--------------------------------------------------------------------------------- */

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
    .map(createProduct)
    .join("");

};
const renderFilterProducts = () => {
    const filterProducts = productsData.filter((product) => {
        return product.calidad == appState.activeFilter;
    });
    renderProducts(filterProducts);
};

/* Menus--------------------------------------------------------------------------------- */

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};
/* BTN VER MAS --------------------------------------------------------------------------------- */

const showMoreProduct = () =>{
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} =appState;
    renderProducts(products[currentProductsIndex]);
    if(isLastIndexOf()){
        showMoreBtn.classList.add("hiddent");
        
    }
};
const changeShowMore = () => {
    if(!appState.activeFilter){
        showMoreBtn.classList.remove("hiddent");
        return; 
    }
    showMoreBtn.classList.add("hiddent");

};
/* FILTER--------------------------------------------------------------------------------- */

const isInactiveFilter = (element) =>{
    return (
        element.classList.contains("filter") &&
        !element.classList.contains("active")
    );
};
const changeBtnActive = (selected) => {
    const calidad=[...calidadlist];
    calidad.forEach((calidadBtn) =>{
        if (calidadBtn.dataset.calidad !== selected){
            calidadBtn.classList.remove("active");
            return;
        };
        calidadBtn.classList.add("active");
    });
        
    
};

const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.calidad;
    changeBtnActive(appState.activeFilter);
    changeShowMore();

};

const applyFilter = ({target}) => {
    if (!isInactiveFilter(target)){
        return;
    }

    changeFilter(target);

    productsContainer.innerHTML = "";
    if(appState.activeFilter) {
        renderFilterProducts();
        appState.currentProductsIndex = 0
        return;
    }
    renderProducts(appState.products[0]);
};
/* CART--------------------------------------------------------------------------------- */
const createCartProduct = (product) => {
    return`
    
    `
};
const renderCart= () => {
    if(!cart.length){
        productsCart.innerHTML = `<p class="cart-msg">No hay productos en el carrito </p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProduct).join(""); 

};



const init = () => {
  
    renderProducts(appState.products[appState.currentProductsIndex]);
    cartbtn.addEventListener("click", togglecart)
    menubtn.addEventListener("click", togglemenu)
    showMoreBtn.addEventListener("click", showMoreProduct);
    calidadContainer.addEventListener("click", applyFilter);
    window.addEventListener("scroll", closeMenus)
    navbarmenu.addEventListener("clicl", closeMenu)
    document.addEventListener("DOMContentLoaded", renderCart);
};

init();