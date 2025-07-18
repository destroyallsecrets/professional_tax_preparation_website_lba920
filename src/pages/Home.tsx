import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const taxDueDates = useQuery(api.taxTools.getTaxDueDates, { taxYear: 2024 });

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black-light to-black text-gold-light py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Professional
                  <span className="block bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                    Tax Solutions
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gold-light leading-relaxed">
                  Expert tax preparation and consultation services with over 15 years of experience. 
                  Maximize your refunds and minimize your stress.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-gold to-gold-dark text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-dark hover:to-gold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-center"
                >
                  View Services
                </Link>
                <Link
                  to="/tax-tools"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center"
                >
                  Free Tax Tools
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">15+</div>
                  <div className="text-gold-light">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">2000+</div>
                  <div className="text-gold-light">Clients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">98%</div>
                  <div className="text-gold-light">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Quick Tax Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Income</label>
                    <input
                      type="number"
                      placeholder="$75,000"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Filing Status</label>
                    <select 
                      aria-label="Filing Status"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="single">Single</option>
                      <option value="marriedFilingJointly">Married Filing Jointly</option>
                      <option value="marriedFilingSeparately">Married Filing Separately</option>
                      <option value="headOfHousehold">Head of Household</option>
                    </select>
                  </div>
                  <Link
                    to="/tax-tools"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 block text-center"
                  >
                    Calculate Tax
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {/* Services Overview */}
        <section className="py-20 bg-black-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gold mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Individual Tax Preparation",
                  description: "Complete tax return preparation with maximum deduction optimization",
                  icon: "👤",
                  features: ["Form 1040", "Itemized Deductions", "Tax Credits", "E-filing"]
                },
                {
                  title: "Business Tax Services",
                  description: "Comprehensive business tax solutions for all entity types",
                  icon: "🏢",
                  features: ["Corporate Returns", "Partnership Returns", "S-Corp Elections", "Quarterly Filings"]
                },
                {
                  title: "Tax Planning & Consultation",
                  description: "Strategic tax planning to minimize your tax liability",
                  icon: "📊",
                  features: ["Year-round Planning", "Retirement Strategies", "Investment Advice", "Estate Planning"]
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tax Calendar */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gold mb-8 text-center">Tax Calendar</h2>
            {taxDueDates && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {taxDueDates.dueDates.map((date, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-l-4 border-blue-500"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-2">{date.date}</div>
                    <div className="text-slate-800 font-semibold mb-2">{date.description}</div>
                    <div className="text-sm text-slate-500 capitalize">{date.type}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/tax-tools"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Full Tax Calendar
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black-light border-y border-gold">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gold-light mb-8">
              Let us help you navigate your tax journey with confidence.
            </p>
            <Link
              to="/services"
              className="inline-block bg-gold text-black px-8 py-3 rounded-lg hover:bg-gold-dark transition-colors duration-300"
            >
              Explore Our Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
