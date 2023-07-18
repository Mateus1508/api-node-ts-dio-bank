import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository');
jest.mock('../database', () => {
    initialize: jest.fn();
});
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')


describe('UserService', () => {
    const userService = new UserService(mockUserRepository);

    const userTest = {
        user_id: '123456',
        name: 'Teste',
        email: 'teste@teste.com',
        password: '123123'
    }

    it('Should add new user', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(userTest));
        const response = await userService.createUser('Mateusin', 'mateusin@gmail.com', '123123');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject(userTest);
    });

    it('should return user token', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(userTest))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        const token = await userService.getToken('teste@teste.com', '123123');
        expect(token).toBe('token');
    })

    it('should throw error case user not found in database', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null));
        await expect(userService.getToken('teste@test.com', '123123'))
            .rejects.toThrowError(new Error('Email or password invalid'))

    })
    
    

});