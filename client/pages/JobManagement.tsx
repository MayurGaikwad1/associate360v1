import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  Download,
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

interface Job {
  id: string;
  title: string;
  department: string;
  hod: string;
  experience: string;
  doj: string;
  status:
    | "Draft"
    | "Pending Approval"
    | "Approved"
    | "In Progress"
    | "Filled"
    | "Cancelled";
  candidates: number;
  createdAt: string;
  updatedAt: string;
  jiraTicket?: string;
  priority: "High" | "Medium" | "Low";
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  status:
    | "Applied"
    | "Screening"
    | "Interview"
    | "Selected"
    | "Rejected"
    | "Offered"
    | "Joined";
  appliedDate: string;
  jobId: string;
}

export default function JobManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState("jobs");

  // Mock data
  const jobs: Job[] = [
    {
      id: "JOB-2024-0156",
      title: "Senior Software Developer",
      department: "IT Department",
      hod: "John Manager",
      experience: "5-8 years",
      doj: "2024-02-15",
      status: "Approved",
      candidates: 12,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-18",
      jiraTicket: "HIRE-123",
      priority: "High",
    },
    {
      id: "JOB-2024-0157",
      title: "UI/UX Designer",
      department: "Design Department",
      hod: "Sarah Design",
      experience: "3-5 years",
      doj: "2024-02-20",
      status: "In Progress",
      candidates: 8,
      createdAt: "2024-01-16",
      updatedAt: "2024-01-20",
      jiraTicket: "HIRE-124",
      priority: "Medium",
    },
    {
      id: "JOB-2024-0158",
      title: "DevOps Engineer",
      department: "IT Department",
      hod: "John Manager",
      experience: "3-5 years",
      doj: "2024-03-01",
      status: "Pending Approval",
      candidates: 0,
      createdAt: "2024-01-18",
      updatedAt: "2024-01-18",
      priority: "High",
    },
    {
      id: "JOB-2024-0159",
      title: "Data Analyst",
      department: "Analytics Department",
      hod: "Mike Analytics",
      experience: "1-3 years",
      doj: "2024-02-25",
      status: "Filled",
      candidates: 15,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-25",
      jiraTicket: "HIRE-125",
      priority: "Low",
    },
    {
      id: "JOB-2024-0160",
      title: "Product Manager",
      department: "Product Department",
      hod: "Lisa Product",
      experience: "5-8 years",
      doj: "2024-02-28",
      status: "Draft",
      candidates: 0,
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
      priority: "Medium",
    },
  ];

  const candidates: Candidate[] = [
    {
      id: "CAND-001",
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      phone: "+1-555-0123",
      experience: "6 years",
      status: "Selected",
      appliedDate: "2024-01-16",
      jobId: "JOB-2024-0156",
    },
    {
      id: "CAND-002",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1-555-0124",
      experience: "4 years",
      status: "Interview",
      appliedDate: "2024-01-17",
      jobId: "JOB-2024-0157",
    },
    {
      id: "CAND-003",
      name: "David Chen",
      email: "david.chen@email.com",
      phone: "+1-555-0125",
      experience: "5 years",
      status: "Screening",
      appliedDate: "2024-01-18",
      jobId: "JOB-2024-0156",
    },
    {
      id: "CAND-004",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1-555-0126",
      experience: "7 years",
      status: "Offered",
      appliedDate: "2024-01-19",
      jobId: "JOB-2024-0156",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Pending Approval":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "In Progress":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "Filled":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "Draft":
        return <Edit className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Filled":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "bg-green-100 text-green-800";
      case "Offered":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-yellow-100 text-yellow-800";
      case "Screening":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Applied":
        return "bg-gray-100 text-gray-800";
      case "Joined":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.hod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || job.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const JobDetailsDialog = ({ job }: { job: Job }) => (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {job.title}
          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
        </DialogTitle>
        <DialogDescription>Job ID: {job.id}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Job Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Department:</span>{" "}
                {job.department}
              </div>
              <div>
                <span className="font-medium">HOD:</span> {job.hod}
              </div>
              <div>
                <span className="font-medium">Experience:</span>{" "}
                {job.experience}
              </div>
              <div>
                <span className="font-medium">Expected DOJ:</span> {job.doj}
              </div>
              <div>
                <span className="font-medium">Priority:</span> {job.priority}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Status & Tracking</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Created:</span> {job.createdAt}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>{" "}
                {job.updatedAt}
              </div>
              <div>
                <span className="font-medium">Candidates:</span>{" "}
                {job.candidates}
              </div>
              {job.jiraTicket && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">JIRA Ticket:</span>
                  <a
                    href="#"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {job.jiraTicket}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Candidate Pipeline</h3>
          <div className="space-y-2">
            {candidates
              .filter((c) => c.jobId === job.id)
              .map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-gray-500">
                      {candidate.email} • {candidate.experience} experience
                    </div>
                  </div>
                  <Badge className={getCandidateStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </div>
              ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Job
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          {job.jiraTicket && (
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View in JIRA
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Management
            </h1>
            <p className="text-gray-600">
              Manage all job postings and hiring workflows
            </p>
          </div>
          <Link to="/jobs/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Job
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Jobs
                  </p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Jobs
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      jobs.filter((j) =>
                        ["Approved", "In Progress"].includes(j.status),
                      ).length
                    }
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Approval
                  </p>
                  <p className="text-2xl font-bold">
                    {jobs.filter((j) => j.status === "Pending Approval").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Candidates
                  </p>
                  <p className="text-2xl font-bold">{candidates.length}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
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
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Pipeline</TabsTrigger>
          <TabsTrigger value="approvals">Approval Workflow</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search jobs by title, ID, or HOD..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending Approval">
                      Pending Approval
                    </SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Filled">Filled</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by department" />
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
                    <SelectItem value="Product Department">
                      Product Department
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Job Postings ({filteredJobs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Details</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Candidates</TableHead>
                    <TableHead>Expected DOJ</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="text-sm text-gray-500">
                            {job.id} • {job.experience}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.department}</div>
                          <div className="text-sm text-gray-500">
                            HOD: {job.hod}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(job.status)}
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="font-medium">{job.candidates}</span>
                          {job.candidates > 0 && (
                            <div className="text-xs text-gray-500">
                              applications
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {job.doj}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <JobDetailsDialog job={job} />
                          </Dialog>

                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Pipeline</CardTitle>
              <CardDescription>
                Track all candidates across active job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Job Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => {
                    const job = jobs.find((j) => j.id === candidate.jobId);
                    return (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-gray-500">
                              {candidate.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{job?.title}</div>
                            <div className="text-sm text-gray-500">
                              {candidate.jobId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <Badge
                            className={getCandidateStatusColor(
                              candidate.status,
                            )}
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{candidate.appliedDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow</CardTitle>
              <CardDescription>
                Manage job posting approvals and workflow status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs
                  .filter(
                    (job) =>
                      job.status === "Pending Approval" ||
                      job.status === "Draft",
                  )
                  .map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-500">
                            {job.id} • {job.department} • HOD: {job.hod}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            {job.status === "Pending Approval" && (
                              <>
                                <Button size="sm">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  Request Changes
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Job Fill Rate</span>
                      <span>76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "76%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Time to Fill (avg days)</span>
                      <span>28</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Approval Rate</span>
                      <span>89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "89%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">IT Department</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Design Department</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Analytics Department</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Product Department</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
