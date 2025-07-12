import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMutation } from 'convex/react';

export function Services() {
  const services = useQuery(api.services.getAllServices);

  if (!services) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const serviceCategories = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Our Tax Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tax solutions tailored to meet your individual and business needs. 
            From simple returns to complex tax planning, we've got you covered.
          </p>
        </div>

        {/* Service Categories */}
        {Object.entries(serviceCategories).map(([category, categoryServices]) => (
          <div key={category} className="mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              {category}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 group"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                    {service.price && (
                      <div className="text-blue-200 font-semibold">Starting at {service.price}</div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {service.requiredDocuments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-800 mb-3">Required Documents:</h4>
                        <ul className="space-y-1">
                          {service.requiredDocuments.slice(0, 3).map((doc, index) => (
                            <li key={index} className="flex items-center text-sm text-slate-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                              {doc}
                            </li>
                          ))}
                          {service.requiredDocuments.length > 3 && (
                            <li className="text-sm text-slate-500 ml-5">
                              +{service.requiredDocuments.length - 3} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <Link
                      to={`/services/${service._id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl block text-center group-hover:shadow-2xl"
                    >
                      Learn More & Upload Documents
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Services Available</h3>
            <p className="text-slate-600">
              Services are currently being updated. Please check back soon.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 lg:p-12 text-white text-center mt-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Every tax situation is unique. If you don't see exactly what you need, 
            let's discuss how we can help with your specific requirements.
          </p>
          <Link
            to="/about"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
}