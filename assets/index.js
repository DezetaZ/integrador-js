const cartbtn = document.querySelector(".cart-icon");
const cartmenu = document.querySelector(".cart");
const menubtn = document.querySelector(".menuh");
const navbarmenu = document.querySelector(".navbar-list");
const expoContainer = document.querySelector(".card-expo-cont");
const productsContainer = document.querySelector(".catalogo-cont");
const calidadContainer = document.querySelector(".filtro-cont");
const calidadlist = document.querySelectorAll(".filter");
const showMoreBtn = document.querySelector(".cont-load");



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
const togglecart = () =>{
    cartmenu.classList.toggle("open-cart");

};
const togglemenu = () =>{
    navbarmenu.classList.toggle("open-cart");
};


const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
    .map(createProduct)
    .join("");

};
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};
const showMoreProduct = () =>{
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} =appState;
    renderProducts(products[currentProductsIndex]);
    if(isLastIndexOf()){
        showMoreBtn.classList.add("hiddent");
        
    }
};
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
const changeShowMore = () => {
    if(!appState.activeFilter){
        showMoreBtn.classList.remove("hiddent");
        return; 
    }
    showMoreBtn.classList.add("hiddent");

};
const changeFilter = (btn) => {
    appState.activeFilter = btn.dataset.calidad;
    changeBtnActive(appState.activeFilter);
    changeShowMore();

};
const renderFilterProducts = () => {
    const filterProducts = productsData.filter((product) => {
        return product.calidad == appState.activeFilter;
    });
    renderProducts(filterProducts);
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

const init = () => {
  
    renderProducts(appState.products[appState.currentProductsIndex]);
    cartbtn.addEventListener("click", togglecart)
    showMoreBtn.addEventListener("click", showMoreProduct);
    calidadContainer.addEventListener("click", applyFilter);
    menubtn.addEventListener("click", togglemenu)
};

init();