import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, Authenticated, Unauthenticated } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function ServiceDetail() {
  const { serviceId } = useParams();
  const service = useQuery(api.services.getServiceById, 
    serviceId ? { serviceId: serviceId as any } : "skip"
  );
  const userDocuments = useQuery(api.documents.getUserDocuments);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const uploadDocument = useMutation(api.documents.uploadDocument);
  
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !serviceId) return;

    setUploading(true);
    try {
      // Generate upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Upload file to storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      
      if (!result.ok) {
        throw new Error("Upload failed");
      }
      
      const { storageId } = await result.json();
      
      // Save document record
      await uploadDocument({
        serviceId: serviceId as any,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        storageId,
      });
      
      toast.success("Document uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload document");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const serviceDocuments = userDocuments?.filter(doc => doc.serviceId === serviceId) || [];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/services"
            className="text-gold hover:text-gold-dark font-medium"
          >
            ← Back to Services
          </Link>
        </div>

        <div className="bg-gradient-to-br from-black to-black-light rounded-3xl p-8 lg:p-12 text-gold mb-12 border border-gold/30">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{service.name}</h1>
          <p className="text-xl text-gold-light leading-relaxed">{service.description}</p>
          {service.price && (
            <div className="mt-6">
              <span className="text-2xl font-bold text-gold">{service.price}</span>
            </div>
          )}
        </div>

        <div className="bg-black-light rounded-2xl shadow-lg p-8 mb-12 border border-gold/30">
          <h2 className="text-3xl font-bold text-gold mb-6">How to Proceed</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Gather Required Documents</h3>
                <p className="text-gold-light">Review the list of required documents below and ensure you have digital copies ready for upload.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Create an Account</h3>
                <p className="text-gold-light">If you haven't already, sign up for an account to securely upload and manage your documents.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Upload Documents</h3>
                <p className="text-gold-light">Use the secure upload section below to submit your documents. Make sure files are in PDF, JPG, JPEG, PNG, DOC, or DOCX format.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Track Progress</h3>
                <p className="text-gold-light">Monitor the status of your uploaded documents in the "Your Uploaded Documents" section. You'll be notified when they're reviewed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Service Details</h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed">
            {service.detailedDescription.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        {service.requiredDocuments.length > 0 && (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Required Documents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200"
                >
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-4"></span>
                  <span className="text-slate-700 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Links */}
        {service.officialLinks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Official Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.officialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-blue-600 mr-3 group-hover:scale-110 transition-transform">🔗</span>
                  <div>
                    <div className="font-semibold text-slate-800">{link.title}</div>
                    <div className="text-sm text-slate-600">{link.url}</div>
                  </div>
                  <span className="ml-auto text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Document Upload Section */}
        <Authenticated>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Upload Documents</h2>
            
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center mb-6">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Upload Your Tax Documents
              </h3>
              <p className="text-slate-600 mb-6">
                Select the documents required for this service and upload them securely.
              </p>
              
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors inline-block"
              >
                Choose File
              </label>
              
              {selectedFile && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-slate-700">
                    Selected: <span className="font-semibold">{selectedFile.name}</span>
                  </p>
                  <p className="text-sm text-slate-600">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => {
                      void handleFileUpload();
                    }}
                    disabled={uploading}
                    className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? "Uploading..." : "Upload Document"}
                  </button>
                </div>
              )}
            </div>

            {/* Uploaded Documents */}
            {serviceDocuments.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Your Uploaded Documents</h3>
                <div className="space-y-3">
                  {serviceDocuments.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📄</span>
                        <div>
                          <div className="font-semibold text-slate-800">{doc.fileName}</div>
                          <div className="text-sm text-slate-600">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          doc.status === "approved" ? "bg-green-100 text-green-800" :
                          doc.status === "reviewed" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {doc.status}
                        </span>
                        {doc.downloadUrl && (
                          <a
                            href={doc.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Authenticated>

        <Unauthenticated>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-200">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Sign In to Upload Documents
            </h3>
            <p className="text-slate-600 mb-6">
              Create an account or sign in to securely upload your tax documents for this service.
            </p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In Now
            </Link>
          </div>
        </Unauthenticated>
      </div>
    </div>
  );
}
