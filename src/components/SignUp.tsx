import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, CheckCircle2, Briefcase, Clock, MapPin, IndianRupee, Shield, Users, Building2 } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Briefcase className="h-6 w-6 text-brand-500" />,
      title: "Diverse Work Opportunities",
      description: "Access jobs in construction, maintenance, manufacturing, and more"
    },
    {
      icon: <IndianRupee className="h-6 w-6 text-brand-500" />,
      title: "Competitive Pay",
      description: "Earn fair wages with transparent payment systems"
    },
    {
      icon: <Shield className="h-6 w-6 text-brand-500" />,
      title: "Secure Platform",
      description: "Work with verified employers and guaranteed payments"
    }
  ];

  const categories = [
    "Construction Workers",
    "Electricians",
    "Plumbers",
    "Carpenters",
    "Painters",
    "Factory Workers",
    "Maintenance Staff"
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] flex">
      {/* Left Side - Service Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-700 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-4">
            Join India's Leading Labour Platform
          </h1>
          <p className="text-lg text-brand-50 mb-12">
            Connect with thousands of employers and find reliable work opportunities in your area
          </p>

          <div className="space-y-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-brand-50 mt-1">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Available Job Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-brand-50">
                Join 10,000+ workers who have found success through our platform
              </p>
              <div className="flex items-center mt-1">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-brand-500/20 border-2 border-white/20 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-white/60" />
                    </div>
                  ))}
                </div>
                <span className="ml-2 font-medium">Active Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-slate-800">Create Your Account</h2>
            <p className="text-slate-500 mt-2">Join thousands of skilled workers finding great opportunities</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Choose a strong password"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                <UserPlus className="h-5 w-5" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-slate-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-brand-600 hover:text-brand-700 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8">
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-medium text-slate-700 mb-4">Platform Benefits:</h3>
              <ul className="space-y-3">
                {[
                  "Verified employers and secure payments",
                  "Daily, weekly, or monthly payment options",
                  "Free skill development resources",
                  "24/7 support in multiple languages",
                  "Insurance coverage for workplace safety"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;