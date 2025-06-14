import { CreditCard, DollarSign } from "lucide-react";
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover } from "react-icons/si";

const PaymentMethods = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Accepted Payment Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* Credit Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-[#1434CB] to-[#1A1F71] rounded-lg p-4 flex items-center justify-center">
                <SiVisa className="text-white text-5xl" />
              </div>
              <span className="text-lg font-semibold text-gray-800">Visa</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-[#EB001B] to-[#FF5F00] rounded-lg p-4 flex items-center justify-center">
                <SiMastercard className="text-white text-5xl" />
              </div>
              <span className="text-lg font-semibold text-gray-800">Mastercard</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-[#2E77BB] to-[#006FCF] rounded-lg p-4 flex items-center justify-center">
                <SiAmericanexpress className="text-white text-5xl" />
              </div>
              <span className="text-lg font-semibold text-gray-800">American Express</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-[#FF6000] to-[#FF8C00] rounded-lg p-4 flex items-center justify-center">
                <SiDiscover className="text-white text-5xl" />
              </div>
              <span className="text-lg font-semibold text-gray-800">Discover</span>
            </div>
          </div>
        </div>

        {/* Additional Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-4 flex items-center justify-center">
                <CreditCard className="text-white w-16 h-16" />
              </div>
              <span className="text-lg font-semibold text-gray-800">Debit Cards</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full aspect-[1.586] bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-4 flex items-center justify-center">
                <DollarSign className="text-white w-16 h-16" />
              </div>
              <span className="text-lg font-semibold text-gray-800">SNAP/EBT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;