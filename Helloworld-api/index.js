import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import config from './src/config/index.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import { swaggerSpec } from './src/config/swagger.js';

import authRoutes from './src/api/v1/Routes/auth.route.js';
import userRoutes from './src/api/v1/Routes/user.routes.js';
import postRoutes from './src/api/v1/Routes/post.routes.js';
import commentRoutes from './src/api/v1/Routes/comment.route.js';
import photoRoutes from './src/api/v1/Routes/photo.routes.js';

dotenv.config();

const app = express();
const port = 3000;

console.log(`Running in ${config.nodeEnv} mode`);


app.use(morgan('combined'));
app.use(express.json());

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(apiLimiter);

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 10,
  message: 'Too many login attempts. Please wait 10 minutes.'
});
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/photos', photoRoutes);


app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
