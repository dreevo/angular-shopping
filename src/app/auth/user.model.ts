export class User {
  email: string;
  id: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(email: string, id: string, token: string, expirationDate: Date) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = expirationDate;
  }

  getToken() {
    if (this._tokenExpirationDate < new Date()) return null;
    return this._token;
  }
}
