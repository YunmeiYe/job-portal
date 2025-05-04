import { createAsyncThunk } from '@reduxjs/toolkit';
import { agent } from '../api/agent';

const getProfile = async (id: string | number): Promise<any> => await agent.Profile.getProfile(id);

const getAllProfiles = async (): Promise<any> => await agent.Profile.getAllProfiles();

const updateProfile = createAsyncThunk('profile/updateProfile', async (profile: any): Promise<any> => await agent.Profile.updateProfile(profile))

// const updateProfile = async (profile: any): Promise<any> => await agent.Profile.updateProfile(profile);

export { getProfile, getAllProfiles, updateProfile }