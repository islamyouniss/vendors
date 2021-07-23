export interface Roles {
    viewer: boolean;
    entry?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    roles?: Roles
}

export class User {
    /*constructor(public email: string, public user_id: string, public token: string, public token_expiration: Date, public user_role?: string, displayName?: string) {}*/

    /*get token() {
        if (!this._token_expiration || new Date() > this._token_expiration) {
            return null;
        }
        return this._token;
    }*/

}
