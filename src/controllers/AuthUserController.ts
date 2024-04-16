import { Request, Response } from 'express'
import { AuthUserService } from '../services/AuthUserServices'

class AuthUserController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({
            email,
            password
        })

        return res.json(auth);
        // vc parou na aula criptografando senha 6:52 minutos.
    }
}

export { AuthUserController }