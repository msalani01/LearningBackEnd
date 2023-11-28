class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  getAllProducts() {
    return this.products;
  }

  getProductByCode(productCode) {
    return this.products.find(product => product.code === productCode);
  }

  removeProductByCode(productCode) {
    this.products = this.products.filter(product => product.code !== productCode);
  }
}

const productManager = new ProductManager();

function getProductDetails() {
  const productCodeInput = document.getElementById('productCode');
  const productDetailsDiv = document.getElementById('productDetails');

  const productCode = productCodeInput.value;
  const product = productManager.getProductByCode(productCode);

  if (product) {
    const detailsHTML = `
      <h2>Product Details</h2>
      <p>Title: ${product.title}</p>
      <p>Description: ${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>Thumbnail: <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100px;"></p>
      <p>Stock: ${product.stock}</p>
    `;
    productDetailsDiv.innerHTML = detailsHTML;
    productDetailsDiv.classList.add('active');
  } else {
    productDetailsDiv.innerHTML = '<p>Product not found</p>';
  }
}

// Agregar productos
productManager.addProduct({
  id: 1,
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 19.99,
  thumbnail: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ6sgyBma0_ChoOI9NVHc3pw01Q1lEvgOanECGHz1HbUPYFn65rzHwrYLGNNQX3ESp4p0YCgaZpmX525koXi87e_FR9-gAvgSiyk4SoPBwG4zc4jNN6n2NOS8U8Q2VbNKJkdnCnFA&usqp=CAc",
  code: "P001",
  stock: 10
});

productManager.addProduct({
  id: 2,
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 29.99,
  thumbnail: "url_thumbnail_2",
  code: "P002",
  stock: 15
});

// Obtener todos los productos
console.log(productManager.getAllProducts());
