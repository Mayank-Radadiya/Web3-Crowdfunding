import {
  Coins,
  Lightbulb,
  Users,
  Rocket,
  Shield,
  Globe,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";

export default function LandingPage() {
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation("/");
  };
  return (
    <div className="min-h-screen bg-[#0F0F13] text-white">
      {/* Navigation */}
      <header className="border-b border-gray-800 bg-[#0F0F13]/90 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">CryptoFund</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
          </nav>

          <div>
            <button
              onClick={handleNavigation}
              className="bg-gradient-to-r from-violet-500 to-teal-400 hover:from-violet-600 hover:to-teal-500 text-white border-0 px-4 py-2 rounded-[10px]"
            >
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">Discover and Support</span>
              <span className="bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                Innovative Campaigns
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg md:text-xl mb-8">
              Fund groundbreaking ideas, creative projects, and meaningful
              causes. Join our community of changemakers on the blockchain.
            </p>
            <div className="flex items-center">
              <button className="bg-gradient-to-r from-violet-500 to-teal-400 hover:from-violet-600 hover:to-teal-500 text-white border-0 px-8 py-6 text-lg rounded-[10px]">
                Create a campaign
              </button>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mt-12">
            <img
              src={logo}
              alt="Blockchain Crowdfunding Platform"
              className="object-cover opacity-85 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-teal-400/20 mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                30+
              </p>
              <p className="text-gray-400 mt-2">Successful Campaigns</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                200+ ETH
              </p>
              <p className="text-gray-400 mt-2">Total Funded</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                500+
              </p>
              <p className="text-gray-400 mt-2">Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our blockchain-powered platform makes crowdfunding transparent,
              secure, and accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-violet-500/50 transition">
              <div className="w-12 h-12 rounded-[5px] bg-gradient-to-r from-violet-500 to-teal-400 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create a Campaign</h3>
              <p className="text-gray-400">
                Share your innovative idea or project with our community. Set
                your funding goal in ETH and campaign duration.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-[5px]  border border-gray-700 hover:border-teal-500/50 transition">
              <div className="w-12 h-12 rounded-[5px]  bg-gradient-to-r from-violet-500 to-teal-400 flex items-center justify-center mb-6">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Funding</h3>
              <p className="text-gray-400">
                Supporters contribute ETH directly to your campaign through our
                secure smart contracts on the blockchain.
              </p>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-[5px]  border border-gray-700 hover:border-violet-500/50 transition">
              <div className="w-12 h-12 rounded-[5px]  bg-gradient-to-r from-violet-500 to-teal-400 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Launch Your Project</h3>
              <p className="text-gray-400">
                Once your campaign reaches its goal, funds are released to you
                to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CryptoFund
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform offers unique advantages powered by blockchain
              technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-teal-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure & Transparent</h3>
                <p className="text-gray-400">
                  All transactions are recorded on the blockchain, ensuring
                  complete transparency and security for both creators and
                  backers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-gray-400">
                  Connect with supporters worldwide without geographical
                  limitations or currency conversion issues.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Community-Driven</h3>
                <p className="text-gray-400">
                  Join a vibrant community of innovators and supporters
                  passionate about bringing new ideas to life.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Lower Fees</h3>
                <p className="text-gray-400">
                  Blockchain technology eliminates intermediaries, resulting in
                  lower fees compared to traditional crowdfunding platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Campaign Categories
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover innovative projects across various categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-violet-500/50 transition text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold">Technology</h3>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-violet-500/50 transition text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold">Environment</h3>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-violet-500/50 transition text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold">Community</h3>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-violet-500/50 transition text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500/20 to-teal-400/20 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-bold">Innovation</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-violet-500/10 to-teal-400/10 rounded-2xl p-8 md:p-12 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Launch Your Idea?
                </h2>
                <p className="text-gray-400 mb-6">
                  Join our community of innovators and bring your vision to life
                  with blockchain-powered crowdfunding.
                </p>
                <button className="bg-gradient-to-r from-violet-500 to-teal-400 hover:from-violet-600 hover:to-teal-500 text-white border-0 px-6 py-6 text-lg rounded-[15px] inline-flex items-center">
                  Visit Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={logo}
                  alt="Create a campaign"
                  className="object-fit w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-teal-400/20 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
