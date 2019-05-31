const COMMISSION_FEE = 0.1

module.exports.removeHighestOrder = (orders) => {
    const highestOrder = orders.reduce((max, order) => {
        if (order.total_order_price > max.total_order_price) {
            return order
        }
        return max
    })

    return orders.filter((x) => x.order_id != highestOrder.order_id)    
}

module.exports.processCSV = (orders) => {
    
    const payload = this.removeHighestOrder(Object.assign(orders)) 
    
    let boutiques = []
    payload.reduce((res, value) => {
        
        if (!res[value.boutique_id]) {
            res[value.boutique_id] = {
                boutique_id: value.boutique_id,
                total_order_price: 0
            }
            boutiques.push(res[value.boutique_id])
        }
        
        res[value.boutique_id].total_order_price += parseFloat(value.total_order_price)
        res[value.boutique_id].commission = res[value.boutique_id].total_order_price * COMMISSION_FEE
        
        return res
    }, {})

    return boutiques
}