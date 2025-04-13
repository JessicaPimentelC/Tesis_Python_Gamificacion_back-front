const adminEmails = [
  "admin@gmail.com",
  "usuario@gmail.com",
  "jessica.pimentel@correounivalle.edu.co",
  "eduardo.daza@correounivalle.edu.co.co"
];
export const esAdmin = (userInfo) => {
  return userInfo && adminEmails.includes(userInfo.email);
};