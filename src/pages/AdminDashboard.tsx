import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function AdminDashboard() {
  const user = useQuery(api.users.getCurrentUser);
  const dashboardStats = useQuery(api.admin.getDashboardStats);
  const allUsers = useQuery(api.users.getAllUsers);
  const allDocuments = useQuery(api.documents.getAllDocuments);
  const allServices = useQuery(api.services.getAllServices);
  const adminLogs = useQuery(api.admin.getAdminLogs, { limit: 20 });
  
  const updateDocumentStatus = useMutation(api.documents.updateDocumentStatus);
  const updateUserRole = useMutation(api.users.updateUserRole);
  const createService = useMutation(api.services.createService);
  const updateService = useMutation(api.services.updateService);

  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "users" | "services" | "logs">("overview");
  const [showCreateService, setShowCreateService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    detailedDescription: "",
    category: "",
    price: "",
    requiredDocuments: [""],
    officialLinks: [{ title: "", url: "" }],
  });

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Access Denied</h2>
          <p className="text-slate-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleDocumentStatusUpdate = async (documentId: string, status: "pending" | "reviewed" | "approved") => {
    try {
      await updateDocumentStatus({ documentId: documentId as any, status });
      toast.success("Document status updated successfully");
    } catch (error) {
      toast.error("Failed to update document status");
    }
  };

  const handleUserRoleUpdate = async (userId: string, role: "user" | "admin") => {
    try {
      await updateUserRole({ userId: userId as any, role });
      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleCreateService = async () => {
    try {
      const serviceData = {
        ...newService,
        requiredDocuments: newService.requiredDocuments.filter(doc => doc.trim() !== ""),
        officialLinks: newService.officialLinks.filter(link => link.title.trim() !== "" && link.url.trim() !== ""),
        price: newService.price.trim() || undefined,
      };
      
      await createService(serviceData);
      toast.success("Service created successfully");
      setShowCreateService(false);
      setNewService({
        name: "",
        description: "",
        detailedDescription: "",
        category: "",
        price: "",
        requiredDocuments: [""],
        officialLinks: [{ title: "", url: "" }],
      });
    } catch (error) {
      toast.error("Failed to create service");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Manage users, documents, services, and monitor system activity
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-lg">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "documents", label: "Documents", icon: "📄" },
            { id: "users", label: "Users", icon: "👥" },
            { id: "services", label: "Services", icon: "🛠️" },
            { id: "logs", label: "Activity Logs", icon: "📋" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && dashboardStats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Users</p>
                    <p className="text-3xl font-bold text-slate-800">{dashboardStats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Documents</p>
                    <p className="text-3xl font-bold text-slate-800">{dashboardStats.totalDocuments}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Services</p>
                    <p className="text-3xl font-bold text-slate-800">{dashboardStats.totalServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-yellow-600">{dashboardStats.statusCounts.pending || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Documents by Status</h3>
                <div className="space-y-3">
                  {Object.entries(dashboardStats.statusCounts).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="capitalize text-slate-600">{status}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status === "approved" ? "bg-green-500" :
                              status === "reviewed" ? "bg-blue-500" :
                              "bg-yellow-500"
                            }`}
                            style={{ width: `${(count / dashboardStats.totalDocuments) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-800">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Documents by Service</h3>
                <div className="space-y-3">
                  {Object.entries(dashboardStats.serviceCounts).slice(0, 5).map(([service, count]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-slate-600 truncate">{service}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-indigo-500"
                            style={{ width: `${(count / dashboardStats.totalDocuments) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-800">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && allDocuments && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">All Documents</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {allDocuments.map((doc) => (
                    <tr key={doc._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{doc.fileName}</div>
                          <div className="text-sm text-slate-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{doc.userName}</div>
                          <div className="text-sm text-slate-500">{doc.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {doc.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={doc.status}
                          onChange={(e) => handleDocumentStatusUpdate(doc._id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${
                            doc.status === "approved" ? "bg-green-100 text-green-800" :
                            doc.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="approved">Approved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {doc.downloadUrl && (
                          <a
                            href={doc.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && allUsers && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">All Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {allUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleUserRoleUpdate(user._id, e.target.value as any)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${
                            user.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className="text-slate-400">No actions available</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Manage Services</h2>
              <button
                onClick={() => setShowCreateService(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create New Service
              </button>
            </div>

            {/* Create Service Modal */}
            {showCreateService && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Create New Service</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                      <input
                        type="text"
                        value={newService.name}
                        onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={newService.category}
                        onChange={(e) => setNewService(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Price (optional)</label>
                      <input
                        type="text"
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="$299"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                      <textarea
                        value={newService.description}
                        onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Detailed Description</label>
                      <textarea
                        value={newService.detailedDescription}
                        onChange={(e) => setNewService(prev => ({ ...prev, detailedDescription: e.target.value }))}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Required Documents</label>
                      {newService.requiredDocuments.map((doc, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={doc}
                            onChange={(e) => {
                              const updated = [...newService.requiredDocuments];
                              updated[index] = e.target.value;
                              setNewService(prev => ({ ...prev, requiredDocuments: updated }));
                            }}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                            placeholder="Document name"
                          />
                          <button
                            onClick={() => {
                              const updated = newService.requiredDocuments.filter((_, i) => i !== index);
                              setNewService(prev => ({ ...prev, requiredDocuments: updated }));
                            }}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setNewService(prev => ({ 
                          ...prev, 
                          requiredDocuments: [...prev.requiredDocuments, ""] 
                        }))}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        + Add Document
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={() => setShowCreateService(false)}
                      className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateService}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Create Service
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Services List */}
            {allServices && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map((service) => (
                  <div key={service._id} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">{service.category}</span>
                      {service.price && (
                        <span className="text-blue-600 font-semibold">{service.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === "logs" && adminLogs && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Activity Logs</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {adminLogs.map((log) => (
                <div key={log._id} className="p-6 hover:bg-slate-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-800">{log.action}</h3>
                      <p className="text-slate-600 text-sm mt-1">
                        by {log.adminName} ({log.adminEmail})
                      </p>
                      {log.details && (
                        <p className="text-slate-500 text-sm mt-2">{log.details}</p>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
