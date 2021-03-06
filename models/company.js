const   mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    
const CompanySchema = new Schema({
    name:                       { type: String, required: true, trim: true },
    email:                      { type: String, required: true, trim: true },
    airport:                    Schema.Types.Mixed,
    startOffTime:               { type: String, trim: true },
    endOffTime:                 { type: String, trim: true },
    mileageDescr:               { type: String, trim: true },
    valetingRate:               { type: Number, trim: true },
    mValetingRate:              { type: Boolean, trim: true },
    oValetingRate:              { type: Boolean, trim: true },
    rating:                     { type: Boolean, trim: true },
    ratingPer:                  { type: Boolean, trim: true },
    comission:                  { type: Boolean, trim: true },
    shortNoticeHours:           { type: Boolean, trim: true },
    editShortNoticeHours:       { type: Boolean, trim: true },
    cancelShortNoticeHours:     { type: Boolean, trim: true },
    phone:                      { type: String, trim: true },
    companyType:                Schema.Types.Mixed,
    offerType:                  Schema.Types.Mixed,
    shortDescr:                 { type: String, trim: true },
    terms:                      { type: String, trim: true },
    companyInfo:                { type: String, trim: true },
    procedure:                  { type: String, trim: true },
    companyLogo:                { type: String },
    seq:                        { type: String, trim: true },
    hrPatrols:                  { type: Boolean, trim: true },
    cctv:                       { type: Boolean, trim: true },
    fencing:                    { type: Boolean, trim: true },
    keepYourKeys:               { type: Boolean, trim: true },
    securityLightning:          { type: Boolean, trim: true },
    patrolled:                  { type: Boolean, trim: true },
    parkMark:                   { type: Boolean, trim: true },
    disabilityFriendly:         { type: Boolean, trim: true },
    bpaMember:                  { type: Boolean, trim: true },
    buyWithConfidence:          { type: Boolean, trim: true },
    active:                     { type: Boolean, trim: true },
});

module.exports = mongoose.model('Company', CompanySchema, 'companies');
