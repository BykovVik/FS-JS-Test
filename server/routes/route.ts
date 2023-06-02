import { Router } from 'express';
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import storage from './storage_route';
import * as fs from 'fs'

const routes = Router();
  
// Create a Multer instance with my config
const upload = multer({ storage });

//Users endpoints GET
routes.get('/api/users', async (req: Request, res: Response) => {
    return res.send(await User.find({}));
});

routes.get('/api/get-user-by-id', async (req: Request, res: Response) => {
    const id = req.query.id
    return res.send(await User.find({'_id': id}));
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

    const {name, email, password, date, gender} = req.body
    const avatar = req.file.path;
    const user = new User<IUser>({name, email, password, date, gender, avatar})
    await user.save()
})

routes.post('/api/edit-user', upload.single('avatar'), async (req: Request, res: Response) => {

    const {id, name, password} = req.body
    const avatar = req.file.path;
    const u = await User.find({_id: id})

    fs.unlink(`./${u[0].avatar}`, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(err);
          res.status(500).send('Ошибка удаления файла');
        } else {
          res.send(`Файл ${u[0].avatar} успешно удален`);
        }
    });
    await User.findOneAndUpdate({_id: id},{name: name, password: password, avatar: avatar}, {new: true})
})

routes.post('/api/auth', async (req: Request, res: Response) => {

    const {email, password} = req.body
    const token = jwt.sign({email, password}, process.env.SECRET_KEY)
    await User.findOneAndUpdate({'email': email}, {'token': token}, {new: true})
    res.json({ token });
})

routes.post('/api/check-auth', async (req: Request, res: Response) => {
    const token = req.body.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.json({decoded})
})

export default routes;