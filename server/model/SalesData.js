const mongoose = require('mongoose');
const User = require('./User')
const salesDataSchema = new mongoose.Schema({
    salesData: [{
        orderId: {
            type: String,
        },
        
        product: {
            type: String
        },
        quantityOrdered: {
            type: Number,
            required: true
        },
        priceEach: {
            type: Number,
            required: true
        },
        Margin: {
            type: Number,
            required: true
        }
    }],
    totalRevenue: {
        type: Number,
        required: true,
        default: 0
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0
    },
    profit: {
        type: Number,
        required: true,
        default: 0
    },
    loss: {
        type: Number,
        required: true,
        default: 0
    },
    marginPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    FileName:{
        type:String,
        required:true,
    },
    uniqueProductPrices: {
        type: Map,   // Use a Map to store unique products and their details (price and count)
        of: new mongoose.Schema({
            price: Number,
            count: Number
        })
    },
    Users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
       },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Method to calculate total revenue, total cost, profit, loss, and margin percentage
salesDataSchema.methods.calculateFinancials = function () {
    let totalRevenue = 0;
    let totalCost = 0;
    const uniqueProductDetails = new Map();

    this.salesData.forEach(item => {
        const revenue = item.priceEach * item.quantityOrdered;
        const cost = item.quantityOrdered * (item.priceEach - item.Margin);

        totalRevenue += revenue;
        totalCost += cost;


        if (uniqueProductDetails.has(item.product)) {
            const productDetail = uniqueProductDetails.get(item.product);
            productDetail.count += item.quantityOrdered; 
        } else {
            uniqueProductDetails.set(item.product, {
                price: item.priceEach,
                count: item.quantityOrdered
            });
        }
    });

    const profit = totalRevenue - totalCost;
    const loss = profit < 0 ? -profit : 0;
    const marginPercentage = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(2) : 0;

    this.totalRevenue = totalRevenue;
    this.totalCost = totalCost;
    this.profit = profit;
    this.loss = loss;
    this.marginPercentage = marginPercentage;
    this.uniqueProductPrices = Object.fromEntries(uniqueProductDetails);
};

salesDataSchema.pre('save', function (next) {
    this.calculateFinancials();
    next();
});

module.exports = mongoose.model('SalesData', salesDataSchema);