import { User } from "../interfaces/User";


const db = [
    {
        name: "Mateus",
        email: "mateus@gmail.com"
    }
]
export class UserService {
    db: User[];

    constructor(database = db) {
        this.db = database;
    }
    

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user);
        console.log('DB updated', this.db);
    }

    getAllUsers = () => {
        return this.db;
    }
    
    deleteUser = (name: string) => {
        for (let i = 0; i < this.db.length; i++) {
            if (this.db[i].name === name) {
                this.db.splice(i, 1);
                console.log('Usuário excluído com sucesso')
                return true;
            }
        }
        return false;
    }
}