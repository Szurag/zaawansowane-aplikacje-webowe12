const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const routesPath = path.join(__dirname);

  fs.readdirSync(routesPath).forEach((file) => {
    if (file === 'index.js') return;

    const routePath = path.join(routesPath, file);
    const route = require(routePath);

    app.use(route);
  });
};
