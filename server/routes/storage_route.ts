import { StorageEngine } from 'multer';
import multer from 'multer';
import path from 'path'
import { Request } from 'express';

//The function creates a filename
const generateFileName = (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname); // get file extension
    const name = path.basename(file.originalname, ext); // get filename without extension
    cb(null, `${name}-${Date.now()}${ext}`); // generate a new unique filename
  };
  
// Config Multer Storage
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // path to the folder where downloaded files will be stored
    },
    filename: generateFileName // call a function to generate a name
});

export default storage