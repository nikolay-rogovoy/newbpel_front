import { IUserDepRoleOper } from './i-user-dep-role-oper';

/***/
export interface IUserDepRole {
    /***/
    idrole: number;
    /***/
    name: string;
    /***/
    opers: IUserDepRoleOper[];
}
