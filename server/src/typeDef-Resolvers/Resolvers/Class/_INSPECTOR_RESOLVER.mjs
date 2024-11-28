import { default as InspectorModel } from "../../../models/Inspector.mjs";

class InspectorResolver {
  constructor(inspectorName, isAdmin, onProject, username, email, password) {
    this._inspectorName = inspectorName;
    this._isAdmin = isAdmin;
    this._onProject = onProject;
    this._username = username;
    this._email = email;
    this._password = password;

    this._query = {
      /**
       * Fetches all inspectors sorted by creation date.
       */
      inspectors: async () => {
        return await InspectorModel.find().sort({ createdAt: -1 });
      },

      /**
       * Fetches a single inspector by ID.
       */
      inspector: async (_, { inspectorID }) => {
        return await InspectorModel.findOne({ _id: inspectorID });
      },
    };

    this._mutation = {
      /**
       * Adds a new inspector to the database.
       */
      addInspector: async (
        _,
        { inspectorName, isAdmin, onProject, username, email, password }
      ) => {
        return InspectorModel.create({
          inspectorName,
          isAdmin,
          onProject,
          username,
          email,
          password,
        });
      },

      /**
       * Adds a project to an inspector's list of projects.
       */
      addProject: async (_, { inspectorID, onProject }) => {
        return InspectorModel.findOneAndUpdate(
          { _id: inspectorID },
          { $addToSet: { onProject: onProject } },
          { new: true, runValidators: true }
        );
      },

      /**
       * Removes an inspector by ID.
       */
      removeInspector: async (_, { inspectorID }) => {
        return InspectorModel.findOneAndDelete({ _id: inspectorID });
      },

      /**
       * Removes a project from an inspector's list of projects.
       */
      removeProject: async (_, { inspectorID, onProject }) => {
        return InspectorModel.updateOne(
          { _id: inspectorID },
          { $pull: { onProject: onProject } }
        );
      },
    };
  }

  // Getters for Queries and Mutations
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

  // Getters and Setters for Inspector properties
  get inspectorName() {
    return this._inspectorName;
  }

  set inspectorName(value) {
    this._inspectorName = value;
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

const inspectorResolverInstance = new InspectorResolver(
  `Billy Bob`,
  true,
  true,
  `Billy.Bob21`,
  "IluvTunaSubs@mayo.bun",
  "PaS#WuRDDD"
);
const removed =
  inspectorResolverInstance._mutation.addInspector.inspectorName(`Miles`);
console.log(removed);
console.log(inspectorResolverInstance.addInspector);
console.log(inspectorResolverInstance);
console.log(inspectorResolverInstance.removeInspector);
export const CLASSFUL_resolver_INSPECTOR = inspectorResolverInstance;
