const express = require('express');
const config = require('./config');

require('./database/mongoose');

const userRoutes = require('./core/routes/user.routes');
const missionRoutes = require('./core/routes/mission.routes');
const projectRoutes = require('./core/routes/project.routes');

const bodyParser = require('body-parser');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
app.use(bodyParser.json());


app.use('/users', userRoutes);
app.use('/missions', missionRoutes);
app.use('/projects', projectRoutes);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

module.exports = server
