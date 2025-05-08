import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2, LogOut } from "lucide-react";
import EventManager from "@/components/EventManager";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin/status");
        const data = await response.json();
        
        setIsAdmin(data.isAdmin);
        
        if (!data.isAdmin) {
          setLocation("/admin/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setLocation("/admin/login");
      }
    };
    
    checkAdminStatus();
  }, [setLocation]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred during logout",
        variant: "destructive"
      });
    }
  };

  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Adams Shore Supermarket Admin</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <EventManager />
      </div>
    </div>
  );
};

export default AdminPage;