import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function UserDashboard() {
  const user = useQuery(api.users.getCurrentUser);
  const userDocuments = useQuery(api.documents.getUserDocuments);
  const services = useQuery(api.services.getAllServices);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDeleteDocument = async (documentId: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument({ documentId: documentId as any });
        toast.success("Document deleted successfully");
      } catch (error) {
        toast.error("Failed to delete document");
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const documentsByStatus = userDocuments?.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-slate-600">
            Manage your tax documents and track your service requests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Documents</p>
                <p className="text-3xl font-bold text-slate-800">{userDocuments?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{documentsByStatus.pending || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Under Review</p>
                <p className="text-3xl font-bold text-blue-600">{documentsByStatus.reviewed || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👀</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{documentsByStatus.approved || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/services"
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📋</div>
              <h3 className="text-xl font-bold mb-2">Browse Services</h3>
              <p className="text-blue-100">Explore our tax preparation services</p>
            </Link>

            <Link
              to="/tax-tools"
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🧮</div>
              <h3 className="text-xl font-bold mb-2">Tax Calculators</h3>
              <p className="text-blue-100">Use our free tax estimation tools</p>
            </Link>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-xl font-bold mb-2">Contact Support</h3>
              <p className="text-blue-100">Get help with your tax questions</p>
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Your Documents</h2>
            <Link
              to="/services"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Upload New Document
            </Link>
          </div>

          {userDocuments && userDocuments.length > 0 ? (
            <div className="space-y-4">
              {userDocuments.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{doc.fileName}</h3>
                      <p className="text-slate-600">Service: {doc.service}</p>
                      <p className="text-sm text-slate-500">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      doc.status === "approved" ? "bg-green-100 text-green-800" :
                      doc.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>

                    <div className="flex space-x-2">
                      {doc.downloadUrl && (
                        <a
                          href={doc.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Download
                        </a>
                      )}
                      <button
                        onClick={() => {
                          void handleDeleteDocument(doc._id);
                        }}
                        className="text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">📁</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No Documents Yet</h3>
              <p className="text-slate-600 mb-8">
                Start by uploading your tax documents for our services
              </p>
              <Link
                to="/services"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Services
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
