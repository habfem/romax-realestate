import Property from "../models/Property.js";
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const propertyController = express.Router();

// get all
propertyController.get('/getAll', async (req, res) => {
  try {
    const properties = await Property.find({})

    return res.status(200).json(properties)
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
});

// get featured
propertyController.get('/find/featured', async (req, res) => {
  try {
    const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password')
    return res.status(200).json(featuredProperties)
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// get all from specific type
propertyController.get('/find', async (req, res) => {
  const type = req.query
  //let properties = []
  try {
    if (type) {
      const properties = await Property.find(type).populate("currentOwner", '-password')
      return res.status(200).json(properties)
    }
    else {
      return res.status(500).json({ msg: "No such type" })
    }
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// TODO FETCH TYPE OF PROPERTIES. EX: {BEACH: 34, MOUNTAIN: 23}
propertyController.get('/find/types', async (req, res) => {
  try {
    const beachType = await Property.countDocuments({ type: 'beach' })
    const mountainType = await Property.countDocuments({ type: 'mountain' })
    const villageType = await Property.countDocuments({ type: 'village' })
    const islandType = await Property.countDocuments({ type: 'island' })

    return res.status(200).json({ beach: beachType, mountain: mountainType, village: villageType, island: islandType })
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// get indivdual property
propertyController.get('/find/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('currentOwner', '-password')

    if (!property) {
      throw new Error('No such property with that id')
    }
    else {
      return res.status(200).json(property)
    }
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// create a property
propertyController.post('/', verifyToken, async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id })

    return res.status(201).json(newProperty)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

// update property
propertyController.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (property.currentOwner.toString() !== req.user.id) {
      throw new Error("You are not allowed to update other people's properties")
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    return res.status(200).json(updatedProperty)
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// delete estate
propertyController.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error("You are not allowed to delete other people properties")
    }
    else {
      await property.deleteOne()
      return res.status(200).json({ msg: "Successfully deleted property" })
    }
  }
  catch (error) {
    return res.status(500).json(error)
  }
})

export { propertyController }