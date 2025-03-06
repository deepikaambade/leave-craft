
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

const Index = () => {
  // For demo purposes, we'll just simulate a user session and redirect to dashboard
  // In a real app, this would check authentication
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
};

export default Index;
