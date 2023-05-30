import { Router } from 'express';
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import storage from './storage_route';

const routes = Router();
  
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


//Auth endpoints POST
routes.post('/api/registration', upload.single('avatar'), async (req: Request, res: Response) => {

    const {name, email, password, date, gender, token} = req.body
    const avatar = req.file.path;
    const user = new User<IUser>({name, email, password, date, gender, avatar, token})
    await user.save()
    
})

routes.post('/api/auth', async (req: Request, res: Response) => {

    const {email, password} = req.body
    const token = jwt.sign({email, password}, 'secret')
    const user = await User.findOneAndUpdate({'email': email}, {'token': token}, {new: true})
    res.json({ token });
})


//Users endpoints UPDATE
routes.post('/api/upload', (req: Request, res: Response) => {
    console.log(req.file); 
    res.send('file uploaded successfully');
});

export default routes;