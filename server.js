const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;


const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);

const server = http.createServer(app);

server.listen(PORT,console.log(`server started...`));
