const faker = require('faker');

class CategoriesService {

  constructor(){
    this.categories = [];
  }

  create(data){
    const newCategories = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategories);
    return newCategories;
  }

  find(){
    return this.categories;
  }

  findOne(id){
    return this.categories.find(item => item.id === id);
  }

  update(id,changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Categories not found');
    }
    const category =  this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Categories not found');
    }
    this.categories.splice(index,1);
    return { id };
  }
}

module.exports = CategoriesService;
