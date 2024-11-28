import TechnicianModel from "../../../models/Technician.mjs"; // Import the Technician model

class TechnicianResolver {
  constructor(technicianName, isAdmin, onProject, username, email, password) {
    this._technicianName = technicianName;
    this._isAdmin = isAdmin;
    this._onProject = onProject;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  // Getters
  get technicianName() {
    return this._technicianName;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get onProject() {
    return this._onProject;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  // Setters
  set technicianName(name) {
    this._technicianName = name;
  }

  set isAdmin(adminStatus) {
    this._isAdmin = adminStatus;
  }

  set onProject(project) {
    this._onProject = project;
  }

  set username(user) {
    this._username = user;
  }

  set email(mail) {
    this._email = mail;
  }

  set password(pass) {
    this._password = pass;
  }

  // Query Methods
  async fetchTechnicians() {
    return await TechnicianModel.find().sort({ createdAt: -1 });
  }

  async fetchTechnicianById(technicianID) {
    return await TechnicianModel.findOne({ _id: technicianID });
  }

  // Mutation Methods
  async addTechnician({
    technicianName,
    isAdmin,
    onProject,
    username,
    email,
    password,
  }) {
    return TechnicianModel.create({
      technicianName,
      isAdmin,
      onProject,
      username,
      email,
      password,
    });
  }

  async addProject(technicianID, onProject) {
    return TechnicianModel.findOneAndUpdate(
      { _id: technicianID },
      { $addToSet: { onProject } },
      { new: true, runValidators: true }
    );
  }

  async removeTechnician(technicianID) {
    return TechnicianModel.findOneAndDelete({ _id: technicianID });
  }

  async removeProject(technicianID, onProject) {
    const technician = await TechnicianModel.findOne({ _id: technicianID });
    if (!technician) {
      throw new Error("Technician not found.");
    }
    technician.onProject = technician.onProject.filter(
      (project) => project !== onProject
    );
    await technician.save();
    return technician;
  }
}
const technicianResolverInstance = new TechnicianResolver();
console.log(technicianResolverInstance);
export const CLASSFUL_resolver_TECHNICIAN = technicianResolverInstance;
