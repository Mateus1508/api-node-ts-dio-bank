import { Request, Response } from "express"
import { UserService } from "../services/UserService";

export class UserController {
    userService: UserService;

    constructor(
        userService = new UserService()
    ){
        this.userService = userService;
    }

    createUser = (req: Request, res: Response) => {
        try {
            const user = req.body;

        if(!user.name || undefined) 
            return res.status(400).json({message: 'Bad Request. Name is required!'})
        if(!user.email || undefined) 
            return res.status(400).json({message: 'Bad Request. Email is required!'})
        if(!user.password || undefined || user.password.length < 6) 
            return res.status(400).json({message: 'Bad Request. password is required and should have characters grater or equal to 6!'})

        this.userService.createUser(user.name,user.email, user.password);
        return res.status(201).json({message: 'User created'})
        }
        catch (err) {
            return err;
        }
    }

    getUser = async (req: Request,res: Response) => {
        try {
           const { userId } = req.params;
           const user = await this.userService.getUser(userId)

            return res.status(200).json(
                {
                    userId: user?.user_id,
                    name: user?.name,
                    email: user?.email
                });
        }
        catch (err) {
            return err;
        }
    }

    deleteUser = (req: Request, res: Response) =>  {
        try {
           
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}