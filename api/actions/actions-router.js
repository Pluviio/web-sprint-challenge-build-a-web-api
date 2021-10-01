// Write your "actions" router here!
const express = require('express')

const {
    validateActionId,
    validateAction,
    validatePost
} = require('./actions-middlware.js')

const Action = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(res.action)
})

router.post('/', validatePost, (req, res, next) => {
    Action.insert({ description: req.description })
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, { description: req.description })
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
});

module.exports = router;