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
    resetCampaign: () => initialState, // Reset the state in a cleaner way
  },
});

export const {
  updateField,
  setContent,
  setTemplateId,
  setCampaignId,
  resetCampaign,
} = campaignSlice.actions;

const store = configureStore({
  reducer: {
    campaign: campaignSlice.reducer,
  },
});

export default store;
