module.exports = {
    username: 'developer@suhradsportsclub.ca',
    mongoURI: `mongodb://suhradsportsclub-server:Az5lOGVoHoNJJvGtobPclTu8FZUzX9IybTJHfJ6mbfW83kAZwkfFIUkIE6BpL83sxpT58Q5JVSSWACDbpYo8Jw==@suhradsportsclub-server.mongo.cosmos.azure.com:10255/suhradsportsclub-db?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@suhradsportsclub-server@`,
    driveId:'b!kBzzB53bfk-vOGF7Laht6pFTAj6axXpFg-JDdGXypiZ9JHWWiA6ETLSEjsC-q6Zg',
    siteUrl: 'https://your-sharepoint-site-url',
    password: 'your-password',
    libraryName: 'Documents',
    port: 8888, // Or read from environment variable if set
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'API documentation generated with Swagger',
      },
      servers: [
        {
          url: 'http://localhost:8888',
          description: 'Local server',
        },
      ],
    },
    apiPaths: ['./routes/*.js'],
    apiPathsNetify: ['../../routes/*.js'],
  };