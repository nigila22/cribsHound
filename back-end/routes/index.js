const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const Joi = require('joi');

const schemaCreate = Joi.object({
  id: Joi.string().allow('').optional(),
  image_url: Joi.string().required(),
  location: Joi.string().required(),
  name: Joi.string().required()
});

const schemaUpdate = Joi.object({
    id: Joi.string().required(),
    image_url: Joi.string().required(),
    location: Joi.string().required(),
    name: Joi.string().required()
  });

const myCribs = mongoose.model('myproperties', {
    name: String,
    location: String,
    img: String
});

// Get all cribs
router.get('/cribs', async function (req, res) {
    try {
        const cribs = await myCribs.find();
        res.json({status: true, items:cribs});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false, message: error });
    }
});

// Get particular crib
router.get("/cribs/:id", async function(req, res) {
    const id = req.params['id'];
    try {
        const getCribById = await myCribs.find({_id: new ObjectId(id)});
        res.json({status: true, items:getCribById});
    } catch (error) {
        console.error(error);
        res.json({ status:false, msg: error.message });
    }

});

// Create new crib
router.post('/cribs', async function (req, res) {
    const { error, value } = schemaCreate.validate(req.body.data);
    if (error) {
        res.json({ status:false, msg: error.details });
    } else {
        const newCribData = {
            name: value.name,
            location: value.location,
            img: value.image_url,
          };
          
        const newCrib = new myCribs(newCribData);
          console.log(newCrib);
        try {
            const createCrib = await newCrib.save();
            const cribs = await myCribs.find();
            res.json({status:true, create:createCrib, items:cribs});
          } catch (error) {
            res.json({ status:false, msg: error.message });
          }
    } 
});

// Update crib by id
router.put('/cribs/:id', async function(req, res) {
    const id = req.params['id'];
    const { error, value } = schemaUpdate.validate(req.body.data);
    if (error) {
        res.json({ status:false, msg: error.details });
    } else {

        const updateData = {
            name: value.name,
            location: value.location,
            img: value.image_url,
          };
          
        await myCribs.updateOne({ _id: new ObjectId(id) }, updateData)
        .then(async (result) => {
            if (result.nModified === 0) {
                res.json({ status:false, msg: "Not updated" });
                
            } else {
                const cribs = await myCribs.find();
                res.json({status:true, update:true, items:cribs});
            }
        })
        .catch((error) => {
            res.json({ status:false, msg: error.message });
        });
    }

});


// Delete crib by id
router.delete("/cribs/:id", async function(req, res) {
    const id = req.params['id'];
    try {
        await myCribs.deleteOne({ _id: new ObjectId(id) })
        .then(async (result) => {
            if (result.deletedCount === 1) {
                const cribs = await myCribs.find();
                res.json({status: true, deleted:true, items:cribs});
            } else {
                res.json({status: false, deleted:false, msg: "Not Deleted"});
            }
        })
        .catch((error) => {
            res.json({ status:false, msg: error.message });
        });
        
    } catch (error) {
        console.error(error);
        res.json({ status:false, msg: error.message });
    }
});

module.exports = router;