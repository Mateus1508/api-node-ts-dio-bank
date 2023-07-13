import { User } from "../interfaces/User";
import { UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [
        {
            name: "Mateus",
            email: "mateus@gmail.com"
        }
    ];
    const userService = new UserService(mockDb);

    it('Should add new user', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('Mateusin', 'mateusin@gmail.com');
        expect(mockConsole).toHaveBeenCalledWith('DB updated', mockDb);
    });
    
    it('Should show all users', () => {
        const mockDbFunction = jest.fn((mockDb) => mockDb);
        mockDbFunction(mockDb);
        let users = userService.getAllUsers();
        expect(mockDbFunction).toHaveReturnedWith(users);
    });
    
    it('Should delete user by name', () => {
        const user = userService.deleteUser('Mateus');
        expect(user).toBeTruthy();
    });

    it('Should be user by name not found', () => {
        const user = userService.deleteUser('Mate');
        expect(user).not.toBeTruthy();
    });




});