import React, { ReactNode } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiHeadphones,
  FiSend,
  FiHelpCircle,
} from "react-icons/fi";
import PageHeader from "../_components/PageHeader";
import { RiCustomerServiceFill } from "react-icons/ri";

interface ContactInfo {
  icon: ReactNode;
  title: string;
  subTitle: string;
  link?: { label: string; href: string };
}

interface SocialLinkData {
  icon: ReactNode;
  href: string;
}

export default function ContactPage() {
  const contactDetails: ContactInfo[] = [
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone",
      subTitle: "Mon-Fri from 8am to 6pm",
      link: { label: "+1 (800) 123-4567", href: "tel:+18001234567" },
    },
    {
      icon: <FiMail className="text-xl" />,
      title: "Email",
      subTitle: "We'll respond within 24 hours",
      link: {
        label: "support@freshcart.com",
        href: "mailto:support@freshcart.com",
      },
    },
  ];

  const socialLinks: SocialLinkData[] = [
    { icon: <FiFacebook />, href: "#" },
    { icon: <FiTwitter />, href: "#" },
    { icon: <FiInstagram />, href: "#" },
    { icon: <FiLinkedin />, href: "#" },
  ];

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Get in touch with our team."
        breadcrumbSteps={[{ name: "Contact Us" }]}
        icon={<RiCustomerServiceFill className="text-3xl" />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Render Phone & Email using Map */}
            {contactDetails.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {item.subTitle}
                    </p>
                    {item.link && (
                      <a
                        href={item.link.href}
                        className="text-green-600 font-bold hover:underline transition-all"
                      >
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Office Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <FiClock className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Monday - Friday: 8am - 6pm
                    <br />
                    Saturday: 9am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <FiHeadphones className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all bg-white text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="shipping">Shipping Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all resize-none text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-sm shadow-green-600/20 active:scale-95"
                >
                  <FiSend />
                  Send Message
                </button>
              </form>
            </div>

            {/* Help Center CTA */}
            <div className="mt-6 bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-green-600">
                  <FiHelpCircle className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Looking for quick answers?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, and returns.
                  </p>
                  <a
                    href="/help"
                    className="text-green-600 font-bold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Visit Help Center →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
