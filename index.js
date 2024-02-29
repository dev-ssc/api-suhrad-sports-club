// app.js
const express = require('express');
const uploadRoutes = require('./routes/uploadRoutes');
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/auth');
const config = require('./config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const upload = require('./multerConfig'); // Import Multer configuration

const app = express();

// Initialize Swagger JSdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: config.swaggerDefinition,
  apis: config.apiPaths,
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the upload routes
app.use(uploadRoutes);

// Use the file routes
app.use(fileRoutes);
app.use(upload.single('file'));

app.use('/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
