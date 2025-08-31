const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lead name is required'],
    },
    source: {
        type: String,
        required: [true, 'Lead source is required'],
        enum: ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'],
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesAgent',  // Reference to SalesAgent model
        required: [true, 'Sales Agent is required'],
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'],
        default: 'New',
    },
    tags: {
        type: [String],
    },
    timeToClose: {
        type: Number,
        required: [true, 'Time to Close is required'],
        min: [1, 'Time to Close must be a positive number'],
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
},
{
    timestamps: true,
},
);


const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
