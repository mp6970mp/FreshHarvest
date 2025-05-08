import { Helmet } from "react-helmet";
import EventManager from "@/components/EventManager";

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin - Adams Shore Supermarket</title>
        <meta name="description" content="Administrative tools for Adams Shore Supermarket." />
      </Helmet>
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading text-center mb-8">Admin Dashboard</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
            Manage your store events and content here.
          </p>
          
          <EventManager />
        </div>
      </div>
    </>
  );
};

export default Admin;