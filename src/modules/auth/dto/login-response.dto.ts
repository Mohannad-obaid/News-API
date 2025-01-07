// function sanitizeUserLogin(user: any) {
//   return {
//     id: user._id,
//     email: user.email,
//     role: user.role,
//   };
// }
//
// export default sanitizeUserLogin;

export class SanitizedUserDto {
  id: string;
  email: string;
  role: string;

  constructor(user: any) {
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}
