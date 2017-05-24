var app = new (require('express').Router)();
var jwt = require('jsonwebtoken');
var config = require('./../config');

app.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            //console.log(decoded); проверяем что там с токеном
            if (err) {
                // токен есть но плохой
                return res.status(401).json({
                    success: false,
                    message: 'Ошибка авторизации.'
                });
            } else {
                // все хорошо
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // токена нету
        return res.status(401).send({
            success: false,
            message: 'Пользователь не авторизован.'
        });
    }
});

app.get('/auth/check', function (req, res) {
    res.json({
        success: true
    });
});

module.exports = app;