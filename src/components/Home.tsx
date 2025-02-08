import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Shield, IndianRupee, CheckCircle2, ArrowRight, Star, MapPin, UserCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Building2 className="h-12 w-12 text-brand-500" />,
      title: "Diverse Work Opportunities",
      description: "Access a wide range of jobs across construction, maintenance, and manufacturing sectors."
    },
    {
      icon: <Users className="h-12 w-12 text-brand-500" />,
      title: "Verified Employers",
      description: "Work with trusted employers who have been thoroughly vetted for your safety."
    },
    {
      icon: <Shield className="h-12 w-12 text-brand-500" />,
      title: "Secure Payments",
      description: "Get paid on time, every time with our secure payment protection system."
    },
    {
      icon: <IndianRupee className="h-12 w-12 text-brand-500" />,
      title: "Competitive Wages",
      description: "Earn fair wages that reflect your skills and experience in the industry."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Construction Worker",
      quote: "Labour Connect helped me find consistent work opportunities. I'm now earning better than ever!"
    },
    {
      name: "Priya Singh",
      role: "Electrician",
      quote: "The platform is easy to use and I get regular job notifications. It's changed my work life."
    },
    {
      name: "Mohammed Ali",
      role: "Plumber",
      quote: "Secure payments and verified employers give me peace of mind while working."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-600 to-brand-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Connect with Top Employers & Find Work Today
              </h1>
              <p className="text-xl text-brand-50 mb-8">
                Join thousands of skilled workers finding reliable employment opportunities through our trusted platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn-primary bg-white text-brand-600 hover:bg-brand-50">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/signin" className="btn-primary bg-brand-700/50 hover:bg-brand-700/70 backdrop-blur-sm">
                  Sign In
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/20">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-brand-50">Trusted by 10,000+ workers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-5 lg:items-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-brand-500/30 rounded-full filter blur-3xl"></div>
                </div>
                <div className="relative bg-brand-500/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white/10 p-4 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-2">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div className="h-2 bg-white/20 rounded-full w-16 mb-1"></div>
                        <div className="h-2 bg-white/10 rounded-full w-12"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
              Why Choose Labour Connect?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide the tools and support you need to succeed in your career
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group p-8 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Hear from workers who have transformed their careers with Labour Connect
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-brand-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-display font-semibold text-slate-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-brand-50 mb-8">
              Join Labour Connect today and connect with top employers in your area
            </p>
            <Link
              to="/signup"
              className="btn-primary bg-white text-brand-600 hover:bg-brand-50 inline-flex"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;