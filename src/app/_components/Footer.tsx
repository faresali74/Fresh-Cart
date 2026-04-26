import React from "react";
import Link from "next/link";
import {
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiHeadphones,
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiCreditCard,
} from "react-icons/fi";

export default function Footer() {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      icon: <FiTruck className="text-xl" />,
    },
    {
      title: "Easy Returns",
      desc: "14-day return policy",
      icon: <FiRotateCcw className="text-xl" />,
    },
    {
      title: "Secure Payment",
      desc: "100% secure checkout",
      icon: <FiShield className="text-xl" />,
    },
    {
      title: "24/7 Support",
      desc: "Contact us anytime",
      icon: <FiHeadphones className="text-xl" />,
    },
  ];

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Brands", href: "/brands" },
      {
        name: "Electronics",
        href: "/products?category=6439d58a0049ad0b52b9003f",
      },
      {
        name: "Men's Fashion",
        href: "/products?category=6439d2d167d9aa4ca970649f",
      },
    ],
    account: [
      { name: "My Account", href: "/profile/addresses" },
      { name: "Order History", href: "/profile/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Shopping Cart", href: "/cart" },
      { name: "Sign In", href: "/login" },
      { name: "Create Account", href: "/register" },
    ],
    support: [
      { name: "Contact Us", href: "/contacts" },
      { name: "Help Center", href: "/contacts" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Track Order", href: "/order" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer id="footer" className="bg-gray-950 text-white">
      <div className="bg-emerald-50 border-y border-emerald-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-xl px-4 py-2">
                <div className="text-emerald-600 font-black text-2xl tracking-tighter">
                  FreshCart
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-4">
              <FooterContact
                icon={<FiPhone />}
                text="+1 (800) 123-4567"
                href="tel:+18001234567"
              />
              <FooterContact
                icon={<FiMail />}
                text="support@freshcart.com"
                href="mailto:support@freshcart.com"
              />
              <div className="flex items-start gap-3 text-gray-400 text-sm leading-snug">
                <FiMapPin
                  className="text-emerald-500 mt-1 shrink-0"
                  size={18}
                />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-4">
              <SocialIcon icon={<FiFacebook />} href="#" />
              <SocialIcon icon={<FiTwitter />} href="#" />
              <SocialIcon icon={<FiInstagram />} href="#" />
              <SocialIcon icon={<FiYoutube />} href="#" />
            </div>
          </div>

          <FooterGrid title="Shop" links={footerLinks.shop} />
          <FooterGrid title="Account" links={footerLinks.account} />
          <FooterGrid title="Support" links={footerLinks.support} />
          <FooterGrid title="Legal" links={footerLinks.legal} />
        </div>
      </div>

      <div className="border-t border-gray-900 bg-black/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <PaymentMethod name="Visa" />
              <PaymentMethod name="Mastercard" />
              <PaymentMethod name="PayPal" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGrid({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-bold text-gray-100 mb-6 text-sm uppercase tracking-widest">
        {title}
      </h3>
      <ul className="space-y-4">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-emerald-500 transition-colors text-sm font-medium"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-400 hover:text-emerald-500 transition-colors text-sm font-medium group"
    >
      <span className="text-emerald-500 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function PaymentMethod({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium grayscale hover:grayscale-0 transition-all cursor-default">
      <FiCreditCard size={16} className="text-emerald-500/50" />
      <span>{name}</span>
    </div>
  );
}
