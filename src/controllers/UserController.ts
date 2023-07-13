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

        this.userService.createUser(user.name,user.email);
        return res.status(201).json({message: 'User created'})
        }
        catch (err) {
            return err;
        }
    }

    getAllUsers = (res: Response) => {
        try {
            const users = this.userService.getAllUsers();

            return res.status(200).json(users);
        }
        catch (err) {
            return err;
        }
    }

    deleteUser = (req: Request, res: Response) =>  {
        try {
            const user = req.body;
            const userDeleted = this.userService.deleteUser(user.name);
            if(userDeleted)
                return res.status(200).json({message: 'User deleted'});
            else
                return res.status(404).json({message: 'User not found'});
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}