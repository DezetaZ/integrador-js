const cartbtn = document.querySelector(".cart-icon");
const menubtn = document.querySelector(".menuh");
const cartmenu = document.querySelector(".cart")
const productsContainer = document.querySelector(".catalogo-cont")



const createProduct = (product) => {
    const {id, name, calidad, price, img} = product;


    return`
    <div class="card-cont">
        <div class="card-img" style="background-image: url(${img});">

            <h2 class="card-title"> ${name}</h2>
            <div class="card-buy">
                <p> ${price}</p>
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

const renderProducts = (productsList) => {
    productsContainer.innerHTML = productsList
    .map(createProduct)
    .join("");
};


const init = () => {
    renderProducts(productsData);
    cartbtn.addEventListener("click", togglecart);
    menubtn.addEventListener("click", togglemenu);
};

init();