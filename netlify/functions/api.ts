// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);


// app.js
const uploadRoutes = require('../../routes/uploadRoutes')
const fileRoutes = require('../../routes/fileRoutes');
const userRoutes = require('../../routes/userRoutes');
const authRoutes = require('../../routes/auth');
const config = require('../../config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const upload = require('../../multerConfig'); // Import Multer configuration
const bodyParser = require('body-parser');
const app = express();
const connectToDatabase = require('../../config/db'); // Import the database connection function
const cors = require('cors');

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Use the upload routes
app.use(uploadRoutes);

// Use the file routes
app.use(fileRoutes);
app.use(upload.single('file'));
app.use(userRoutes);
app.use('/auth', authRoutes);
// MongoDB URI
const mongoURI = config.mongoURI;

// Call the function to establish MongoDB connection
connectToDatabase(mongoURI);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
