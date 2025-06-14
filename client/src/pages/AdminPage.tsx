import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentManager from "@/components/ContentManager";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger 
            value="content"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Content Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;