import { UserService } from "../services/UserService"
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";


const mockUserService = {
    getUser: jest.fn(),
    createUser: jest.fn()
}
jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    }
})

describe('UserController', () => {

    const userController = new UserController();
    const mockResponse = makeMockResponse(); 

    it('Should show user by id', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456'
            }
        });

        userController.getUser(mockRequest, mockResponse);
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456');
        expect(mockResponse.state.status).toBe(200);
    })

    it('Should be add new user', () => {
        const mockRequest = {
            body: {
                name: 'Luis',
                email: 'luis@gmail.com',
                password: '123123'
            } 
        } as Request;
        
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({message: 'User created'})
    });
    it('Should have name in user body', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'mat@gmail.com',
                password: '123123'
            } 
        } as Request;
        
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request. Name is required!'})
    });
    
    it('Should have email in user body', () => {
        const mockRequest = {
            body: {
                name: 'Mateus',
                email: '',
                password: '123123'
            } 
        } as Request;
        
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request. Email is required!'})
    });

    it('Should have password in user body and have be grather or equal to 6', () => {
        const mockRequest = {
            body: {
                name: 'Mateus',
                email: 'mat@gmail.com',
                password: '123'
            } 
        } as Request;
        
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request. password is required and should have characters grater or equal to 6!'})
    });
})