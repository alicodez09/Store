import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    //A saltRounds is a random value use for bcrypt that is generated and combined with the password before hashing.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
