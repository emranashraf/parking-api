const   mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Company = require('../../models/company'),
	Common = require('../../models/common');


class CompanyRespository {

    getCompanies(callback) {
        console.log('*** CompanyRepository.getCompanies');
		Company.count((err, companyCount) => {
			var count = companyCount;
			console.log(`Companies count:' ${count}`);
			
			// -password mean don't load this property
			Company.find({}, (err, companies) => {
				if(err) {
					console.log(`*** CompanyRepository.getCompanies error:  ${err}`);
					return callback(err);
				}
				callback(null, {
					count: count,
					companies: companies
				});
            });
		});
    }

    insertCompany(req, callback) {
		console.log('*** CompanyRepository.insertCompany');
		var body = req.body;

        var company = new Company({
            name: body.name,
            email: body.email,
			airport: { name: body.airport },
			endOffTime: body.endOffTime,
			mileageDescr: body.mileageDescr,
			valetingRate: body.valetingRate,
			mValetingRate: body.mValetingRate,
			oValetingRate: body.oValetingRate,
			rating: body.rating,
			ratingPer: body.ratingPer,
			comission: body.comission,
			shortNoticeHours: body.shortNoticeHours,
			editShortNoticeHours: body.editShortNoticeHours,
			cancelShortNoticeHours: body.cancelShortNoticeHours,
			phone: body.phone,
			companyType: { type: body.companyType },
			offerType: { type: body.offerType },
			shortDescr: body.shortDescr,
			terms: body.terms,
			companyInfo: body.companyInfo,
			procedure: body.procedure,
			companyLogo: req.file.path,
			seq: body.seq,
			hrPatrols: body.hrPatrols,
			cctv: body.cctv,
			fencing: body.fencing,
			keepYourKeys: body.keepYourKeys,
			securityLightning: body.securityLightning,
			patrolled: body.patrolled,
			parkMark: body.parkMark,
			disabilityFriendly: body.disabilityFriendly,
			bpaMember: body.bpaMember,
			buyWithConfidence: body.buyWithConfidence,
			active: body.active
        });        

		company.save((err, company) => {
			if(err) {
				console.log(`*** CompanyRepository.insertCompany error: ${err}`);
				return callback(err, null);
			}
			callback(null, company);
		});        
	}
}

module.exports = new CompanyRespository();