import { Users } from './users.entity'

export const usersProvider = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: Users
    }
];