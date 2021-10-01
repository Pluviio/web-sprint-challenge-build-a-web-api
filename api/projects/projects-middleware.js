// add middlewares here related to projects
const Projects = require("./projects-router")

async function validateProjectId (req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if(project) {
            next({ status: 404, message: 'project not found'})
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

async function validatePost (req, res, next) {
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

module.exports = {
    validateProjectId,
    validatePost
}