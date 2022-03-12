const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    //para recojer el request de forma dinamica segun se mande (body,params,query);
    const data = req[property];
    const { error } = schema.validate(data,{abortEarly: false});//Configuracion para que Joi mande todos los errores seguidos
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
