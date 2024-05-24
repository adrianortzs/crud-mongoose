const express = require("express")
const Task = require("../models/tasks")

const router = express.Router()

router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem trying to create the task" })
    }
})

router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem trying to get the tasks" })
    }
})

router.get("/id/:_id", async(req, res) => {
    try {
        const id = req.params._id
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem trying to get the task" })
    }
})

router.put("/markAsCompleted/:_id", async(req, res) => {
    try {
        const id = req.params._id
        const task = await Task.findByIdAndUpdate(id, {completed: true}, {new: true}) //new:true para devolver el documento actualizado
        if (!task) {return res.status(500).send({ message: "Task not found" })}
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem updating the task" })
    }
})

router.put("/id/:_id", async(req, res) => {
    try {
        const id = req.params._id
        const title = req.body.title
        const task = await Task.findById(id)
        if (!task) {return res.status(500).send({ message: "Task not found" })}
        task.title = title
        await task.save()
        res.status(200).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem trying to update the title" })
    }
})

router.delete("/id/:_id", async(req, res) => {
    try {
        const id = req.params._id
        const task = await Task.findByIdAndDelete(id)
        if (!task) {return res.status(500).send({ message: "Task not found" })}
        res.status(200).send({message: "Task deleted"})
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "There was a problem trying to delete the task" })
    }
})

module.exports = router