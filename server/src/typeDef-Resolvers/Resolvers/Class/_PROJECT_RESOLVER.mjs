import ProjectModel from "../../../models/Project.mjs"; // Import the Project model

class ProjectResolver {
  constructor(projectName, isAdmin, onProject, username, email, password) {
    this._projectName = projectName;
    this._isAdmin = isAdmin;
    this._onProject = onProject;
    this._username = username;
    this._email = email;
    this._password = password;

    this._query = {
      /**
       * Fetches all projects sorted by creation date.
       */
      projects: async () => {
        return await ProjectModel.find().sort({ createdAt: -1 });
      },

      /**
       * Fetches a single project by ID.
       */
      project: async (_, { projectID }) => {
        return await ProjectModel.findOne({ _id: projectID });
      },
    };

    this._mutation = {
      /**
       * Adds a new project.
       */
      addProject: async (
        _,
        { projectName, isAdmin, onProject, username, email, password }
      ) => {
        return ProjectModel.create({
          projectName,
          isAdmin,
          onProject,
          username,
          email,
          password,
        });
      },

      /**
       * Updates a project by adding to the `onProject` field.
       */
      updateProject: async (_, { projectID, onProject }) => {
        return ProjectModel.findOneAndUpdate(
          { _id: projectID },
          { $addToSet: { onProject } },
          { new: true, runValidators: true }
        );
      },

      /**
       * Removes a project by ID.
       */
      removeProject: async (_, { projectID }) => {
        return ProjectModel.findOneAndDelete({ _id: projectID });
      },

      /**
       * Removes a technician from a project.
       */
      removeTechnician: async (_, { projectID, technicianID }) => {
        return ProjectModel.findOneAndUpdate(
          { _id: projectID },
          { $pull: { onProject: technicianID } },
          { new: true, runValidators: true }
        );
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

  // Getters and Setters for Project properties
  get projectName() {
    return this._projectName;
  }

  set projectName(value) {
    this._projectName = value;
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

const projectResolverInstance = new ProjectResolver();
console.log(projectResolverInstance);
export const CLASSFUL_resolver_PROJECT__RESOLVER = projectResolverInstance;
