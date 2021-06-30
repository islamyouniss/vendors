export class User {
    constructor(public email: string, public user_id: string, public token: string, public token_expiration: Date) {}

    /*get token() {
        if (!this._token_expiration || new Date() > this._token_expiration) {
            return null;
        }
        return this._token;
    }*/

}
