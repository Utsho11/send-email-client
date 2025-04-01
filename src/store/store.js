import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  sender: "",
  recipients: [],
  content: null,
  templateId: null,
  campaignId: null,
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      } else {
        console.warn(
          `Invalid field: ${field} does not exist in campaign state.`
        );
      }
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setTemplateId(state, action) {
      state.templateId = action.payload;
    },
    setCampaignId(state, action) {
      state.campaignId = action.payload;
    },
    setSubject(state, action) {
      state.subject = action.payload;
    },
    resetCampaign: () => initialState,
  },
});

export const {
  updateField,
  setContent,
  setTemplateId,
  setCampaignId,
  setSubject,
  resetCampaign,
} = campaignSlice.actions;

const store = configureStore({
  reducer: {
    campaign: campaignSlice.reducer,
  },
});

export default store;
