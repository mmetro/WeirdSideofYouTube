
module.exports = function (app) {
    app.use('/', require('./routes/root'));
    app.use('/api', require('./routes/api'));
};
