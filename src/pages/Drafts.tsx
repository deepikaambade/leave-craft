
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DraftsList } from "@/components/drafts/DraftsList";

const Drafts = () => {
  return (
    <MainLayout>
      <DraftsList />
    </MainLayout>
  );
};

export default Drafts;
