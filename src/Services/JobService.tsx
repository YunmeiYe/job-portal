import { agent } from "../api/agent";

const postJob = async (job: any): Promise<any> => await agent.Job.postJob(job);

const getJob = async (id: string | number): Promise<any> => await agent.Job.getJob(id);

const getAllJobs = async (): Promise<any> => await agent.Job.getAllJobs();

const applyJob = async (id: string | number, applicant: any): Promise<any> => await agent.Job.applyJob(id, applicant);

const getJobPostedBy = async (id: string | number): Promise<any> => await agent.Job.getJobPostedBy(id);

const changeAppStatus = async (application: any): Promise<any> => await agent.Job.changeAppStatus(application);

export { postJob, getAllJobs, getJob, applyJob, getJobPostedBy, changeAppStatus }