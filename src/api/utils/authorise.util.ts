import { IUser } from '@interfaces';

export const isAuthorised = (user: IUser, key: keyof IUser, value: string | boolean) => {
    console.log(user[key]);
    
    return user[key].toString().toLowerCase() === value
}