import { getTodosPosts } from "../models/postModels.js";

export async function listarPosts(req,res){
    const posts =  await getTodosPosts();
    res.status(200).json(posts);
  }
    