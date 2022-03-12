const express = require('express');
const router = express.Router();

const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('./../schemas/user.schema');

const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const users = await service.findOne(id);
    res.json(users);
  });

router.get('/limit',
  validatorHandler(getUserSchema, 'query'),
  async (req, res) => {
    const { limit, offset } = req.query;
    const limited = await service.limited(limit, offset);
    res.json(limited);
  });



router.post("/",
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  })

router.put("/:id",
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json({ message: "dato modificado", ...user });
  })

router.patch("/:id",
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  })

router.delete("/:id",
  validatorHandler(deleteUserSchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const ruta = service.delete(id);
    res.json(ruta);
  })

module.exports = router;

//   router.get('/:usuarioId/productos/:productosId',(req,res)=>{
//   const {usuarioId,productosId} = req.params;
//   res.json(
//     {
//       usuarioId,
//       productosId,
//     }
//   )
// });
