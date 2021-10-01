// add middlewares here related to projects
const Projects = require("./projects-router")

async function validateProjectId (req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({ message: 'project not found'})
        }
        else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding action",
        })
    }
}

async function validateProject (req, res, next) {
    const { name } = req.body
    if(!name || !name.trim()) {
        res.status(400).json({
            message: "missing name field"
        })
    } else {
        req.name = name.trim()
        next()
    }
}

async function validatePost (req, res, next) {
    const { description } = req.body
    if(!description || !description.trim()) {
        res.status(400).json({
            message: "missing description field"
        })
    } else {
        req.description = description
        req.post = { description }
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validatePost
}