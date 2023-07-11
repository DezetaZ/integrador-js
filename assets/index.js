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
const totalCart = document.querySelector(".total");
const sumbitMsg = document.querySelector(".add-msg");
const btnBuy = document.querySelector(".btn-buy");
const btnVaciar = document.querySelector(".btn-vaciar");
const cartBubble = document.querySelector(".cart-bubble");


/* SAVE CART--------------------------------------------------------------------------------- */
let cartCont = JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cartCont));
}

const createProduct = (product) => {
    const { id, name, calidad, price, img } = product;



    return `
    <div class="card-cont-${calidad}">
        <div class="card-img" style="background-image: url(${img});">
    

            <h2 class="card-title-${calidad}">${name}</h2>
            <div class="card-buy-${calidad}">
                <p class="price-${calidad}"> $${price} </p>
                <button class="buttom-buy"
                data-id="${id}"
                data-name="${name}"
                data-price="${price}"
                data-img="${img}"
                data-calidad"${calidad}"
                >
                Add

                </button>
            </div>

        </div>
    
    </div>
    `
};
/* Menus--------------------------------------------------------------------------------- */
const togglecart = () => {
    cartmenu.classList.toggle("open-cart");
    if (navbarmenu.classList.contains("open-menu")) {
        navbarmenu.classList.remove("open-menu")
        return;
    }
    overlay.classList.toggle("show-overlay");
};
const togglemenu = () => {
    navbarmenu.classList.toggle("open-menu");
    if (cartmenu.classList.contains("open-cart")) {
        cartmenu.classList.remove("open-cart")
        return;
    }
    overlay.classList.toggle("show-overlay");
};
const closeMenus = () => {
    if (!cartmenu.classList.contains("open-cart") &&
        !navbarmenu.classList.contains("open-menu")) {
        return;
    }
    navbarmenu.classList.remove("open-menu");
    cartmenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}
const closeMenu = (e) => {
    if (!e.target.classList.contains("navbar-link")) {
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
    return appState.currentProductsIndex === appState.productsLimit - 1;
};
/* BTN VER MAS --------------------------------------------------------------------------------- */

const showMoreProduct = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hiddent");

    }
};
const changeShowMore = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hiddent");
        return;
    }
    showMoreBtn.classList.add("hiddent");

};
/* FILTER--------------------------------------------------------------------------------- */

const isInactiveFilter = (element) => {
    return (
        element.classList.contains("filter") &&
        !element.classList.contains("active")
    );
};
const changeBtnActive = (selected) => {
    const calidad = [...calidadlist];
    calidad.forEach((calidadBtn) => {
        if (calidadBtn.dataset.calidad !== selected) {
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

const applyFilter = ({ target }) => {
    if (!isInactiveFilter(target)) {
        return;
    }

    changeFilter(target);

    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilterProducts();
        appState.currentProductsIndex = 0
        return;
    }
    renderProducts(appState.products[0]);
};
/* CART--------------------------------------------------------------------------------- */
const createCartProduct = (product) => {
    const { id, name, img, price,  cant} = product
    return `
        <div class="cart-item">
             <img src="${img}" alt="${name}" class="cart-item-img">
            <div class="item-cont">
                <div class="item-text">
                    <h2>${name}</h2>
                    <p>Precio:</p>
                    <h2>${price}</h2>
                </div>
                <div class="item-cantidad">
                    <button class="restar">-</button>
                    <h2>${cant}</h2>
                    <button class="sumar">+</button>
                </div>
            </div>


        </div>
    
    `
};
const renderCart = () => {
    if (!cartCont.length) {
        productsCart.innerHTML = `<p class="cart-msg">No hay productos en el carrito </p>`;
        return;
    };
    productsCart.innerHTML = cartCont.map(createCartProduct).join("");

};
const getCartTotal = () => {
    return cartCont.reduce((acc, val) => {
        return acc + Number(val.price) * Number(val.cant);
    }, 0);
};
const showCartTotal = () => {
    totalCart.innerHTML = `$${getCartTotal()}`;
};
const createProductData = (product) => {
    const { id, name, price, img, } = product;
    return { id, name, price, img, };
};
const existProductCart = (product) => {
    return cartCont.find((item) => {
        return item.id === product;
    });
};
const additemToProduct = (product) => {
    cartCont = cartCont.map((cartProduct) => {
        return cartProduct.id === product.id
            ? { ...cartProduct, cant: cartProduct.cant + 1 }
            : cartProduct;
    });
}
const showMsg = (msg) => {
    sumbitMsg.classList.add("active-msg");
    sumbitMsg.textContent = msg;
    setTimeout(() => {
        sumbitMsg.classList.remove("active-msg");
    }, 1500
    );
};
const addNewCartProduct = (product) => {
    cartCont = [
        ...cartCont,
        {
            ...product,
            cant: 1,
        },
    ];
};
const clearBtn = (btn) => {
    if (!cartCont.length) {
        btn.classList.add("clear");
    } else {
        btn.classList.remove("clear");
    }
};
const renderCartBubble = () => {
    cartBubble.textContent = cartCont.reduce((acc, val) => {
        return acc + val.cant;
    }, 0);
};
const updateCart = () => {
    saveCart();
    renderCart();
    showCartTotal();
    clearBtn(btnBuy);
    clearBtn(btnVaciar);
    renderCartBubble();

}
const addProduct = (e) => {
    if (!e.target.classList.contains("buttom-buy")) {
        return;
    }
    const product = createProductData(e.target.dataset);
    if (existProductCart(product.id)) {
        additemToProduct(product);
        showMsg("Se agregó una unidad al producto");
    } else {
        addNewCartProduct(product);
        showMsg("Se agregó un producto al carrito");
    }
    updateCart();
    
};
const removeProductFromCart = (existingProduct) => {
    cartCont = cartCont.filter((product) => {
        return product.id !== existingProduct.id;
    });
    updateCart();
};

const substractProductUnit = (existingProduct) => {
    cartCont = cartCont.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, cant: Number(product.cant) - 1 }
            : product;
    });
};
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cartCont.find((item) => item.id === id);

/*     if (existingCartProduct.cant === 1) {
        //Eliminar producto
        if (window.confirm("¿Desea eliminar el producto del carrito?")) {
            removeProductFromCart(existingCartProduct);
        }
        return;
    } */
    //Sacarle unidad al producto
    substractProductUnit(existingCartProduct);
};
const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cartCont.find((item) => item.id === id);
	additemToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
    if (e.target.classList.contains("restar")) {
        //Manejamos evento de boton -
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("sumar")) {
        //Manejamos evento de boton +
        handlePlusBtnEvent(e.target.dataset.id);    }
    //Actualizamos estado de carrito
    updateCart();
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
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity)
    clearBtn(btnBuy);
    clearBtn(btnVaciar);
    renderCartBubble();

};

init();