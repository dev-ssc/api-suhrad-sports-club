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
const swaggerSpec = swaggerJSDoc({
    encoding: 'utf8',
    failOnErrors: false,
    verbose: false,
    format: 'yaml', // or 'json', depending on your preference
    swaggerDefinition: config.swaggerDefinition,
    definition: {}, // or provide your Swagger definition here if needed
    apis: config.apiPathsNetify,
});
const app = express();

app.use(cors());
// Handle preflight requests for all routes
app.options('*', cors()); 
// Serve Swagger UI
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const router = Router();

// Enable CORS


router.get('/hello', (req, res) => res.send('Hello World test v1!'));

app.use("/api", router);





// Middleware to set Access-Control-Allow-Origin header for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Use the upload routes
app.use(uploadRoutes);

// Use the file routes
app.use('/api', fileRoutes);
app.use(upload.single('file'));
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes); // Fixed missing '/' at the beginning

// MongoDB URI
const mongoURI = config.mongoURI;

// Call the function to establish MongoDB connection
connectToDatabase(mongoURI);

export const handler = serverless(app);
