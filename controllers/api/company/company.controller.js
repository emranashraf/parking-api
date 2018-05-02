const   companyRepo     = require('../../../lib/repositories/companyRepository'),
        util            = require('util'),
        verifyToken     = require('../../../lib/veriyToken'),
        multer          = require('multer'),
        uploadConfig    = require('../../../lib/configLoader').uploadConfig;

class CompanyController {

    constructor(router) {
        
        // set destination and uploaded file name 
		const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, './' + uploadConfig.uploadFolder + '/');
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname);
            }
		});
        
        // set file size limit
		const upload = multer({ storage: storage, limits: {
			fileSize: 1024  * 1024 * 5 // 5MB file size limit
		}});

        router.get('/', verifyToken, this.getCompanies.bind(this));
        router.post('/', [verifyToken, upload.single('companyLogo')], this.insertCompany.bind(this));
    }

    // get list of companies
    getCompanies(req, res) {
        console.log('**** getCompanies');        
        companyRepo.getCompanies((err, data) => {
            if(err) {
                console.log('*** getCompanies error:' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCompanies ok');
                res.json(data.companies);
            }
        });
    } 

    // insert new company
    insertCompany(req, res) {
        console.log('*** insertCompany');
        console.log(req.body);
        console.log(req.file);
        companyRepo.insertCompany(req, (err, company) => {
            if(err) {
                console.log('*** insertCompany error:' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', company: null});
            }
            else {
                console.log('*** insertCompany ok');
                res.json({ status: true, error: null, company: company });
            }
        });
    }
}

module.exports = CompanyController;