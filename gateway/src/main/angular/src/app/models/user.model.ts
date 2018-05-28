export class User {
  // firstName: string;
  // email: string;
  // password: string;
  // lastName: string;
  //
  // constructor( firstName: string, email: string, password?: string, lastName?: string) {
  //   this.firstName = firstName;
  //   this.email = email;
  //   this.password = password;
  //   this.lastName = lastName;
  // }

  constructor( public firstName: string,
               public email: string,
               public lastName?: string) {}
}
