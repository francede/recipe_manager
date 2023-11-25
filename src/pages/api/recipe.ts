import {formidable, File} from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import RecipeService from "@/services/recipeService";

export const config = {
  api: {
      bodyParser: false,
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    if(req.method === "POST"){
      POST(req, res);
    }
    if(req.method === "GET"){
      GET(req, res);
    }
  })
}

async function GET(req: NextApiRequest, res: NextApiResponse){
  return new Promise<void>((resolve, reject) => {
    res.status(200).json({ name: 'John Doe' });
    resolve();
  });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    const form = formidable();
    form.parse(req, (err, fields, files) => {
      if(err){
        res.status(500).json({ error: err });
        reject();
      }

      const imageData = fs.readFileSync((files.file as File[])[0].filepath);

      //RecipeService.addRecipe()

      res.status(201).json({message: "Upload success"});
      resolve();
    });
  })
}