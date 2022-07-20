import apiRegister from '../fixtures/apiRegister.json'
import orderDetail from '../fixtures/orderDetail.json'
import updateDetail from '../fixtures/updatedClient.json';
let accessToken = '5d136abe7d6dd2922da143b16ecfc8b6393b7ed3fed55b3b61adacfd715d14eb'
const checkApiStatus = () =>{
    cy.request('/status').as('api')
    cy.get('@api').its('status').should('eq',200)
}
// const registerAPI = () =>{
//     cy.request('POST', '/api-clients', apiRegister)
// }
const orderTheBook = () =>{
    let newRequest = cy.requestWithAuthorization('POST', '/orders', /*bookId*/ accessToken, orderDetail)
        .then((newRequest) =>{        
            let newOrder = cy.requestWithAuthorization('GET', '/orders/' + newRequest.body.orderId , accessToken, orderDetail)
            let updateOrder = cy.requestWithAuthorization('PATCH', '/orders/' + newRequest.body.orderId, accessToken, updateDetail)
            let updatedOrder = cy.requestWithAuthorization('GET', '/orders/' + newRequest.body.orderId , accessToken, orderDetail)
            let deleteOrder = cy.requestWithAuthorization('DELETE', '/orders/' + newRequest.body.orderId, accessToken, updateDetail)
            let deletedOrder = cy.requestWithAuthorization('GET', '/orders/' + newRequest.body.orderId , accessToken, orderDetail, false)
            .then((deletedOrder) =>{
                expect(deletedOrder.status).to.eq(404)
                expect(deletedOrder.body.error).to.eq('No order with id ' + newRequest.body.orderId + '.')
            })
        })
}
module.exports ={
    checkApiStatus,
    orderTheBook,
    // registerAPI
}
