var app = (require('express').Router)();

//publick
app.use(require('./applicationsPublic'));

//auth
app.use(require('./auth'));
app.use(require('./authCheck'));

//private
app.use(require('./applications'));
app.use(require('./employees'));

module.exports = app;