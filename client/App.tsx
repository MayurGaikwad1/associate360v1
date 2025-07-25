import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import JobCreate from "./pages/JobCreate";
import JobManagement from "./pages/JobManagement";
import Procurement from "./pages/Procurement";
import AssetManagement from "./pages/AssetManagement";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<JobManagement />} />
            <Route path="/jobs/create" element={<JobCreate />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/assets" element={<AssetManagement />} />
            <Route
              path="/assets/allocate"
              element={
                <Placeholder
                  title="Asset Allocation"
                  description="Allocate assets to associates"
                  features={[
                    "Bulk asset allocation",
                    "Individual asset assignment",
                    "Hardware and software provisioning",
                    "Auto-generate allocation tickets",
                    "Track allocation status",
                  ]}
                />
              }
            />
            <Route
              path="/clearance"
              element={
                <Placeholder
                  title="Clearance Management"
                  description="Handle employee offboarding and asset clearance"
                  features={[
                    "Filter by employee ID, status, LWD range",
                    "Asset matching and recovery tracking",
                    "Clearance status management",
                    "Bulk clearance processing",
                    "Integration with offboarding workflows",
                  ]}
                />
              }
            />
            <Route
              path="/clearance/bulk"
              element={
                <Placeholder
                  title="Bulk Clearance"
                  description="Process multiple employee clearances"
                  features={[
                    "Template-based bulk upload",
                    "Conditional clearance status",
                    "Asset recovery verification",
                    "Auto-generate clearance reports",
                    "Email notifications",
                  ]}
                />
              }
            />
            <Route
              path="/reports"
              element={
                <Placeholder
                  title="Reports & Analytics"
                  description="Generate comprehensive reports and insights"
                  features={[
                    "Associate-level asset history",
                    "Utilization analytics",
                    "Cost tracking reports",
                    "Compliance audit logs",
                    "Custom report generation",
                  ]}
                />
              }
            />
            <Route
              path="/reports/generate"
              element={
                <Placeholder
                  title="Report Generator"
                  description="Create custom reports and analytics"
                  features={[
                    "Pre-built report templates",
                    "Custom query builder",
                    "Export to multiple formats",
                    "Scheduled report delivery",
                    "Dashboard integration",
                  ]}
                />
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
