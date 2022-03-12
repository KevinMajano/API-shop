const express = require('express');

const CategoriesService = require('./../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/',(req,res)=>{
  const categories = service.find();
  res.json(categories);
})

// router.get('/:categoryId/productos/:productId',(req,res)=>{
//   const {categoryId,productId } = req.params;
//   res.json(
//     {
//       categoryId,
//       productId,
//     }
//   )
// })

router.post("/",(req,res)=>{
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
})

router.put("/:id",(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = service.update(id,body);
  res.json({message: "dato modificado",...category});
})

router.patch("/:id",(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = service.update(id,body);
  res.json(category);
})

router.delete("/:id",(req,res)=>{
  const {id} = req.params;
  const ruta = service.delete(id);
  res.json(ruta);
})

module.exports = router;
