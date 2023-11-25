import {formidable, File} from "formidable";
import { NextApiRequest } from "next";
import fs from 'fs';

export class FileUtils{
    static parseRequestFile(req: NextApiRequest): Buffer | null{
        const form = formidable();
        let imageData = null;
        form.parse(req, (err, fields, files) => {
            if(err) {
                throw err
            };
    
            imageData = fs.readFileSync((files.file as File[])[0].filepath);
        });
        return imageData;
    }
}