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

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        const action = await req.action
        res.status(200).json(action)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', validatePost, (req, res, next) => {
    Action.insert( req.post )
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Action.update(req.params.id, { description: req.description })
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(err => {
        res.json(err)
    })
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