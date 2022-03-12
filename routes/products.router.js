const express = require('express');
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id', validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post("/", validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newPorduct = await service.create(body);
    res.status(201).json(newPorduct);
  })

router.put("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({ message: "dato modificado", ...product });
  })

router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      //  res.status(404).json({ message: error.message });
      next(error);
    }
  })

router.delete("/:id", validatorHandler(deleteProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const ruta = await service.delete(id);
    res.json(ruta);
  })


module.exports = router;
