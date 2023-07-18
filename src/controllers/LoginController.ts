import { Request, Response } from "express"
import { sign } from "jsonwebtoken";
import { UserService } from "../services/UserService";

export class LoginController {

    userService: UserService;

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }

    login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const token = await this.userService.getToken(email,password);

        return res.status(200).json({ token });
    }
    catch(err) {
        return res.status(400).json({ message: 'Email or password invalid' });
    }
    }
}