"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = "https://codewithmonu.tech/api";

const fetchCollection = async (endpoint, key) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data = await response.json();
  return data?.[key] ?? [];
};

export const fetchSkills = createAsyncThunk("portfolio/fetchSkills", () =>
  fetchCollection("skills", "skills")
);

export const fetchProjects = createAsyncThunk("portfolio/fetchProjects", () =>
  fetchCollection("projects", "projects")
);

export const fetchCertificates = createAsyncThunk(
  "portfolio/fetchCertificates",
  () => fetchCollection("certificates", "certificates")
);

export const fetchTimeline = createAsyncThunk("portfolio/fetchTimeline", () =>
  fetchCollection("timeline", "timelineItems")
);

const initialState = {
  skills: [],
  projects: [],
  certificates: [],
  timelineItems: [],
  status: {
    skills: "idle",
    projects: "idle",
    certificates: "idle",
    timeline: "idle",
  },
  error: {
    skills: null,
    projects: null,
    certificates: null,
    timeline: null,
  },
};

const setPending = (state, key) => {
  state.status[key] = "loading";
  state.error[key] = null;
};

const setFulfilled = (state, key, valueKey, action) => {
  state.status[key] = "succeeded";
  state[valueKey] = action.payload;
};

const setRejected = (state, key, action) => {
  state.status[key] = "failed";
  state.error[key] = action.error.message ?? "Something went wrong";
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => setPending(state, "skills"))
      .addCase(fetchSkills.fulfilled, (state, action) =>
        setFulfilled(state, "skills", "skills", action)
      )
      .addCase(fetchSkills.rejected, (state, action) =>
        setRejected(state, "skills", action)
      )
      .addCase(fetchProjects.pending, (state) => setPending(state, "projects"))
      .addCase(fetchProjects.fulfilled, (state, action) =>
        setFulfilled(state, "projects", "projects", action)
      )
      .addCase(fetchProjects.rejected, (state, action) =>
        setRejected(state, "projects", action)
      )
      .addCase(fetchCertificates.pending, (state) =>
        setPending(state, "certificates")
      )
      .addCase(fetchCertificates.fulfilled, (state, action) =>
        setFulfilled(state, "certificates", "certificates", action)
      )
      .addCase(fetchCertificates.rejected, (state, action) =>
        setRejected(state, "certificates", action)
      )
      .addCase(fetchTimeline.pending, (state) => setPending(state, "timeline"))
      .addCase(fetchTimeline.fulfilled, (state, action) =>
        setFulfilled(state, "timeline", "timelineItems", action)
      )
      .addCase(fetchTimeline.rejected, (state, action) =>
        setRejected(state, "timeline", action)
      );
  },
});

export default portfolioSlice.reducer;
