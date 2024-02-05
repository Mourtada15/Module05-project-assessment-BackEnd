import mongoose from "mongoose"
import Product from "../models/productModel.js"

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products)
}

export const getProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product!' })
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: 'No such product!' })
  }

  res.status(200).json({ product })
}

export const createProduct = async (req, res) => {
  const { title, price, description } = req.body;
  const image = req.file;

  // add doc to db
  try {
    const product = await Product.create({ title, price, description, image })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product!' })
  }

  const product = await Product.findOneAndDelete({ _id: id })

  if (!product) {
    return res.status(404).json({ error: 'No such product!' })
  }

  res.status(200).json(product)
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const image = req.file

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product!' })
  }

  const product = await Product.findOneAndUpdate({ _id: id }, {
    ...req.body, image: image.path
  })

  if (!product) {
    return res.status(404).json({ error: 'No such product!' })
  }

  res.status(200).json(product)
}