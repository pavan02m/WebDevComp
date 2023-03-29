import Post from "../models/Post.js"

export const createPost = async (req,res) => {
    try {
        const newPost = new Post({
            title : req.body.title,
            content : req.body.content,
            img : req.body.img,
            like : req.body.like,
            userId : req.body.userId
        });
        await newPost.save();
        res.status(200).json({success : true, newPost});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}
export const getAllPosts = async (req,res) =>{ 
    try {
        let posts = await Post.find({userId : req.params.userId});
        res.status(200).json({success : true, posts});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
};

export const getPost = async (req,res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try {
        let post = await Post.find({userId: userId, _id:postId});
        res.status(200).json({success: true, postData:post});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}

export const updatePost = async (req,res) => {
    const postId = req.params.id;
    try {
        let updatedPost = await Post.findByIdAndUpdate(postId,{$set:req.body},{new:true});
        res.status(200).json({success: true,postData:updatedPost});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}

export const deletePost = async (req,res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({satus: true, message : "post deleted successfully"});
    } catch (error) {
        res.status(400).send({success: false, message:error});
    }
}