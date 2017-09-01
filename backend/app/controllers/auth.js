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
                const payload = {
                    employeeId: employee.id,
                    username: employee.username,
                    email: employee.email,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    telephone: employee.telephone,
                    telegram: employee.telegram,
                    role: employee.role,
                };
                let token = jwt.sign(payload, config.secret, {
                    expiresIn: config['sessionLength'] // 24 hours
                });

                res.status(200).json({
                    success: true,
                    message: 'Аутентификация выполнена!',
                    token: token,
                    employeeId: employee.id

                });
            }
        }
    });
});

module.exports = app;