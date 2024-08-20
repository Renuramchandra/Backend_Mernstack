
const Firm = require('../models/Firm');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, 'uploads/');  // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname (file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res)=>{
   
    try{
        const {firmName, area, category, region, offer} = req.body;

        const image = req.file? req.file.filename: undefined;
    
        const user = await User.findById(req.userId);
        if(!user){
            res.status(404).json({message: "User not found"})
        }
    
        const firm = new Firm({
            firmName, 
            area, 
            category, 
            region, 
            offer, 
            image, 
            user: user._id
        })
    
         const savedFirm  =   await firm.save();

         user.firm.push(savedFirm)

         await user.save()

        return res.status(200).json({message: 'Firm Added Sucessfully' })
    }catch(error) {
        console.error(error)
        res.status(500).json("Internal server error")
    }
}
 // delete routes //

const deleteFirmById = async(req,res)=>{
    try{
        const  firmId = req.params.firmId;
        
        const  deletedProduct = await Firm.findByIdAndDelete(firmId);

        if(!deletedProduct) {
            return res.status(404).json({error: "No product found"})
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById};