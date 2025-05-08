import { CreditCard, Wallet, DollarSign } from "lucide-react";

const PaymentBanner = () => {
  return (
    <section className="bg-primary text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
          <div className="flex items-center">
            <CreditCard className="mr-2" size={24} />
            <span>Accepts Credit Cards</span>
          </div>
          <div className="flex items-center">
            <Wallet className="mr-2" size={24} />
            <span>Accepts Debit Cards</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2" size={24} />
            <span>Accepts SNAP/EBT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentBanner;
