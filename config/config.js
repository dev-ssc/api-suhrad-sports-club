module.exports = {
    siteUrl: 'https://your-sharepoint-site-url',
    username: 'your-username',
    password: 'your-password',
    libraryName: 'Documents',
    port: 3000, // Or read from environment variable if set
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'API documentation generated with Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
    },
    apiPaths: ['./routes/*.js'],
  };