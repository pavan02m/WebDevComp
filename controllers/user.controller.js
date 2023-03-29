import User from "../models/User.js"

export const getAllUser = async (req,res) =>{ 
    try {
        let users = await User.find();
        res.status(200).json({success : true, users});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
};

export const getUser = async (req,res) => {
    const id = req.params.id;
    try {
        let user = await User.findById(id);
        res.status(200).json({success: true, userdata:user});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}

export const updateUser = async (req,res) => {
    const id = req.params.id;
    try {
        let updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success: true,userdata:updatedUser});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}

export const delteUser = async (req,res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({satus: true, message : "user deleted successfully"});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}