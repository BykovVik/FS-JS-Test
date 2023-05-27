import { Router } from 'express';
import { Request, Response } from 'express';
import { User, IUser } from '../models/user';

const routes = Router();

routes.get('/api/users', async (req: Request, res: Response) => {
    return res.send(await User.find({}));
});
routes.post('/api/users', async (req: Request, res: Response) => {
    const users = await User.find({})
    const id = users.length + 1;
    const {name, email, password, date, gender, avatar} = req.body

    const user = new User<IUser>({
        name, 
        email, 
        password, 
        date, 
        gender,
        avatar
    })
    await user.save()
})

export default routes;