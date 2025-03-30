import { Loader, Mail } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  if (!user.photoURL) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center p-5 bg-[#0b305b] text-white">
      <h1 className="text-3xl font-semibold flex items-center gap-3">
        <Mail />
        SEND MAIL
      </h1>
      {/* User Profile */}
      {user.photoURL && (
        <div className="mb-5 text-center">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User"
            className="w-16 h-16 rounded-full mx-auto border-2 border-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
