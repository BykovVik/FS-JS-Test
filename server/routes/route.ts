import { Router } from 'express';
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import { StorageEngine } from 'multer';
import multer from 'multer';
import path from 'path'

const routes = Router();

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
  
// Create a Multer instance with my config
const upload = multer({ storage });

//Users endpoints GET
routes.get('/api/users', async (req: Request, res: Response) => {
    return res.send(await User.find({}));
});

routes.get('/api/get-user-by-name', async (req: Request, res: Response) => {
    const name = req.query.name
    return res.send(await User.find({'name': name}));
});

routes.get('/api/get-user-by-email', async (req: Request, res: Response) => {
    const email = req.query.email
    return res.send(await User.find({'email': email}));
});


//Users endpoints POST
routes.post('/api/users', upload.single('avatar'), async (req: Request, res: Response) => {

    const {name, email, password, date, gender} = req.body
    const avatar = req.file.path;
    const user = new User<IUser>({name, email, password, date, gender, avatar})
    await user.save()
    
})

//Users endpoints UPDATE
routes.post('/api/upload', (req: Request, res: Response) => {
    console.log(req.file); 
    res.send('file uploaded successfully');
});

export default routes;