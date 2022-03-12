const faker = require('faker');

class UserService {
  constructor() {
    this.users = [];
  }
  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }
  find() {
    return this.users;
  }
  findOne(id) {
    return this.users.find(item => item.id === id);
  }
  update(id,changes) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('User not found');
    }
    const user =  this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }
  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
    }
    this.users.splice(index,1);
    return {id};
  }

  limited(limit,offset){
    if(!(limit && offset)){
      throw new Error('not params');
    }
    return {limit,offset}
  }
}

module.exports = UserService;
