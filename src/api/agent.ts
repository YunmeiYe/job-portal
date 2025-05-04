import { http } from "./httpClient";

const Auth = {
  loginUser: (credentials: { email: string; password: string }) => http.post("/auth/login", credentials),
  logoutUser: () => http.post("/auth/logout"),
  registerUser: (user: any) => http.post("/auth/register", user),
  sendOtp: (email: string) => http.post(`/auth/send-otp/${email}`),
  verifyOtp: (email: string, otp: string) => http.post(`/auth/verify-otp/${email}/${otp}`),
  changePassword: (email: string, password: string) => http.post("/auth/change-password", { email, password }),
  refreshToken: () => http.post("/auth/refresh-token"),
}

const Profile = {
  getProfile: (id: string | number) => http.get(`/profiles/get/${id}`),
  getAllProfiles: () => http.get("/profiles/getAll"),
  updateProfile: (profile: any) => http.put("/profiles/update", profile),
}

const Job = {
  postJob: (job: any) => http.post("/jobs/post", job),
  getJob: (id: string | number) => http.get("/jobs/get/" + id),
  getAllJobs: () => http.get("/jobs/getAll"),
  applyJob: (id: string | number, applicant: any) => http.post(`/jobs/apply/${id}`, applicant),
  getJobPostedBy: (id: string | number) => http.get(`/jobs/postedBy/${id}`),
  changeAppStatus: (application: any) => http.post("/jobs/changeAppStatus", application),
}

export const agent = {
  Auth,
  Profile,
  Job
}
