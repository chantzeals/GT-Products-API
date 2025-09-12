import express from 'express';
import productRoutes from './src/Routes/post.routes.js';
import commentRoutes from './src/Routes/comment.route.js';
import morgan from 'morgan';
import config from './src/config/index.js';

const app = express();

if (config.nodeEnv === 'development') {
  console.log('Running in development mode');
} else if (config.nodeEnv === 'production') {
  console.log('Running in production mode');
} else {
  console.log('Running in unknown mode');
}

app.use(morgan('combined'));
app.use(express.json());
app.use('/', commentRoutes);
app.use('/products', productRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});