const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const orderHelper = require('./helpers/orders')

let orders = []

const file_path = (process.argv.length == 3) ? process.argv[2] : ''
if (!file_path) {
    return console.log(`file path is required`)
}

function processRow(order) {
    orders.push({
        boutique_id: order.boutique_id,
        order_id: order.order_id,
        total_order_price: order.total_order_price
    })
}

function fileError(error) {
    console.log('Error:', error.message)    
}

function fileProcessed() {
    const orderBatch = orderHelper.processCSV(orders)
   
    console.log(`OrderBatch ${ path.basename(file_path) }`)
    orderBatch.forEach((order) => {
        console.log(`${ order.boutique_id },${ order.commission }`)
    })    
}

if (!fs.existsSync(file_path)) {
    return console.log('file not found')    
} 

fs.createReadStream(file_path)  
      .pipe(csv(['boutique_id', 'order_id', 'total_order_price']))
      .on('data', processRow)
      .on('end', fileProcessed)
      .on('error', fileError)
