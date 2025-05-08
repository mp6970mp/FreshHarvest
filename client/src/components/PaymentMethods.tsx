import { CreditCard, DollarSign } from "lucide-react";
import { SiVisa, SiMastercard, SiAmericanexpress, SiDiscover } from "react-icons/si";

const PaymentMethods = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-2xl text-center mb-8">We Accept</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 justify-items-center">
          {/* Credit Cards */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <SiVisa className="text-[#1434CB] text-3xl" />
            </div>
            <span className="text-sm text-gray-600">Visa</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <SiMastercard className="text-[#EB001B] text-3xl" />
            </div>
            <span className="text-sm text-gray-600">Mastercard</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <SiAmericanexpress className="text-[#006FCF] text-3xl" />
            </div>
            <span className="text-sm text-gray-600">Amex</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <SiDiscover className="text-[#FF6000] text-3xl" />
            </div>
            <span className="text-sm text-gray-600">Discover</span>
          </div>
          
          {/* Debit Card */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <CreditCard className="text-gray-700 text-3xl" />
            </div>
            <span className="text-sm text-gray-600">Debit Card</span>
          </div>
          
          {/* SNAP/EBT */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
              <div className="relative">
                <DollarSign className="text-[#6BB438] text-3xl" />
                <span className="absolute -top-1 -right-1 text-xs font-bold bg-white rounded-full border border-[#6BB438] p-0.5">
                  EBT
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-600">SNAP/EBT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;