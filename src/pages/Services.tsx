import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useMutation } from 'convex/react';

export function Services() {
  const services = useQuery(api.services.getAllServices);

  if (!services) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
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
          <h1 className="text-5xl lg:text-6xl font-bold text-gold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gold-light max-w-3xl mx-auto leading-relaxed">
            Comprehensive tax solutions tailored to meet your individual and business needs. 
            From simple returns to complex tax planning, we've got you covered.
          </p>
        </div>

        <div className="space-y-12">
          <header className="text-center py-12 bg-black-light">
            <h1 className="text-4xl font-bold text-gold">Our Services</h1>
            <p className="text-gold-light mt-4">Comprehensive tax solutions for every need</p>
          </header>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service._id} className="p-6 rounded-lg bg-black-light border border-gold-dark">
                <h2 className="text-2xl font-semibold text-gold mb-4">{service.name}</h2>
                <p className="text-gold-light">{service.description}</p>
                <Link 
                  to={`/services/${service._id}`}
                  className="mt-4 inline-block px-6 py-2 bg-gold text-black hover:bg-gold-dark rounded"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-bold text-gold mb-4">No Services Available</h3>
            <p className="text-gold-light">
              Please check back later for our available services.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black to-black-light rounded-3xl p-8 lg:p-12 text-gold text-center mt-16 border border-gold/30">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gold-light mb-8 leading-relaxed">
            Every tax situation is unique. If you don't see exactly what you need, 
            let's discuss how we can help with your specific requirements.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-gold to-gold-dark text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-dark hover:to-gold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}