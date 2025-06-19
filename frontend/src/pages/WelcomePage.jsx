import { useConnect, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import WalletConnectModal from "../components/modals/WalletConnectModal";
import LoadingScreen from "../components/LoadingScreen";

const WelcomePage = ({ onConnect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { error } = useConnect({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsLoading(true);
      // Give a small delay to ensure the connection is properly established
      setTimeout(() => {
        onConnect(address);
      }, 1000);
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to connect wallet. Please try again.");
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingScreen message="Checking wallet status..." />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-light opacity-50"></div>
        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AfterLife Protocol
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Secure your digital legacy and ensure your assets reach your loved
            ones. The future of inheritance, powered by blockchain.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-yellow-400 font-medium">
              ⚠️ This dApp works only on the Sepolia Testnet. Please switch your
              network before connecting.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-primary hover:bg-primary-dark rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Connect Wallet
            </button>
            <p className="text-sm text-gray-400">
              Your digital legacy, secured on the blockchain
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background-light py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AfterLife Protocol?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Secure Storage"
              description="Your assets are securely stored on the blockchain until your nominees can claim them."
              icon="🔒"
            />
            <FeatureCard
              title="Smart Distribution"
              description="Set up multiple nominees with custom share percentages for your assets."
              icon="📊"
            />
            <FeatureCard
              title="Full Control"
              description="Maintain complete control over your assets with regular check-ins."
              icon="🎯"
            />
          </div>
        </div>
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-6 rounded-lg bg-background hover:bg-background-dark transition-all duration-200 transform hover:scale-105">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default WelcomePage;
