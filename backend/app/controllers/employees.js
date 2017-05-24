var app = (require('express').Router)();
var Employee = require('./../models').Employee;

//ОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИОШИБКИ
app.post('/employees', (req, res) => {

    if (!req.body)
        return res.sendStatus(400);

    var employee = new Employee({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telegram: req.body.telegram,
        telephone: req.body.telephone,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    employee.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log("Сотрудник добавлен", employee);
        return res.send(employee);
    });
});

app.get("/employees", (req, res) => {

    console.log(req.query);

    var page = req.query.page ? (+req.query.page - 1) : 0;
    var pageSize = req.query.pageSize ? +req.query.pageSize : 0;
    var sort = 'username';
    if (req.query.sortKey) {
        console.log(req.query.sortKey);
        sort = req.query.sortKey;
        if (req.query.order) {
            console.log(req.query.order);
            sort = (req.query.order < 0 ? '-' : '') + sort;
        }
    }
    var filter = {};
    Employee.count(filter, (err, count) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Ошибка сервера.'
            });
        }
        Employee.find(filter).sort(sort).skip(page * pageSize).limit(pageSize).find({}, (err, docs) => {
            if (err){
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

app.delete("/employees", (req, res) => {
    if (req.query.id) {
        Employee.remove({_id: req.query.id}, (err, docs) => {
            if (err)
                return console.log(err);

            console.log(docs);
            res.send(docs);
        });
    } else {
        Employee.remove({}, (err, docs) => {
            if (err)
                return console.log(err);

            console.log(docs);
            res.send(docs);
        });
    }
});

app.get("/employees/length", (req, res) => {

    Employee.count({}, (err, count) => {
        if (err)
            return console.log(err);
        console.log(count);

        res.send(JSON.stringify({length: count}));
    });
});

module.exports = app;