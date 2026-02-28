export const isValidEmail = (email: string): Boolean => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new Error("Invalid email format");
  }

  return true;
};

export const isValidPassword = (password: string): Boolean => {
  const trimmedPass = password.trim();

  if (!trimmedPass) {
    throw new Error("Password is required");
  }
  if (trimmedPass.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  if (trimmedPass.length > 40) {
    throw new Error("Password is too long 1");
  }

  return true;
};
