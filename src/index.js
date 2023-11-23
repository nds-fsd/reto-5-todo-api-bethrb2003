const express = require('express');
const app = express();
const todoRouter = require('./routers/todo');
const { networkInterfaces } = require('os');

app.use(express.json());

app.use(todoRouter);

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
})

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
});


