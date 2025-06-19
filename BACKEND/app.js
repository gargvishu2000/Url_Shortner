import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import short_url from "./src/routes/short_url.route.js";
import auth_routes from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from 'cookie-parser';
import user_routes from './src/routes/user.route.js'
import { connectRedis } from "./src/config/redis.js";
import { createUrlRateLimiter, redirectRateLimiter } from "./src/middleware/rateLimiter.middleware.js";
dotenv.config("./.env")

const app = express();
const allowedOrigins = [
  "https://url-shortner-ashen-zeta.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Handle OPTIONS preflight requests explicitly
app.options('*', cors());
app.use(express.json()); // parses incoming data in the body
app.use(express.urlencoded({extended:true})); // parses data with the payload.
app.use(cookieParser());

app.use(attachUser)
app.use('/api/user', user_routes);
app.use('/api/auth', auth_routes);
app.use('/api/create', short_url);
app.get('/:shortUrl', redirectRateLimiter,redirectFromShortUrl);
app.use(errorHandler);

app.listen(5002, async()=>{
    await connectDB();

    console.log("server is running on 5000");  
    await connectRedis();
    console.log('✅ Redis connected');
})
