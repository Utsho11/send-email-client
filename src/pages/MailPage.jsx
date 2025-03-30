import { NavLink, useLocation } from "react-router"; // Corrected import
import EmailCampaignForm from "../components/form/EmailCampaignForm";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const MailPage = () => {
  const location = useLocation();
  const path = location.pathname.split("/dashboard/")[1]; // Extract path after "/dashboard/"

  // Optional: Add a more robust check for invalid paths
  if (!path || path.trim() === "") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto">
      <div className="text-lg m-8 flex justify-between items-center">
        <NavLink
          to="/dashboard/allCampaign"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <ArrowLeftOutlined />
          Back to Previous Page
        </NavLink>
        <NavLink
          to="/dashboard/pre-designed-template-options"
          className="flex items-center gap-2 hover:text-blue-500"
        >
          Use Pre-Designed Templates
          <ArrowRightOutlined />
        </NavLink>
      </div>
      <EmailCampaignForm path={path} />
    </div>
  );
};

export default MailPage;
