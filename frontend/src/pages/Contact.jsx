import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../components/common/Footer";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contact Section */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-cyan-800 mb-4">
            📚 Contact Us
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Have a question or need help with books? Feel free to reach out to us.
            Our team will get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
                Get in Touch
              </h2>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-cyan-600" />
                <p className="text-gray-700">library@example.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-cyan-600" />
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
                <p className="text-gray-700">
                  Tranzo, Knowledge Park III <br />
                  Greater Noida, Uttar Pradesh
                </p>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-cyan-700">
                  Library Hours
                </h3>
                <p className="text-gray-600 mt-2">Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
                Send a Message
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold px-4 py-3 rounded-lg transition"
                >
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-12">
            <iframe
              title="Library Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.8711572592!2d77.06889995!3d28.5272802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a6ed0a7b5f%3A0x123456789abcdef!2sSharda%20University!5e0!3m2!1sen!2sin!4v1631796298912!5m2!1sen!2sin"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl shadow-md"
            ></iframe>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
