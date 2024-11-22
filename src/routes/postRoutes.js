import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovo, uploadImagem, atualizaNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}
const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({dest: "./uploads", storage});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovo );
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizaNovoPost);
}

export default routes;