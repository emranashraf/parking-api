const   mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TerminalSchema = new Schema({
    name: { type: String, required: true, trim: true }
});
var Terminal = mongoose.model('Terminal', TerminalSchema, 'terminals');

const AirportSchema = new Schema({
    name:       { type: String, required: true, trim: true },
    terminals:  { type: TerminalSchema  }
});
var Airport = mongoose.model('Airport', AirportSchema, 'airports');

const CompanyTypeSchema = new Schema({
    name: { type: String }
});
var CompanyType = mongoose.model('CompanyType', CompanyTypeSchema, 'companyTypes');


const OfferTypeSchema = new Schema({
    name: { type: String }
});
var OfferType = mongoose.model('OfferType', OfferTypeSchema, 'offerTypes');


module.exports = {
    Airport: Airport,
    Terminal: Terminal,
    CompanyType: CompanyType,
    OfferType: OfferType
};