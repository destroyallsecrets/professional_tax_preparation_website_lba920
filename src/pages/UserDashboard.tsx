import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function UserDashboard() {
  const user = useQuery(api.users.getCurrentUser);
  const userDocuments = useQuery(api.documents.getUserDocuments);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDeleteDocument = async (documentId: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument({ documentId: documentId as any });
        toast.success("Document deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete document");
      }
    }
  };

  const handleDeleteClick = (documentId: string) => {
    void handleDeleteDocument(documentId);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  const documentsByStatus = userDocuments?.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gold mb-4">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gold-light">
            Manage your tax documents and track your service requests
          </p>
        </div>

        <div className="space-y-8">
          <header className="bg-black-light p-6 rounded-lg border border-gold">
            <h1 className="text-2xl font-bold text-gold">Dashboard</h1>
          </header>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-black-light p-6 rounded-lg border border-gold">
              <h3 className="text-gold-light text-lg font-semibold mb-2">Total Documents</h3>
              <p className="text-gold text-3xl font-bold">{userDocuments?.length || 0}</p>
            </div>

            <div className="bg-black-light p-6 rounded-lg border border-gold">
              <h3 className="text-gold-light text-lg font-semibold mb-2">Pending Review</h3>
              <p className="text-gold text-3xl font-bold">{documentsByStatus.pending || 0}</p>
            </div>

            <div className="bg-black-light p-6 rounded-lg border border-gold">
              <h3 className="text-gold-light text-lg font-semibold mb-2">Under Review</h3>
              <p className="text-gold text-3xl font-bold">{documentsByStatus.reviewed || 0}</p>
            </div>

            <div className="bg-black-light p-6 rounded-lg border border-gold">
              <h3 className="text-gold-light text-lg font-semibold mb-2">Approved</h3>
              <p className="text-gold text-3xl font-bold">{documentsByStatus.approved || 0}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-black-light border-2 border-gold rounded-3xl p-8 mb-12 text-gold">
            <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/services"
                className="bg-black-light/50 backdrop-blur-sm rounded-xl p-6 hover:bg-black transition-all duration-300 group border border-gold/30"
              >
                <h3 className="text-xl font-semibold text-gold mb-2">Tax Services</h3>
                <p className="text-gold-light">Explore our tax preparation services</p>
              </Link>

              <Link
                to="/tax-tools"
                className="bg-black-light/50 backdrop-blur-sm rounded-xl p-6 hover:bg-black transition-all duration-300 group border border-gold/30"
              >
                <h3 className="text-xl font-semibold text-gold mb-2">Tax Tools</h3>
                <p className="text-gold-light">Use our free tax estimation tools</p>
              </Link>

              <div className="bg-black-light/50 backdrop-blur-sm rounded-xl p-6 border border-gold/30">
                <h3 className="text-xl font-semibold text-gold mb-2">Need Help?</h3>
                <p className="text-gold-light">Get help with your tax questions</p>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-black-light rounded-3xl p-8 mb-12 border border-gold">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gold">Your Documents</h2>
              <Link
                to="/documents"
                className="bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark transition-colors"
              >
                View All Documents
              </Link>
            </div>

            {userDocuments && userDocuments.length > 0 ? (
              <div className="space-y-4">
                {userDocuments.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex items-center justify-between p-6 bg-black-light rounded-xl border border-gold/30 hover:border-gold hover:shadow-gold/20 hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <h3 className="font-semibold text-gold">{doc.fileName}</h3>
                      <p className="text-gold-light text-sm">Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleDeleteClick(doc._id)}
                        className="text-gold-light hover:text-gold transition-colors"
                        title="Delete document"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <svg
                        className="w-6 h-6 text-gold-light"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-3-3v6m3-3a9 9 0 11-6-8.28M12 15l3 3m0 0l3-3m-3 3V9"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">📁</div>
                <h3 className="text-2xl font-bold text-gold mb-4">No Documents Yet</h3>
                <p className="text-gold-light mb-8">
                  You haven't uploaded any documents yet. Get started by uploading your first document.
                </p>
                <Link
                  to="/upload"
                  className="bg-gradient-to-r from-gold to-gold-dark text-black px-8 py-4 rounded-xl font-semibold hover:from-gold-dark hover:to-gold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Upload Your First Document
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
