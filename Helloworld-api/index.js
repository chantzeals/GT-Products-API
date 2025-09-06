
import express from 'express';
import productRoutes from './src/Routes/post.routes.js'; 

const app = express();
const port = 3000;

app.use(express.json());

app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
