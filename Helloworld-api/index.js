import express from 'express';
import productRoutes from './src/Routes/post.routes.js';
import commentRoutes from './src/Routes/comment.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', commentRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
