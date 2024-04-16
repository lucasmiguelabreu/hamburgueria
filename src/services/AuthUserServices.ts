import prismaClient from "../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthReques{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthReques){
       //Verificar se o email existe
       const user = await prismaClient.user.findFirst({
        where:{
            email: email
        }
       })

       if(!user){
        throw new Error("User/password incorrect")
       }

       //Verificar se a senha esta correta
       const passwordMatch = await compare(password, user.password)

       if(!passwordMatch){
        throw new Error("User/password incorrect")
       }

       //Gerar um token JWT para o usuario
       const token = sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.VINCE,
        {
            subject: user.id,
            expiresIn: '30d'
        }
       )


        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         }
    }
}

export { AuthUserService };