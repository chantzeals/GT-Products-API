import express from 'express';
import postRoutes from './src/api/v1/Routes/post.routes.js';
import commentRoutes from './src/api/v1/Routes/comment.route.js';
import userRoutes from './src/api/v1/Routes/user.routes.js'; 
import morgan from 'morgan';
import config from './src/config/index.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import { testConnection } from './src/config/db.js';

const app = express();
const port = 3000;

if (config.nodeEnv === 'development') {
  console.log('Running in development mode');
} else if (config.nodeEnv === 'production') {
  console.log('Running in production mode');
} else {
  console.log('Running in unknown mode');
}

app.use(morgan('combined'));
app.use(express.json());
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);
app.use(errorHandler);
app.use('/api/v1', commentRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); 
});