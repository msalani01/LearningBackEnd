import express from 'express';
import ProductManager from './index.mjs';

const app = express();
const port = 3000;

const productManager = new ProductManager('products.json');

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit); 
  let products = productManager.getAllProducts();

  if (!isNaN(limit) && limit > 0) {
    
    products = products.slice(0, limit);
  }

  res.json(products);
});

app.get('/product/:code', (req, res) => {
  const productCode = req.params.code;
  const productDetails = productManager.getProductDetails(productCode);
  res.send(productDetails);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
