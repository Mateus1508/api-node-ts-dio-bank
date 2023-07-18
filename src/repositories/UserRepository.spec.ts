import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";
import { randomUUID } from 'crypto';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser: User = {
        user_id: randomUUID(),
        name: 'test',
        email: 'test@dio.me',
        password: '123123'
    };

    beforeAll(async () => {
        managerMock = await getMockEntityManager({});
        userRepository = new UserRepository(managerMock as EntityManager); 
    });

    it('should create new user in database', async () => {
        const response = await userRepository.createUser(mockUser);

        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    });

})