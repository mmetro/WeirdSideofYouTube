// load the subrouters
module.exports = function (app) {
  app.use('/', require('./routes/root'));
  app.use('/api', require('./routes/api'));
  app.use('/admin', require('./routes/admin'));
};
