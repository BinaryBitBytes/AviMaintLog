import AuthModel from "../../../models/Auth.mjs"; // Ensure correct path

class AuthResolver {
  constructor(username, token, email, password, isAdmin) {
    this._username = username;
    this._token = token;
    this._email = email;
    this._password = password;
    this._isAdmin = isAdmin;

    this.Query = {
      /**
       * Fetch a single Auth record by ID
       */
      auth: async (_, { authID }) => {
        return AuthModel.findOne({ _id: authID }).populate("auth");
      },

      /**
       * Fetch all Auth records sorted by creation date
       */
      auths: async () => {
        return AuthModel.find().sort({ createdAt: -1 }).populate("auth");
      },
    };

    this.Mutation = {
      /**
       * Add a new user
       */
      addUser: async (_, { username, token, email, password, isAdmin }) => {
        const newAuth = new AuthModel({
          username,
          token,
          email,
          password,
          isAdmin,
        });

        await newAuth.save();
        return newAuth.populate("auth");
      },

      /**
       * Login user logic
       */
      loginUser: async (_, { username, email, password }) => {
        const userLogin = await AuthModel.findOne({ username, email });

        if (!userLogin) {
          throw new Error("User not found or invalid credentials.");
        }

        return userLogin;
      },
    };
  }

  // Getter and Setter for Username
  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  // Getter and Setter for Token
  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  // Getter and Setter for Email
  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  // Getter and Setter for Password
  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  // Getter and Setter for Admin Status
  get isAdmin() {
    return this._isAdmin;
  }

  set isAdmin(value) {
    this._isAdmin = value;
  }
}

// Example usage:
const authResolverInstance = new AuthResolver(
  "Miles",
  "8675349",
  "BBB@123.Com",
  "this._password",
  true
);

console.log(authResolverInstance);
authResolverInstance.username = "JohnDoe";
console.log(authResolverInstance.username); // JohnDoe

export const CLASSFUL_resolver_AUTH = authResolverInstance;
