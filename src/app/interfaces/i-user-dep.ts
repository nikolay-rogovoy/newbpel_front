import { IUserDepRole } from './i-user-dep-role';

/***/
export interface IUserDep {
    /***/
    iddep: number;
    /***/
    name: string;
    /***/
    comment: string;
    /***/
    roles: IUserDepRole[];

}
