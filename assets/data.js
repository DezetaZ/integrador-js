const productsData = [
{
    id: 1,
    name: "M4A1 Monst",
    calidad: "legend",
    price: "$500",
    img: "./assets/img/skins/m4a1-mariposa.png",

},
{
    id: 2,
    name: "Bayonet",
    calidad: "legend",
    price: "$1200",
    img: "./assets/img/skins/bayonet.png",
    
},
{
    id: 3,
    name: "Statik",
    calidad: "legend",
    price: "$1500",
    img: "./assets/img/skins/statik.png",
    
},
{
    id: 4,
    name: "ak47 bloodsport",
    calidad: "legend",
    price: "$700",
    img: "./assets/img/skins/ak47-bloodsport.png",
    
},
{
    id: 5,
    name: "Knife Butterfly",
    calidad: "epica",
    price: "$700",
    img: "./assets/img/skins/mariposa.png",
    
},
{
    id: 6,
    name: "Knife Butterfly Red",
    calidad: "epica",
    price: "$900",
    img: "./assets/img/skins/mariposa-red.png",
    
},
{
    id: 7,
    name: "Greenigth",
    calidad: "epica",
    price: "$600",
    img: "./assets/img/skins/greenigth.png",
    
},
{
    id: 8,
    name: "usp Fantic",
    calidad: "epica",
    price: "$200",
    img: "./assets/img/skins/pistol.png",
    
},
{
    id: 9,
    name: "m4a1 Hotroad",
    calidad: "epica",
    price: "$300",
    img: "./assets/img/skins/m4a1-hotroad.png",
    
},
{
    id: 10,
    name: "m4a1 Flame",
    calidad: "epica",
    price: "$300",
    img: "./assets/img/skins/m4a1-flame.png",
    
},
{
    id: 11,
    name: "ak47 Simp",
    calidad: "comun",
    price: "$120",
    img: "./assets/img/skins/ak1simp.png",
    
},
{
    id: 12,
    name: "aug momentum",
    calidad: "comun",
    price: "$80",
    img: "./assets/img/skins/aug-momentum.png",
    
},
{
    id: 13,
    name: "m4a1 simp",
    calidad: "comun",
    price: "$100",
    img: "./assets/img/skins/m4a1-simp.png",
    
},
{
    id: 14,
    name: "De. Gblood",
    calidad: "comun",
    price: "$90",
    img: "./assets/img/skins/de-greenblood.png",
    
},
{
    id: 15,
    name: "De. Printstream",
    calidad: "comun",
    price: "$50",
    img: "./assets/img/skins/de-printstream.png",
    
},
{
    id: 16,
    name: "p90 Nostalgia",
    calidad: "comun",
    price: "$60",
    img: "./assets/img/skins/p90-nostalgia.png",
    
},
{
    id: 17,
    name: "show Viwsor",
    calidad: "Unic",
    price: "$10.000",
    img: "./assets/img/skins/show-viwsor.png",
    
},

];


const divideProductsInParts = (size) => {
	let productsList = [];
	for (let i = 0; i < productsData.length; i += size) {
		productsList.push(productsData.slice(i, i + size));
	}
	return productsList;
};

const appState = {
	products: divideProductsInParts(6),
	currentProductsIndex: 0,
	productsLimit: divideProductsInParts(6).length,
	activeFilter: null,
};
