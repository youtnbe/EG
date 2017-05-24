var app = (require('express').Router)();
var Application = require('./../models').Application;

app.post('/public/applications', (req, res) => {

    if (!req.body)
        return res.status(400).json({
            success: false,
            message: 'Тело запроса пусто!'
        });

    var customer = req.body.contact;
    var task = req.body.task;

    var application = new Application({
        task: {
            name: task.name,
            description: task.desc,
            date: new Date(task.date.year, task.date.month - 1, task.date.day, task.time.split(':')[0], task.time.split(':')[1]),
            address: task.adrs || ''
        },
        customer: {
            fio: customer.fio,
            email: customer.email,
            telephone: customer.telephone
        },
        date_create: new Date()
    });

    application.save((err) => {
        if (err) {
            if (err.name = 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Ошибка валидации! Убедитесь что все поля заполнены и повторите попытку.',
                    error: err
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Заявка добавлена в базу!'
        });
    });
});

module.exports = app;