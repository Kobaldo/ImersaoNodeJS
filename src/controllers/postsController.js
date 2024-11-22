import { getTodosPosts, criarPost, atualizarPost } from "../models/postModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req,res){
    const posts =  await getTodosPosts();
    res.status(200).json(posts);
  }

  export async function postarNovo(req,res){
    const novoPost =  req.body;
    try{
      const postCriado = await criarPost(novoPost);
      res.status(200).json(postCriado);
    } catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }

  export async function uploadImagem(req,res){
    const novoPost =  {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
    };
    try{
      const postCriado = await criarPost(novoPost);
      const imgAtualizada = `uploads/${postCriado.insertedId}.jpg`
      fs.renameSync(req.file.path, imgAtualizada);
      res.status(200).json(postCriado);
    } catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }
   
  export async function atualizaNovoPost(req,res){
    const id =  req.params.id;
    const urlImg = `http://localhost:3000/${id}.jpg`;

    try{
      const imageBuffer = fs.readFileSync(`uploads/${id}.jpg`)
      const descricao = await gerarDescricaoComGemini(imageBuffer)
      const post = {
        imgUrl: urlImg,
        descricao: descricao,
        alt: req.body.alt
      }
      const postCriado = await atualizarPost(id, post);
      res.status(200).json(postCriado);
    } catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }