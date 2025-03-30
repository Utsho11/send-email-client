import { ClipboardList, File, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";

const AddContact = () => {
  const { id } = useParams();
  // console.log(id);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Import Methods Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Import Contacts
                </h1>
                <p className="text-gray-600">
                  Choose your preferred method to add contacts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Manual Import Card */}
                <Link
                  to={`/dashboard/${id}/add-contact-manually`}
                  className="group focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-full p-8 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                        <ClipboardList className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Manual Entry
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Add contacts individually with detailed information
                      </p>
                    </div>
                  </motion.div>
                </Link>

                {/* CSV Import Card */}
                <Link
                  to={`/dashboard/${id}/add-contact-auto`}
                  className="group focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-full p-8 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                        <File className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        CSV Import
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Bulk upload contacts using CSV file format
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
