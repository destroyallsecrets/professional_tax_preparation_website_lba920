export function Contact() {
  return (
    <main className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gold-light max-w-2xl mx-auto leading-relaxed">
            Ready to get started? Contact Peayday Taxes & Notary today for professional tax and notary services.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <section className="space-y-8" aria-labelledby="contact-info-heading">
            <div className="bg-black-light rounded-2xl p-6 sm:p-8 border border-gold/30 hover:border-gold/50 transition-colors">
              <h2 id="contact-info-heading" className="text-2xl font-bold text-gold mb-6">Get In Touch</h2>
              
              <address className="space-y-6 not-italic">
                <div className="flex items-start space-x-4 group hover:bg-gold/5 p-3 rounded-lg transition-colors">
                  <div className="text-gold text-xl flex-shrink-0" aria-hidden="true">📍</div>
                  <div>
                    <h3 className="font-semibold text-gold mb-1">Location</h3>
                    <p className="text-gold-light">Indianapolis, IN</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group hover:bg-gold/5 p-3 rounded-lg transition-colors">
                  <div className="text-gold text-xl flex-shrink-0" aria-hidden="true">📞</div>
                  <div>
                    <h3 className="font-semibold text-gold mb-1">Phone</h3>
                    <p className="text-gold-light">Call for appointment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group hover:bg-gold/5 p-3 rounded-lg transition-colors">
                  <div className="text-gold text-xl flex-shrink-0" aria-hidden="true">⏰</div>
                  <div>
                    <h3 className="font-semibold text-gold mb-1">Hours</h3>
                    <p className="text-gold-light">By appointment</p>
                    <p className="text-gold-light text-sm opacity-80">Evening and weekend appointments available</p>
                  </div>
                </div>
              </address>
            </div>

            <div className="bg-black-light rounded-2xl p-8 border border-gold/30 hover:border-gold/50 transition-colors">
              <h2 className="text-2xl font-bold text-gold mb-6">Our Services</h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-gold mb-3 text-base">Tax Services</h3>
                  <ul className="space-y-2 text-gold-light" role="list">
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Individual Returns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Business Returns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Past Year Filings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Tax Planning</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gold mb-3 text-base">Notary Services</h3>
                  <ul className="space-y-2 text-gold-light" role="list">
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Document Notarization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Acknowledgements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Copy Certification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>Fingerprinting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-black-light rounded-2xl p-6 sm:p-8 border border-gold/30 hover:border-gold/50 transition-colors" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="text-2xl font-bold text-gold mb-6">Schedule Consultation</h2>
            
            <form className="space-y-6" noValidate aria-labelledby="contact-form-heading">
              <div>
                <label htmlFor="name-input" className="block text-gold-light mb-2 font-medium">
                  Name <span className="text-red-400" aria-label="required">*</span>
                </label>
                <input
                  id="name-input"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  aria-describedby="name-error"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gold-dark text-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 hover:border-gold/50"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email-input" className="block text-gold-light mb-2 font-medium">
                  Email <span className="text-red-400" aria-label="required">*</span>
                </label>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-describedby="email-error"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gold-dark text-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 hover:border-gold/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone-input" className="block text-gold-light mb-2 font-medium">Phone</label>
                <input
                  id="phone-input"
                  name="phone"
                  type="tel"
                  aria-describedby="phone-help"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gold-dark text-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 hover:border-gold/50"
                  placeholder="(555) 123-4567"
                />
                <p id="phone-help" className="text-xs text-gold-light/70 mt-1">Optional - for faster response</p>
              </div>
              
              <div>
                <label htmlFor="service-select" className="block text-gold-light mb-2">Service Needed</label>
                <select 
                  id="service-select"
                  name="service"
                  aria-label="Select the service you need"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gold-dark text-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="individual-tax">Individual Tax Return</option>
                  <option value="business-tax">Business Tax Return</option>
                  <option value="past-year">Past Year Filing</option>
                  <option value="tax-planning">Tax Planning</option>
                  <option value="notary">Notary Services</option>
                  <option value="audit-support">Audit Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message-input" className="block text-gold-light mb-2 font-medium">Message</label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={4}
                  aria-describedby="message-help"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gold-dark text-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 hover:border-gold/50 resize-vertical"
                  placeholder="Tell us about your tax situation or what documents you need notarized..."
                ></textarea>
                <p id="message-help" className="text-xs text-gold-light/70 mt-1">Provide details about your needs for better assistance</p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gold text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-light active:transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="submit-help"
              >
                Send Message
              </button>
              <p id="submit-help" className="text-xs text-gold-light/70 text-center">We'll respond within 24 hours</p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}