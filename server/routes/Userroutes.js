const express = require('express')
const usercontroller = require('../controller/Usercontroller')
const upload = require('../config/multer')
const router = express.Router()

router.get('/Somnath',(req,res)=>{
    return res.status(200).json({"message":"Here is the Home Route "})
})
router.post('/register',usercontroller.Register);
router.post('/login',usercontroller.Login);
router.post('/upload', upload.single('csvfile'),usercontroller.DataUploader);
router.post('/getsalesdata/:id' , usercontroller.getSalesdata);
router.post('/getInvestmentAssistance' , usercontroller.getInvestmentAssistance);
router.post('/GetFinanceAssistant', usercontroller.getFinancialQueries);
router.post('/calculateTax',usercontroller.getTaxRate);
router.post('/Salesdata',usercontroller.UserSalesdata)
module.exports = router;