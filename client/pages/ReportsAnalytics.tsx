import { useState } from "react";
import {
  BarChart,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  Eye,
  ExternalLink,
  Plus,
  Settings,
  User,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface AssetHistory {
  id: string;
  associateId: string;
  associateName: string;
  assetId: string;
  assetName: string;
  serialNumber: string;
  action: "Allocated" | "Returned" | "Transferred" | "Maintenance" | "Disposed";
  actionDate: string;
  actionBy: string;
  previousLocation?: string;
  newLocation?: string;
  condition?: string;
  notes?: string;
  cost?: number;
  department: string;
}

interface UtilizationReport {
  category: string;
  totalAssets: number;
  allocatedAssets: number;
  utilizationRate: number;
  averageUsageDays: number;
  costPerDay: number;
  trend: "up" | "down" | "stable";
}

interface CostReport {
  id: string;
  period: string;
  category: string;
  department: string;
  totalCost: number;
  acquisitionCost: number;
  maintenanceCost: number;
  operationalCost: number;
  disposalCost: number;
  roi: number;
  budgetVariance: number;
}

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: any;
  ipAddress: string;
  userAgent: string;
  status: "Success" | "Failed" | "Warning";
  riskLevel: "Low" | "Medium" | "High";
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  type:
    | "Asset History"
    | "Utilization"
    | "Cost Analysis"
    | "Compliance"
    | "Custom Query";
  filters: any;
  schedule?: string;
  format: "PDF" | "Excel" | "CSV";
  recipients?: string[];
  createdBy: string;
  createdDate: string;
  lastRun?: string;
  status: "Active" | "Draft" | "Archived";
}

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [customReportForm, setCustomReportForm] = useState({
    name: "",
    description: "",
    type: "",
    filters: {},
    schedule: "",
    format: "PDF" as "PDF" | "Excel" | "CSV",
    recipients: "",
  });

  // Mock data
  const assetHistory: AssetHistory[] = [
    {
      id: "AH-001",
      associateId: "EMP-001",
      associateName: "Alex Thompson",
      assetId: "AST-LP-001",
      assetName: 'MacBook Pro 16"',
      serialNumber: "MB-2024-001",
      action: "Allocated",
      actionDate: "2024-01-20",
      actionBy: "Asset Team",
      newLocation: "Remote - Home Office",
      condition: "New",
      cost: 2499,
      department: "Design Department",
    },
    {
      id: "AH-002",
      associateId: "EMP-002",
      associateName: "John Smith",
      assetId: "AST-PHN-004",
      assetName: "iPhone 15 Pro",
      serialNumber: "IP-2024-004",
      action: "Returned",
      actionDate: "2024-01-25",
      actionBy: "John Smith",
      previousLocation: "Remote - Home Office",
      newLocation: "IT Warehouse",
      condition: "Good",
      cost: 999,
      department: "IT Department",
    },
    {
      id: "AH-003",
      associateId: "EMP-003",
      associateName: "Sarah Wilson",
      assetId: "AST-LP-002",
      assetName: "Dell XPS 15",
      serialNumber: "DL-2024-002",
      action: "Maintenance",
      actionDate: "2024-01-28",
      actionBy: "IT Support",
      condition: "Fair",
      notes: "Battery replacement required",
      cost: 150,
      department: "Analytics Department",
    },
  ];

  const utilizationReports: UtilizationReport[] = [
    {
      category: "Laptops",
      totalAssets: 25,
      allocatedAssets: 22,
      utilizationRate: 88,
      averageUsageDays: 180,
      costPerDay: 13.88,
      trend: "up",
    },
    {
      category: "Mobile Phones",
      totalAssets: 30,
      allocatedAssets: 25,
      utilizationRate: 83,
      averageUsageDays: 365,
      costPerDay: 2.74,
      trend: "stable",
    },
    {
      category: "Monitors",
      totalAssets: 35,
      allocatedAssets: 30,
      utilizationRate: 86,
      averageUsageDays: 200,
      costPerDay: 2.99,
      trend: "down",
    },
    {
      category: "Software Licenses",
      totalAssets: 50,
      allocatedAssets: 42,
      utilizationRate: 84,
      averageUsageDays: 365,
      costPerDay: 1.64,
      trend: "up",
    },
  ];

  const costReports: CostReport[] = [
    {
      id: "CR-001",
      period: "2024 Q1",
      category: "Hardware",
      department: "IT Department",
      totalCost: 125000,
      acquisitionCost: 100000,
      maintenanceCost: 15000,
      operationalCost: 8000,
      disposalCost: 2000,
      roi: 15.2,
      budgetVariance: -5.8,
    },
    {
      id: "CR-002",
      period: "2024 Q1",
      category: "Software",
      department: "All Departments",
      totalCost: 75000,
      acquisitionCost: 60000,
      maintenanceCost: 10000,
      operationalCost: 5000,
      disposalCost: 0,
      roi: 22.1,
      budgetVariance: 3.2,
    },
    {
      id: "CR-003",
      period: "2024 Q1",
      category: "Mobile Devices",
      department: "Sales Department",
      totalCost: 45000,
      acquisitionCost: 35000,
      maintenanceCost: 5000,
      operationalCost: 4000,
      disposalCost: 1000,
      roi: 18.7,
      budgetVariance: -2.1,
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: "AL-001",
      timestamp: "2024-02-10 14:30:25",
      userId: "USR-001",
      userName: "John Manager",
      action: "Asset Allocation",
      resource: "Asset",
      resourceId: "AST-LP-001",
      changes: { status: "Available → Allocated", assignedTo: "Alex Thompson" },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "Success",
      riskLevel: "Low",
    },
    {
      id: "AL-002",
      timestamp: "2024-02-10 15:45:12",
      userId: "USR-002",
      userName: "Asset Admin",
      action: "Bulk Asset Update",
      resource: "Multiple Assets",
      resourceId: "BULK-001",
      changes: { count: 15, action: "Status Update" },
      ipAddress: "192.168.1.150",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "Success",
      riskLevel: "Medium",
    },
    {
      id: "AL-003",
      timestamp: "2024-02-10 16:20:33",
      userId: "USR-003",
      userName: "System Admin",
      action: "Failed Login Attempt",
      resource: "Authentication",
      resourceId: "AUTH-001",
      ipAddress: "203.0.113.45",
      userAgent: "Unknown",
      status: "Failed",
      riskLevel: "High",
    },
  ];

  const customReports: CustomReport[] = [
    {
      id: "RPT-001",
      name: "Monthly Asset Utilization",
      description:
        "Monthly report showing asset utilization across all departments",
      type: "Utilization",
      filters: { department: "all", period: "monthly" },
      schedule: "Monthly",
      format: "PDF",
      recipients: ["manager@company.com", "admin@company.com"],
      createdBy: "System Admin",
      createdDate: "2024-01-15",
      lastRun: "2024-02-01",
      status: "Active",
    },
    {
      id: "RPT-002",
      name: "Cost Analysis Q1",
      description: "Quarterly cost analysis and budget variance report",
      type: "Cost Analysis",
      filters: { period: "quarterly", year: "2024" },
      format: "Excel",
      recipients: ["finance@company.com"],
      createdBy: "Finance Team",
      createdDate: "2024-01-20",
      lastRun: "2024-01-31",
      status: "Active",
    },
    {
      id: "RPT-003",
      name: "Compliance Audit Trail",
      description: "Weekly compliance and audit log summary",
      type: "Compliance",
      filters: { riskLevel: "medium-high", period: "weekly" },
      schedule: "Weekly",
      format: "CSV",
      recipients: ["compliance@company.com"],
      createdBy: "Compliance Officer",
      createdDate: "2024-01-25",
      status: "Draft",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      case "stable":
        return <div className="w-4 h-0.5 bg-gray-600"></div>;
      default:
        return null;
    }
  };

  const filteredAuditLogs = auditLogs.filter(
    (log) =>
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateCustomReport = () => {
    const newReport: CustomReport = {
      id: `RPT-${Date.now()}`,
      name: customReportForm.name,
      description: customReportForm.description,
      type: customReportForm.type as any,
      filters: customReportForm.filters,
      schedule: customReportForm.schedule,
      format: customReportForm.format,
      recipients: customReportForm.recipients
        .split(",")
        .map((email) => email.trim()),
      createdBy: "Current User",
      createdDate: new Date().toISOString().split("T")[0],
      status: "Draft",
    };

    customReports.push(newReport);
    setShowCustomReportModal(false);
    setCustomReportForm({
      name: "",
      description: "",
      type: "",
      filters: {},
      schedule: "",
      format: "PDF",
      recipients: "",
    });
    alert("Custom report created successfully!");
  };

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reports & Analytics
            </h1>
            <p className="text-gray-600">
              Comprehensive insights and analytics for asset management
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Dashboard
            </Button>
            <Button onClick={() => setShowCustomReportModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* Global Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="IT Department">IT Department</SelectItem>
                    <SelectItem value="Design Department">
                      Design Department
                    </SelectItem>
                    <SelectItem value="Analytics Department">
                      Analytics Department
                    </SelectItem>
                    <SelectItem value="Sales Department">
                      Sales Department
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Asset Value
                  </p>
                  <p className="text-2xl font-bold">$2.4M</p>
                  <p className="text-xs text-green-600">
                    ↑ 12% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Utilization Rate
                  </p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-blue-600">↑ 3% from last month</p>
                </div>
                <BarChart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Associates
                  </p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-purple-600">→ No change</p>
                </div>
                <User className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Compliance Score
                  </p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-green-600">↑ 2% from last month</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="asset-history">Asset History</TabsTrigger>
          <TabsTrigger value="utilization">Utilization Analytics</TabsTrigger>
          <TabsTrigger value="cost-tracking">Cost Tracking</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation Trends</CardTitle>
                <CardDescription>
                  Monthly asset allocation and return patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">January 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">February 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">March 2024</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Cost Breakdown</CardTitle>
                <CardDescription>
                  Asset costs by department for current quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">IT Department</span>
                    <span className="text-sm font-medium">$125k (45%)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Design Department</span>
                    <span className="text-sm font-medium">$89k (32%)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sales Department</span>
                    <span className="text-sm font-medium">$45k (16%)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Analytics Department</span>
                    <span className="text-sm font-medium">$19k (7%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Summary</CardTitle>
                <CardDescription>
                  Latest asset management activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        15 assets allocated this week
                      </p>
                      <p className="text-xs text-gray-500">
                        Mostly laptops and mobile devices
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        8 maintenance requests completed
                      </p>
                      <p className="text-xs text-gray-500">
                        Average resolution time: 2.3 days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        3 compliance alerts resolved
                      </p>
                      <p className="text-xs text-gray-500">
                        All within SLA timeframes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Insights</CardTitle>
                <CardDescription>
                  AI-powered predictions and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Recommendation
                    </p>
                    <p className="text-sm text-blue-700">
                      Consider bulk purchase of monitors - 23% cost savings
                      predicted
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Alert</p>
                    <p className="text-sm text-yellow-700">
                      12 assets approaching warranty expiration next month
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Insight
                    </p>
                    <p className="text-sm text-green-700">
                      Asset utilization up 15% - optimization working well
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="asset-history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Associate-Level Asset History</CardTitle>
                  <CardDescription>
                    Detailed tracking of all asset movements and changes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by associate or asset..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Associate</TableHead>
                    <TableHead>Asset Details</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Cost Impact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {record.associateName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {record.associateId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.assetName}</div>
                          <div className="text-sm text-gray-500">
                            {record.serialNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.action)}>
                          {record.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.actionDate}</TableCell>
                      <TableCell>
                        {record.cost ? `$${record.cost.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Category Utilization</CardTitle>
                <CardDescription>
                  Utilization rates across different asset categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {utilizationReports.map((report) => (
                    <div key={report.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {report.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(report.trend)}
                          <span className="text-sm">
                            {report.utilizationRate}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={report.utilizationRate}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {report.allocatedAssets}/{report.totalAssets}{" "}
                          allocated
                        </span>
                        <span>${report.costPerDay}/day</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilization Trends</CardTitle>
                <CardDescription>
                  Monthly utilization patterns and forecasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        87%
                      </div>
                      <div className="text-sm text-gray-500">Current Month</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        91%
                      </div>
                      <div className="text-sm text-gray-500">Forecast</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        85%
                      </div>
                      <div className="text-sm text-gray-500">Target</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Optimization Opportunities</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">
                          Monitors
                        </p>
                        <p className="text-xs text-blue-700">
                          5 underutilized units - consider reallocation
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                          Software Licenses
                        </p>
                        <p className="text-xs text-green-700">
                          High utilization - consider bulk renewal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Utilization Metrics</CardTitle>
              <CardDescription>
                Comprehensive utilization data by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Assets</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Utilization Rate</TableHead>
                    <TableHead>Avg Usage Days</TableHead>
                    <TableHead>Cost/Day</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {utilizationReports.map((report) => (
                    <TableRow key={report.category}>
                      <TableCell className="font-medium">
                        {report.category}
                      </TableCell>
                      <TableCell>{report.totalAssets}</TableCell>
                      <TableCell>{report.allocatedAssets}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={report.utilizationRate}
                            className="w-20 h-2"
                          />
                          <span className="text-sm">
                            {report.utilizationRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{report.averageUsageDays}</TableCell>
                      <TableCell>${report.costPerDay}</TableCell>
                      <TableCell>{getTrendIcon(report.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-tracking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Asset Investment
                    </p>
                    <p className="text-3xl font-bold">$2.4M</p>
                    <p className="text-sm text-green-600">↑ 8.2% ROI</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly OpEx
                    </p>
                    <p className="text-3xl font-bold">$45k</p>
                    <p className="text-sm text-red-600">↑ 3.1% over budget</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Cost per Employee
                    </p>
                    <p className="text-3xl font-bold">$9.7k</p>
                    <p className="text-sm text-green-600">↓ 2.5% from target</p>
                  </div>
                  <User className="h-12 w-12 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis by Period</CardTitle>
              <CardDescription>
                Detailed cost breakdown and budget variance analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Acquisition</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Budget Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        {report.period}
                      </TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{report.department}</TableCell>
                      <TableCell>
                        ${report.totalCost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${report.acquisitionCost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${report.maintenanceCost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            report.roi > 15 ? "text-green-600" : "text-red-600"
                          }
                        >
                          {report.roi}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            report.budgetVariance > 0
                              ? "text-red-600"
                              : "text-green-600"
                          }
                        >
                          {report.budgetVariance > 0 ? "+" : ""}
                          {report.budgetVariance}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-green-800">
                      Bulk License Renewal
                    </h4>
                    <p className="text-sm text-gray-600">
                      Potential savings: $15,000/year
                    </p>
                    <p className="text-xs text-gray-500">
                      Consolidate software licenses across departments
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-blue-800">
                      Asset Lifecycle Extension
                    </h4>
                    <p className="text-sm text-gray-600">
                      Potential savings: $8,500/year
                    </p>
                    <p className="text-xs text-gray-500">
                      Extend laptop lifecycle to 4 years with upgrades
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-orange-800">
                      Maintenance Contract Optimization
                    </h4>
                    <p className="text-sm text-gray-600">
                      Potential savings: $5,200/year
                    </p>
                    <p className="text-xs text-gray-500">
                      Renegotiate maintenance contracts for better rates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hardware</span>
                      <span>$125k / $130k</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Software</span>
                      <span>$75k / $72k</span>
                    </div>
                    <Progress value={104} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Maintenance</span>
                      <span>$30k / $35k</span>
                    </div>
                    <Progress value={86} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Operations</span>
                      <span>$17k / $20k</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit-logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Audit Logs</CardTitle>
                  <CardDescription>
                    Detailed audit trail for regulatory compliance
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search audit logs..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.userName}</div>
                          <div className="text-sm text-gray-500">
                            {log.userId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{log.resource}</div>
                          <div className="text-sm text-gray-500">
                            {log.resourceId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(log.riskLevel)}>
                          {log.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOX Compliance</span>
                    <Badge className="bg-green-100 text-green-800">
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Data Protection</span>
                    <Badge className="bg-green-100 text-green-800">
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">ISO 27001 Security</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Review Required
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Asset Tracking</span>
                    <Badge className="bg-green-100 text-green-800">
                      Compliant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Failed Login Attempts</span>
                      <span>3 this week</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Unauthorized Access Attempts</span>
                      <span>0 this month</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Data Export Requests</span>
                      <span>12 this month</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom-reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Report Generation</CardTitle>
                  <CardDescription>
                    Create and manage custom reports with flexible parameters
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCustomReportModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-gray-500">
                            {report.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.type}</Badge>
                      </TableCell>
                      <TableCell>{report.schedule || "Manual"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.format}</Badge>
                      </TableCell>
                      <TableCell>{report.lastRun || "Never"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Asset Inventory Report
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <BarChart className="w-4 h-4 mr-2" />
                    Utilization Summary
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Cost Analysis
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Associate Assets
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Monthly Utilization</span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Quarterly Cost Analysis</span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Weekly Compliance</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Draft
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export to CSV
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Send via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Custom Report Modal */}
      <Dialog
        open={showCustomReportModal}
        onOpenChange={setShowCustomReportModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
            <DialogDescription>
              Configure a custom report with specific parameters and scheduling
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  value={customReportForm.name}
                  onChange={(e) =>
                    setCustomReportForm({
                      ...customReportForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter report name"
                />
              </div>

              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select
                  value={customReportForm.type}
                  onValueChange={(value) =>
                    setCustomReportForm({ ...customReportForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asset History">Asset History</SelectItem>
                    <SelectItem value="Utilization">Utilization</SelectItem>
                    <SelectItem value="Cost Analysis">Cost Analysis</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Custom Query">Custom Query</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={customReportForm.description}
                onChange={(e) =>
                  setCustomReportForm({
                    ...customReportForm,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what this report will contain"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Select
                  value={customReportForm.schedule}
                  onValueChange={(value) =>
                    setCustomReportForm({
                      ...customReportForm,
                      schedule: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format">Format</Label>
                <Select
                  value={customReportForm.format}
                  onValueChange={(value) =>
                    setCustomReportForm({
                      ...customReportForm,
                      format: value as "PDF" | "Excel" | "CSV",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recipients">Recipients (Optional)</Label>
                <Input
                  id="recipients"
                  value={customReportForm.recipients}
                  onChange={(e) =>
                    setCustomReportForm({
                      ...customReportForm,
                      recipients: e.target.value,
                    })
                  }
                  placeholder="email1@domain.com, email2@domain.com"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCustomReportModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateCustomReport}>Create Report</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
