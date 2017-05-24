var app = new (require('express').Router)();
var Employee = require('./../models').Employee;
var jwt = require('jsonwebtoken');
var config = require('./../config');

app.post('/auth/login', function (req, res) {
    Employee.findOne({
        username: req.body.username
    }, (err, employee) => {
        if (err)
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера.',
                error: err
            });

        if (!employee) {
            res.status(401).json({success: false, message: 'Сотрудник с данным именем не найден.'});

        } else if (employee) {
            if (employee.password != req.body.password) {
                res.status(401).json({success: false, message: 'Неверный пароль.'});
            } else {
                console.log(config.secret);
                var token = jwt.sign(employee, config.secret, {
                    expiresIn: config.sessionLength // 24 hours
                });

                res.status(200).json({
                    success: true,
                    message: 'Аутентификация выполнена.',
                    token: token,
                    employeeId: employee.id

                });
            }
        }
    });
});

module.exports = app;