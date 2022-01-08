// Import our Controllers
const itemController = require('../controllers/itemController')

const routes = [
  {
    method: 'GET',
    url: '/',
    handler: itemController.view,
  },
  {
    method: 'GET',
    url: '/create',
    handler: itemController.view_create,
  },
  {
    method: 'GET',
    url: '/edit',
    handler: itemController.view_edit,
  },
  {
    method: 'GET',
    url: '/delete',
    handler: itemController.view_delete,
  },
  {
    method: 'GET',
    url: '/api/items',
    handler: itemController.getItems,
  },
  {
    method: 'GET',
    url: '/api/items/:group',
    handler: itemController.getGroupwiseItems,
  },
  {
    method: 'GET',
    url: '/api/groupeditems',
    handler: itemController.getAllItemsGroupwise,
  },
  {
    method: 'POST',
    url: '/api/items',
    handler: itemController.createItem,
  },
  {
    method: 'PUT',
    url: '/api/items/:id',
    handler: itemController.updateItem,
  },
  {
    method: 'DELETE',
    url: '/api/items/:id',
    handler: itemController.deleteItem,
  }
]

module.exports = routes
