// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import uploadRoutes from '../../routes/uploadRoutes'
import fileRoutes from '../../routes/fileRoutes'
import userRoutes from '../../routes/userRoutes'
import authRoutes from '../../routes/auth'
import config from '../../config/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import upload from '../../multerConfig'
import bodyParser from 'body-parser'
import connectToDatabase from '../../config/db'
import cors from 'cors'

const app = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use("/api", router);



// Initialize Swagger JSdoc
const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: config.swaggerDefinition,
    apis: config.apiPaths,
});

// Enable CORS
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Serve Swagger UI
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Use the upload routes
app.use(uploadRoutes);

// Use the file routes
app.use("/api", fileRoutes);
app.use(upload.single('file'));
app.use("/api", userRoutes);
app.use('api/auth', authRoutes);
// MongoDB URI
const mongoURI = config.mongoURI;

// Call the function to establish MongoDB connection
connectToDatabase(mongoURI);

export const handler = serverless(app);
