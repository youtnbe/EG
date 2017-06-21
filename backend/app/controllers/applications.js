var app = (require('express').Router)();
var Application = require('./../models').Application;
var Employee = require('./../models').Employee;

app.post('/applications', (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'Тело запроса пусто!'
        });
    }

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


app.put('/applications', (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'Тело запроса пусто!'
        });
    }

    var body = req.body;
    var customer = req.body.customer;
    var task = req.body.task;

    var application = {
        task: {
            name: task.name,
            description: task.description,
            date: new Date(task.date.year, task.date.month - 1, task.date.day, task.time.split(':')[0], task.time.split(':')[1]),
            address: task.address || ''
        },
        customer: {
            fio: customer.fio,
            email: customer.email,
            telephone: customer.telephone
        },
        workman: body.workman,
        status: body.status,
        comment: body.comment

    };

    Application.findByIdAndUpdate(body._id, application, (err, app) => {
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
            message: 'Заявка сохранена!'
        });
    });
});


app.get("/applications", (req, res) => {

    var page = req.query.page ? (+req.query.page - 1) : 0;
    var pageSize = req.query.pageSize ? +req.query.pageSize : 0;
    var sort = '-date_create';
    if (req.query.sortKey) {
        sort = req.query.sortKey;
        if (req.query.order) {
            sort = (req.query.order < 0 ? '-' : '') + sort;
        }
    }
    var filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    if (filter['search']) {
        var searchRegExp = new RegExp(filter['search'], 'i');
        var queryArray = [];

        for (var property in Application.schema.paths) {
            if (Application.schema.paths.hasOwnProperty(property) && Application.schema.paths[property]["instance"] === "String") {
                var s = {};
                s[property] = searchRegExp;
                queryArray.push(s);
            }
        }

        filter.$or = queryArray;
    }
    delete filter['search'];

    if (filter['workman.id'] == -1) {
        delete filter['workman.id'];
    }

    console.log(filter);

    Application.count(filter, (err, count) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.'
            });
        }
        console.log(page);
        console.log(pageSize);
        Application.find(filter).sort(sort).skip(page * pageSize).limit(pageSize).find({}, (err, docs) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Ошибка сервера.'
                });
            }
            res.status(200).json({
                data: docs,
                length: count
            });
        });
    });
});

app.get("/applications/:id", (req, res) => {
    var id = req.params.id;
    Application.findById(id, (err, doc) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.',
                error: err
            });
        }
        res.status(200).json({
            data: doc,
            length: 1
        });
    });
});

app.delete("/applications", (req, res) => {
    Application.remove({}, (err, docs) => {
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

app.delete("/applications/:id", (req, res) => {
    var id = req.params.id;
    Application.remove({_id: id}, (err, docs) => {
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