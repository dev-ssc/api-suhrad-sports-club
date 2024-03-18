// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const upload = require('./multerConfig'); 
const connectToDatabase = require('./config/db');
const config = require('./config/config');
const uploadRoutes = require('./routes/uploadRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const excelRoutes = require('./routes/excelRoutes');
const authRoutes = require('./routes/auth');

const app = express();

// Initialize Swagger JSdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: config.swaggerDefinition,
  apis: config.apiPaths,
});

// Enable CORS and parse JSON & URL-encoded bodies
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Serve Swagger UI and set Access-Control-Allow-Origin header for all routes
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec), (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the upload routes, including multer middleware
app.use('/api', uploadRoutes, fileRoutes, userRoutes, upload.single('file'), authRoutes,excelRoutes); 

// MongoDB URI
const mongoURI = config.mongoURI;

// Call the function to establish MongoDB connection
connectToDatabase(mongoURI);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
