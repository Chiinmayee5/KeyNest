export const generatePassword = (
  length = 7,
  upper = true,
  lower = true,
  numbers = true,
  symbols = true
) => {

  let chars = "";

  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+[]{}<>?";

  if (!chars) return "";

  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
};