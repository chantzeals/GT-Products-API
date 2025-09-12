import express from 'express';
import productRoutes from './src/Routes/post.routes.js';
import commentRoutes from './src/Routes/comment.route.js';
import morgan from 'morgan'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
} else {
  console.log('Running in unknown mode');
}


app.use(morgan('dev'));
app.use(express.json());
app.use('/', commentRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
