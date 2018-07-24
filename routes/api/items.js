const express = require('express');
const router = express.Router();

// item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    get all Items
// @access  public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))

});

// @route   POST api/items
// @desc    create an Item
// @access  public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name         //body-parser allows this
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    delete an Item
// @access  public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success: true }))
        ).catch(err => res.status(404).json({ success: false }));
});

module.exports = router;