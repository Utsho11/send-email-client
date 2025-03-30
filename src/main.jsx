import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Dashboard from "./layouts/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import MailPage from "./pages/MailPage.jsx";
import AddContact from "./pages/AddContact.jsx";
import ManageClient from "./pages/ManageClient.jsx";
import ManualContact from "./components/form/ManualContact.jsx";
import CSVContact from "./components/form/CSVContact.jsx";
import MultiStepEntrepreneurForm from "./components/form/AddEntrpForm.jsx";
import HolidayCalendar from "./components/Calendar.jsx";
import ManageContactList from "./pages/ManageContactList.jsx";
import SelectCampaign from "./pages/SelectCampaign.jsx";
import Campaigns from "./pages/Campaigns.jsx";
import AllInvestors from "./components/module/AllInvestors.jsx";
import EmailTemplateOptions from "./components/form/EmailTemplateOptions.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import EmailTextEditor from "./components/editor/EmailTextEditor.jsx";
import TemplatePreview from "./components/module/TemplatePreview.jsx";
import EmailTemplateEditor from "./components/editor/EmailTemplateEditor.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route index path="/" element={<App />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Profile />} />
                <Route path=":id/type" element={<AddContact />} />
                <Route path="manage-client" element={<ManageClient />} />
                <Route
                  path="add-client"
                  element={<MultiStepEntrepreneurForm />}
                />
                <Route
                  path="manage-contactsList"
                  element={<ManageContactList />}
                />
                <Route
                  path=":id/add-contact-manually"
                  element={<ManualContact />}
                />
                <Route path=":id/add-contact-auto" element={<CSVContact />} />
                <Route path="allCampaign" element={<Campaigns />} />
                <Route path="select-campaign" element={<SelectCampaign />} />
                <Route path=":campaignId/email-form" element={<MailPage />} />

                {/* <Route path="pre-designed-email" element={<SelectCampaign />} /> */}
                <Route
                  path="pre-designed-template-options"
                  element={<EmailTemplateOptions />}
                />
                <Route path="calendar" element={<HolidayCalendar />} />
                <Route path="all-investors" element={<AllInvestors />} />

                <Route path="template-options" element={<TemplatePreview />} />
              </Route>
            </Route>

            <Route
              path=":campaignId/template-editor"
              element={<EmailTemplateEditor />}
            />
            <Route
              path=":campaignId/text-editor"
              element={<EmailTextEditor />}
            />
            <Route path="about" element={<About />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
