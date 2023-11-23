const express = require('express');

const {tasks} = require('../data/index');

const todoRouter = express.Router();

todoRouter.get('/todo', (req, res) => {
  res.json(tasks)

});

todoRouter.post('/todo', (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(404).send()
  } else {
    const currentIds = tasks.map((task) => task.id);
    const newId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

    const createdTask = { ...body, id: newId };
    tasks.push(createdTask);

    return res.status(201).json({data: createdTask})
  }
});


todoRouter.get('/todo/:id',  (req, res) => {
  const element = tasks.find((task) => {
    return task.id.toString() === req.params.id
  })
    if (!element) {
        return res.status(404).send()
    }
    return res.status(200).json({element})
});

todoRouter.patch('/todo/:id',  (req, res) => {

  const elementIndex = tasks.findIndex((task) => {
    return task.id.toString() === req.params.id
  });

  if (elementIndex === -1) return res.status(404).send()

  tasks.splice(elementIndex, 1);
  const newArray = [...tasks, { ...req.body, id: Number(req.params.id)}]
  return res.json(newArray);
  
});


todoRouter.delete('/todo/:id',  (req, res) => {

  const elementIndex = tasks.findIndex((task) => {
    return task.id.toString() === req.params.id
  });

  if (elementIndex === -1) return res.status(404).send()


  tasks.splice(elementIndex, 1)
  return res.json(tasks)
  
});

module.exports = todoRouter;
