import ProjectDataModel from "../../../models/ProjectData.mjs"; // Import the ProjectData model

class ProjectDataResolver {
  constructor(projectId, inspectorName, workDescription) {
    this._projectId = projectId;
    this._inspectorName = inspectorName;
    this._workDescription = workDescription;
  }

  // Getters
  get projectId() {
    return this._projectId;
  }

  get inspectorName() {
    return this._inspectorName;
  }

  get workDescription() {
    return this._workDescription;
  }

  // Setters
  set projectId(id) {
    this._projectId = id;
  }

  set inspectorName(name) {
    this._inspectorName = name;
  }

  set workDescription(description) {
    this._workDescription = description;
  }

  // Query Methods
  async fetchAllProjectData() {
    return await ProjectDataModel.find().sort({ createdAt: -1 });
  }

  async fetchProjectById(projectID) {
    return await ProjectDataModel.findById(projectID);
  }

  // Mutation Methods
  async addProjectData({
    projectId,
    projectName,
    inspectorName,
    workDescription,
  }) {
    return await ProjectDataModel.create({
      projectId,
      projectName,
      inspectorName,
      workDescription,
    });
  }

  async addInspectorToProject(projectID, inspectorName) {
    return await ProjectDataModel.findByIdAndUpdate(
      projectID,
      { $addToSet: { workDescription: { inspectorName } } },
      { new: true, runValidators: true }
    );
  }

  async removeProjectData(projectID) {
    return await ProjectDataModel.findByIdAndDelete(projectID);
  }

  async removeInspectorFromProject(projectID, inspectorName) {
    const project = await ProjectDataModel.findById(projectID);
    if (!project) throw new Error("Project not found.");

    project.workDescription = project.workDescription.filter(
      (work) => work.inspectorName !== inspectorName
    );

    await project.save();
    return project;
  }
}

const projectDataResolverInstance = new ProjectDataResolver();
console.log(projectDataResolverInstance);
export const CLASSFUL_resolver_PROJECT_DATA_RESOLVER =
  projectDataResolverInstance;
