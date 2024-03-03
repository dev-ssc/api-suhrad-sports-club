module.exports = {
    mongoURI: 'mongodb+srv://suhrad:3OsdZShmkZHUycRe@cluster0.6kgebr6.mongodb.net/test?retryWrites=true&w=majority',
    driveId:'b!kBzzB53bfk-vOGF7Laht6pFTAj6axXpFg-JDdGXypiZ9JHWWiA6ETLSEjsC-q6Zg',
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
    apiPathsNetify: ['../routes/*.js'],
  };