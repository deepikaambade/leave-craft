
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { LeaveHistoryList } from "@/components/history/LeaveHistoryList";

const History = () => {
  return (
    <MainLayout>
      <LeaveHistoryList />
    </MainLayout>
  );
};

export default History;
