// add middlewares here related to actions
const Actions = require("./actions-model.js")


async function validateActionId (req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({message: 'action not found' })
        }
        else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action',
        })
    }
}

async function validateAction (req, res, next) {
    const { description } = req.body
    if(!description) {
        res.status(400).json({
            message: "missing description field"
        })
    } else {
        req.description = description
        next()
    }
}

async function validatePost (req, res, next) {
    const { description, project_id, notes } = req.body
    if(!description || !project_id || !notes) {
        res.status(400).json({
            message: "missing fields"
        })
    } else {
        req.description = description
        req.post = {description, project_id, notes}
        next()
    }
}


module.exports = {
    validateActionId,
    validateAction,
    validatePost
}