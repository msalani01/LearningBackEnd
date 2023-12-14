const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);
    return product ? { ...product } : null;
  }

  addProduct(product) {
    this.products.push(product);
    this.saveProducts();
  }

  getAllProducts() {
    return this.products;
  }

  getProductByCode(productCode) {
    return this.products.find(product => product.code === productCode);
  }

  updateProductById(productId, updatedProduct) {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updatedProduct,
        id: productId,
      };
      this.saveProducts();
      console.log(`Product with ID ${productId} updated successfully.`);
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  }

  removeProductByCode(productCode) {
    this.products = this.products.filter(product => product.code !== productCode);
    this.saveProducts();
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

const productManager = new ProductManager('products.json');

function getProductDetails(productCode) {
  const product = productManager.getProductByCode(productCode);

  if (product) {
    return `
      Product Details:
      Title: ${product.title}
      Description: ${product.description}
      Price: $${product.price.toFixed(2)}
      Thumbnail: ${product.thumbnail}
      Stock: ${product.stock}
    `;
  } else {
    return 'Product not found';
  }
}

const productById = productManager.getProductById(1);

if (productById) {
  console.log('Product found:', productById);
} else {
  console.log('Product not found');
}

const productCode = 'P001';
console.log(getProductDetails(productCode));

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

productManager.addProduct({
  id: 3,
  title: "Producto 3",
  description: "Descripción del Producto 3",
  price: 39.99,
  thumbnail: "url_thumbnail_3",
  code: "P003",
  stock: 20
});

console.log("Before Update:", productManager.getAllProducts());

productManager.updateProduct("P003", {
  price: 49.99,
  stock: 25
});

console.log("After Update:", productManager.getAllProducts());

console.log(productManager.getAllProducts());
