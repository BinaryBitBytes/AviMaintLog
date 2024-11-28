import ManagerModel from "../../../models/Manager.mjs"; // Import the Manager model

class ManagerResolver {
  constructor(managerName, isAdmin, onProject, username, email, password) {
    this._managerName = managerName;
    this._isAdmin = isAdmin;
    this._onProject = onProject;
    this._username = username;
    this._email = email;
    this._password = password;

    this._query = {
      /**
       * Fetches all managers sorted by creation date.
       */
      managers: async () => {
        return await ManagerModel.find().sort({ createdAt: -1 });
      },

      /**
       * Fetches a single manager by ID.
       */
      manager: async (_, { managerID }) => {
        return await ManagerModel.findOne({ _id: managerID });
      },
    };

    this._mutation = {
      /**
       * Adds a new manager to the database.
       */
      addManager: async (
        _,
        { managerName, isAdmin, onProject, username, email, password }
      ) => {
        return ManagerModel.create({
          managerName,
          isAdmin,
          onProject,
          username,
          email,
          password,
        });
      },

      /**
       * Adds a project to a manager's list.
       */
      addProject: async (_, { managerID, onProject }) => {
        return ManagerModel.findOneAndUpdate(
          { _id: managerID },
          { $addToSet: { onProject } },
          { new: true, runValidators: true }
        );
      },

      /**
       * Removes a manager by ID.
       */
      removeManager: async (_, { managerID }) => {
        return ManagerModel.findOneAndDelete({ _id: managerID });
      },

      /**
       * Removes a project from a manager's list.
       */
      removeProject: async (_, { managerID, onProject }) => {
        const manager = await ManagerModel.findOne({ _id: managerID });
        if (!manager) {
          throw new Error("Manager not found.");
        }

        manager.onProject = manager.onProject.filter(
          (project) => project !== onProject
        );
        await manager.save();
        return manager;
      },
    };
  }

  // Getters and Setters for Queries and Mutations
  get Query() {
    return this._query;
  }

  set Query(newQueries) {
    this._query = { ...this._query, ...newQueries };
  }

  get Mutation() {
    return this._mutation;
  }

  set Mutation(newMutations) {
    this._mutation = { ...this._mutation, ...newMutations };
  }

  // Getters and Setters for Manager properties
  get managerName() {
    return this._managerName;
  }

  set managerName(value) {
    this._managerName = value;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  set isAdmin(value) {
    this._isAdmin = value;
  }

  get onProject() {
    return this._onProject;
  }

  set onProject(value) {
    this._onProject = value;
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }
}

const managerResolverInstance = new ManagerResolver(
  "Manny Gher",
  "8675349",
  "Manny@123.Com",
  "HelloPassworld",
  true
);

console.log(managerResolverInstance);
export const CLASSFUL_resolver_MANAGER = managerResolverInstance;
