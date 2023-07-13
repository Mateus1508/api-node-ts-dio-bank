import { UserService } from "../services/UserService"
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";


describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    };

    const userController = new UserController(mockUserService as UserService); 

    it('Should show all users', () => {
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockResponse);
        expect(mockResponse.state.status).toBe(200);
    })

    it('Should be add new user', () => {
        const mockRequest = {
            body: {
                name: 'Luis',
                email: 'luis@gmail.com'
            } 
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({message: 'User created'})
    });
    it('Should have name in user body', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'mat@gmail.com'
            } 
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request. Name is required!'})
    });
    
    it('Should have email in user body', () => {
        const mockRequest = {
            body: {
                name: 'Mateus',
                email: ''
            } 
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message: 'Bad Request. Email is required!'})
    });

    it('Should be delete user by name', () => {
        const mockRequest = {
            body: {
                name: 'Mateus'
            } 
        } as Request;
        const mockResponse = makeMockResponse();
        const deleteUserMock = jest.spyOn(userController.userService, 'deleteUser');

        userController.deleteUser(mockRequest, mockResponse);

        expect(deleteUserMock).toHaveBeenCalled();
    });
})