const router = require('express').Router();
const Note = require('../models/Note');

router.post('/add', async(req, res) => {
    const note = new Note({
        username: req.body.username,
        note: req.body.note
    });

    try {
        const savedNote = await note.save();
        res.json({
            error: null,
            data: savedNote,
            user: req.user
        })
    } catch (error) {
        res.status(400).json({error})
    }
})
router.post('/findAll', async(req, res) => {
    try {
        const allNotes = await Note.find({"username":req.body.username});
        res.json({
            error: null,
            data: allNotes
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

router.get('/findOne', async(req, res) => {
    try {
        const findOneNotes = await Note.findOne(req.params);
        res.json({
            error: null,
            data: findOneNotes
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

router.delete('/deleteNota/:id', async(req, res) => {
    const id = req.params.id
    try {
        const deleteNote = await Note.findOneAndDelete({ _id: id });
        res.json({
            error: null,
            data: deleteNote
        })
    } catch (error) {
        res.status(400).json({error})
    }
})
router.put('/update', async(req, res) => {
    try {
        const updateNote =  await Note.findOneAndUpdate(req.body);
        res.json({
            error: null,
            data: updateNote
        })
    } catch (error) {
        res.status(400).json({error})
    }

})

module.exports = router
