import express from 'express';
import productRoutes from './src/api/v1/Routes/post.routes.js';
import commentRoutes from './src/api/v1/Routes/comment.route.js';
import morgan from 'morgan';
import config from './src/config/index.js';
import errorHandler from './src/middleware/errorHandler.js';

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
app.use('/api/v1/products', productRoutes);
app.use(errorHandler);
app.use('/', commentRoutes);
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});