export class User {

  public id: number;
  public name: string;
  public password: string;
  public role: string;
  public email: string;
  public avatar: string;
  public createdAt: Date;
  public lastAuthentificated: Date;
  public passwordLastChanged: Date;
  public phoneNumber: string;
  public confirmationToken: string;

  constructor(name: string, email: string, password: string, role: string) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = 'CLIENT';
  }
}
