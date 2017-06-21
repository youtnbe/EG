var app = (require('express').Router)();
var Role = require('./../models').Role;

app.get("/roles", (req, res) => {

    Role.find({}, (err, docs) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.'
            });
        }
        res.status(200).send(docs);
    });
});

app.get("/roles/:id", (req, res) => {
    var id = req.params.id;
    Role.find({id: id}, (err, doc) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.',
                error: err
            });
        }
        res.status(200).send(doc[0]);
    });
});

app.delete("/roles", (req, res) => {
    Role.remove({}, (err, docs) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Заявки успешно удалены!'
        });
    });
});

app.delete("/roles/:id", (req, res) => {
    var id = req.params.id;
    Role.remove({id: id}, (err, docs) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Заявка успешно удалена!'
        });
    });
});

module.exports = app;