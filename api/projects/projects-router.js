// Write your "projects" router here!
const express = require('express')

const {
    validateProjectId,
    validateProject,
    validatePost
} = require ('./projects-middleware.js')

const Project = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        const project = await req.project
        res.status(200).json(project)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', validatePost, (req, res, next) => {
    Project.insert( req.post )
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Project.update(req.params.id, { description: req.description })
    .then(() => {
        return Project.get(req.params.id)
    })
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.json(err)
    })
})

router.delete('/:id', validateProjectId, async(req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next()
    }
})

router.get('/:id/actions', validateProjectId, async(req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        res.status(200).json(actions)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;