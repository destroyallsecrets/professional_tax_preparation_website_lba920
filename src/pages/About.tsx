export function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Meet Your Tax Professional
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Dedicated to providing exceptional tax services with integrity and expertise
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex items-center justify-center">
              <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-6xl text-white">👨‍💼</span>
              </div>
            </div>
            <div className="md:w-2/3 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">John Smith, CPA</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                With over 15 years of experience in tax preparation and financial consulting, 
                I am committed to helping individuals and businesses navigate the complex world 
                of taxation while maximizing their financial benefits.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Specializations</h3>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Individual Tax Returns</li>
                    <li>• Small Business Taxation</li>
                    <li>• Tax Planning & Strategy</li>
                    <li>• IRS Representation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Education</h3>
                  <ul className="space-y-1 text-slate-600">
                    <li>• CPA License (State of California)</li>
                    <li>• MBA in Accounting</li>
                    <li>• Bachelor's in Finance</li>
                    <li>• Annual Continuing Education</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Certified Public Accountant",
              organization: "California Board of Accountancy",
              year: "2008",
              icon: "🏆"
            },
            {
              title: "Enrolled Agent",
              organization: "Internal Revenue Service",
              year: "2010",
              icon: "📋"
            },
            {
              title: "QuickBooks ProAdvisor",
              organization: "Intuit",
              year: "2015",
              icon: "💻"
            }
          ].map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-200"
            >
              <div className="text-3xl mb-4">{cert.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{cert.title}</h3>
              <p className="text-slate-600 mb-2">{cert.organization}</p>
              <p className="text-sm text-slate-500">Licensed since {cert.year}</p>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Professional Journey</h2>
          
          <div className="space-y-8">
            {[
              {
                year: "2008-2012",
                title: "Senior Tax Associate",
                company: "Big Four Accounting Firm",
                description: "Specialized in complex individual and corporate tax returns, gaining extensive experience with high-net-worth clients."
              },
              {
                year: "2012-2018",
                title: "Tax Manager",
                company: "Regional CPA Firm",
                description: "Led a team of tax professionals, managed client relationships, and developed tax planning strategies for small to medium businesses."
              },
              {
                year: "2018-Present",
                title: "Principal & Founder",
                company: "TaxPro Solutions",
                description: "Established independent practice focused on personalized tax services, building long-term client relationships and providing comprehensive tax solutions."
              }
            ].map((experience, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {experience.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{experience.title}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{experience.company}</p>
                  <p className="text-slate-600 leading-relaxed">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">My Commitment to You</h2>
          <blockquote className="text-xl text-slate-600 italic leading-relaxed mb-8">
            "I believe that every client deserves personalized attention and expert guidance. 
            My goal is not just to prepare your taxes, but to help you understand your financial 
            picture and make informed decisions that benefit your long-term financial health."
          </blockquote>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Accuracy</h3>
              <p className="text-slate-600">Meticulous attention to detail ensures error-free returns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Trust</h3>
              <p className="text-slate-600">Building lasting relationships through transparency and integrity</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Innovation</h3>
              <p className="text-slate-600">Staying current with tax law changes and technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
