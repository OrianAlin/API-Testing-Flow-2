/// <reference types = "cypress" />
import api from '../Functions/orderFunctions'

describe('Order', () => {
  it('Order a new Book', () => {
    api.checkApiStatus()
    // api.registerAPI()
    api.orderTheBook()
  })
})