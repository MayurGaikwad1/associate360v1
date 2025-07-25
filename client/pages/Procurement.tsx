import { useState } from 'react';
import { Search, Filter, Eye, Edit, Calendar, User, Mail, Building, Phone, MapPin, FileText, ExternalLink, CheckCircle, Clock, AlertTriangle, Plus, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface JobRequest {
  id: string;
  title: string;
  department: string;
  hod: string;
  experience: string;
  expectedDoj: string;
  status: 'New' | 'In Review' | 'Candidate Selected' | 'Processed' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  submittedAt: string;
  description: string;
  skillsRequired: string;
  hardwareRequirements: string[];
  softwareRequirements: string[];
  selectedCandidate?: CandidateInfo;
}

interface CandidateInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  skills: string;
  previousCompany: string;
  expectedSalary: string;
  actualDoj: string;
  emergencyContact: string;
  emergencyPhone: string;
  panNumber: string;
  aadharNumber: string;
  bankAccount: string;
  ifscCode: string;
  jobId: string;
}

interface ProvisioningTicket {
  id: string;
  type: 'Asset Allocation' | 'Domain ID' | 'Email Creation';
  jobId: string;
  candidateName: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  assignedTo: string;
  createdAt: string;
  dueDate: string;
  jiraTicketId?: string;
}

export default function Procurement() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobRequest | null>(null);
  const [candidateForm, setCandidateForm] = useState<Partial<CandidateInfo>>({});
  const [showCandidateForm, setShowCandidateForm] = useState(false);

  // Mock data
  const jobRequests: JobRequest[] = [
    {
      id: 'JOB-2024-0156',
      title: 'Senior Software Developer',
      department: 'IT Department',
      hod: 'John Manager',
      experience: '5-8 years',
      expectedDoj: '2024-02-15',
      status: 'New',
      priority: 'High',
      submittedAt: '2024-01-15',
      description: 'We need a senior software developer with expertise in React and Node.js...',
      skillsRequired: 'React, Node.js, TypeScript, AWS',
      hardwareRequirements: ['Laptop - MacBook', 'Monitor - 27 inch', 'Keyboard & Mouse'],
      softwareRequirements: ['Visual Studio Code', 'Slack', 'Jira', 'Figma']
    },
    {
      id: 'JOB-2024-0157',
      title: 'UI/UX Designer',
      department: 'Design Department',
      hod: 'Sarah Design',
      experience: '3-5 years',
      expectedDoj: '2024-02-20',
      status: 'Candidate Selected',
      priority: 'Medium',
      submittedAt: '2024-01-16',
      description: 'Looking for a creative UI/UX designer with strong portfolio...',
      skillsRequired: 'Figma, Adobe Creative Suite, Prototyping',
      hardwareRequirements: ['Laptop - MacBook', 'Graphics Tablet', 'Monitor - 27 inch'],
      softwareRequirements: ['Figma', 'Adobe Creative Suite', 'Slack'],
      selectedCandidate: {
        id: 'CAND-001',
        name: 'Alex Thompson',
        email: 'alex.thompson@email.com',
        phone: '+1-555-0123',
        address: '123 Main St, City, State 12345',
        experience: '4 years',
        skills: 'Figma, Adobe XD, Prototyping, User Research',
        previousCompany: 'Design Corp',
        expectedSalary: '$75,000',
        actualDoj: '2024-02-22',
        emergencyContact: 'Jane Thompson',
        emergencyPhone: '+1-555-0124',
        panNumber: 'ABCDE1234F',
        aadharNumber: '1234-5678-9012',
        bankAccount: '1234567890',
        ifscCode: 'BANK0001234',
        jobId: 'JOB-2024-0157'
      }
    },
    {
      id: 'JOB-2024-0158',
      title: 'DevOps Engineer',
      department: 'IT Department',
      hod: 'John Manager',
      experience: '3-5 years',
      expectedDoj: '2024-03-01',
      status: 'In Review',
      priority: 'High',
      submittedAt: '2024-01-18',
      description: 'DevOps engineer to manage cloud infrastructure and CI/CD pipelines...',
      skillsRequired: 'AWS, Docker, Kubernetes, Jenkins',
      hardwareRequirements: ['Laptop - Windows', 'Monitor - 24 inch'],
      softwareRequirements: ['AWS CLI', 'Docker', 'Git', 'Jenkins']
    }
  ];

  const provisioningTickets: ProvisioningTicket[] = [
    {
      id: 'TICKET-001',
      type: 'Asset Allocation',
      jobId: 'JOB-2024-0157',
      candidateName: 'Alex Thompson',
      status: 'Pending',
      assignedTo: 'Asset Team',
      createdAt: '2024-01-20',
      dueDate: '2024-02-20',
      jiraTicketId: 'ASSET-123'
    },
    {
      id: 'TICKET-002',
      type: 'Domain ID',
      jobId: 'JOB-2024-0157',
      candidateName: 'Alex Thompson',
      status: 'In Progress',
      assignedTo: 'IT Team',
      createdAt: '2024-01-20',
      dueDate: '2024-02-15',
      jiraTicketId: 'DOMAIN-124'
    },
    {
      id: 'TICKET-003',
      type: 'Email Creation',
      jobId: 'JOB-2024-0157',
      candidateName: 'Alex Thompson',
      status: 'Completed',
      assignedTo: 'IT Team',
      createdAt: '2024-01-20',
      dueDate: '2024-02-10',
      jiraTicketId: 'EMAIL-125'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Candidate Selected': return 'bg-purple-100 text-purple-800';
      case 'Processed': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'In Review': return <Eye className="w-4 h-4 text-yellow-600" />;
      case 'Candidate Selected': return <User className="w-4 h-4 text-purple-600" />;
      case 'Processed': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'In Progress': return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case 'Failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredJobs = jobRequests.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.hod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCandidateSubmit = (jobId: string) => {
    const updatedCandidate = {
      ...candidateForm,
      id: `CAND-${Date.now()}`,
      jobId: jobId
    };
    
    // Update job status
    const jobIndex = jobRequests.findIndex(job => job.id === jobId);
    if (jobIndex !== -1) {
      jobRequests[jobIndex].status = 'Processed';
      jobRequests[jobIndex].selectedCandidate = updatedCandidate as CandidateInfo;
    }

    // Auto-generate provisioning tickets
    generateProvisioningTickets(jobId, updatedCandidate.name || '');
    
    setShowCandidateForm(false);
    setCandidateForm({});
    alert('Candidate information saved and provisioning tickets generated successfully!');
  };

  const generateProvisioningTickets = (jobId: string, candidateName: string) => {
    const ticketTypes = ['Asset Allocation', 'Domain ID', 'Email Creation'];
    const newTickets = ticketTypes.map((type, index) => ({
      id: `TICKET-${Date.now() + index}`,
      type: type as 'Asset Allocation' | 'Domain ID' | 'Email Creation',
      jobId,
      candidateName,
      status: 'Pending' as 'Pending',
      assignedTo: type === 'Asset Allocation' ? 'Asset Team' : 'IT Team',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      jiraTicketId: `${type.replace(/\s+/g, '').toUpperCase()}-${Math.floor(Math.random() * 1000)}`
    }));
    
    provisioningTickets.push(...newTickets);
  };

  const JobDetailsDialog = ({ job }: { job: JobRequest }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {job.title}
          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
        </DialogTitle>
        <DialogDescription>Job Request ID: {job.id}</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Job Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Department:</span> {job.department}</div>
              <div><span className="font-medium">HOD:</span> {job.hod}</div>
              <div><span className="font-medium">Experience Required:</span> {job.experience}</div>
              <div><span className="font-medium">Expected DOJ:</span> {job.expectedDoj}</div>
              <div><span className="font-medium">Priority:</span> {job.priority}</div>
              <div><span className="font-medium">Submitted:</span> {job.submittedAt}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Requirements</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-sm">Hardware:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.hardwareRequirements.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{item}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium text-sm">Software:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.softwareRequirements.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Skills Required</h3>
          <p className="text-sm text-gray-600">{job.skillsRequired}</p>
        </div>

        {job.selectedCandidate && (
          <div>
            <h3 className="font-semibold mb-3">Selected Candidate</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Name:</span> {job.selectedCandidate.name}</div>
              <div><span className="font-medium">Email:</span> {job.selectedCandidate.email}</div>
              <div><span className="font-medium">Phone:</span> {job.selectedCandidate.phone}</div>
              <div><span className="font-medium">Actual DOJ:</span> {job.selectedCandidate.actualDoj}</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {job.status === 'New' && (
            <Button onClick={() => setShowCandidateForm(true)}>
              <User className="w-4 h-4 mr-2" />
              Add Candidate Info
            </Button>
          )}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Details
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const CandidateFormDialog = () => (
    <Dialog open={showCandidateForm} onOpenChange={setShowCandidateForm}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fill Candidate Information</DialogTitle>
          <DialogDescription>
            Enter selected candidate details for job: {selectedJob?.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={candidateForm.name || ''}
                onChange={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
                placeholder="Enter candidate name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={candidateForm.email || ''}
                onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                placeholder="candidate@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={candidateForm.phone || ''}
                onChange={(e) => setCandidateForm({...candidateForm, phone: e.target.value})}
                placeholder="+1-555-0123"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="experience">Total Experience</Label>
              <Input
                id="experience"
                value={candidateForm.experience || ''}
                onChange={(e) => setCandidateForm({...candidateForm, experience: e.target.value})}
                placeholder="5 years"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={candidateForm.address || ''}
              onChange={(e) => setCandidateForm({...candidateForm, address: e.target.value})}
              placeholder="Complete address with city, state, and zip code"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="previousCompany">Previous Company</Label>
              <Input
                id="previousCompany"
                value={candidateForm.previousCompany || ''}
                onChange={(e) => setCandidateForm({...candidateForm, previousCompany: e.target.value})}
                placeholder="Previous employer"
              />
            </div>
            
            <div>
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                value={candidateForm.expectedSalary || ''}
                onChange={(e) => setCandidateForm({...candidateForm, expectedSalary: e.target.value})}
                placeholder="$75,000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="actualDoj">Actual Date of Joining *</Label>
            <Input
              id="actualDoj"
              type="date"
              value={candidateForm.actualDoj || ''}
              onChange={(e) => setCandidateForm({...candidateForm, actualDoj: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                value={candidateForm.emergencyContact || ''}
                onChange={(e) => setCandidateForm({...candidateForm, emergencyContact: e.target.value})}
                placeholder="Emergency contact person"
              />
            </div>
            
            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                value={candidateForm.emergencyPhone || ''}
                onChange={(e) => setCandidateForm({...candidateForm, emergencyPhone: e.target.value})}
                placeholder="+1-555-0124"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                value={candidateForm.panNumber || ''}
                onChange={(e) => setCandidateForm({...candidateForm, panNumber: e.target.value})}
                placeholder="ABCDE1234F"
              />
            </div>
            
            <div>
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input
                id="aadharNumber"
                value={candidateForm.aadharNumber || ''}
                onChange={(e) => setCandidateForm({...candidateForm, aadharNumber: e.target.value})}
                placeholder="1234-5678-9012"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input
                id="bankAccount"
                value={candidateForm.bankAccount || ''}
                onChange={(e) => setCandidateForm({...candidateForm, bankAccount: e.target.value})}
                placeholder="1234567890"
              />
            </div>
            
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={candidateForm.ifscCode || ''}
                onChange={(e) => setCandidateForm({...candidateForm, ifscCode: e.target.value})}
                placeholder="BANK0001234"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Skills & Expertise</Label>
            <Textarea
              id="skills"
              value={candidateForm.skills || ''}
              onChange={(e) => setCandidateForm({...candidateForm, skills: e.target.value})}
              placeholder="List candidate's key skills and expertise areas"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCandidateForm(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedJob && handleCandidateSubmit(selectedJob.id)}>
              <Send className="w-4 h-4 mr-2" />
              Save & Generate Tickets
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Procurement Inbox</h1>
        <p className="text-gray-600">Process job requests and manage candidate onboarding</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Requests</p>
                <p className="text-2xl font-bold">{jobRequests.filter(j => j.status === 'New').length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Review</p>
                <p className="text-2xl font-bold">{jobRequests.filter(j => j.status === 'In Review').length}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidates Selected</p>
                <p className="text-2xl font-bold">{jobRequests.filter(j => j.status === 'Candidate Selected').length}</p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processed</p>
                <p className="text-2xl font-bold">{jobRequests.filter(j => j.status === 'Processed').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="inbox">Job Inbox</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Processing</TabsTrigger>
          <TabsTrigger value="tickets">Provisioning Tickets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by job title, ID, or HOD..."
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
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Candidate Selected">Candidate Selected</SelectItem>
                    <SelectItem value="Processed">Processed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Job Requests ({filteredJobs.length})</CardTitle>
              <CardDescription>Incoming job requests from managers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Details</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
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
                          <div className="text-sm text-gray-500">{job.id} • {job.experience}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.department}</div>
                          <div className="text-sm text-gray-500">HOD: {job.hod}</div>
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
                        <Badge variant={job.priority === 'High' ? 'destructive' : job.priority === 'Medium' ? 'default' : 'secondary'}>
                          {job.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {job.expectedDoj}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedJob(job)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            {selectedJob && <JobDetailsDialog job={selectedJob} />}
                          </Dialog>
                          
                          {job.status === 'New' && (
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedJob(job);
                                setShowCandidateForm(true);
                              }}
                            >
                              <User className="w-4 h-4 mr-1" />
                              Add Candidate
                            </Button>
                          )}
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
              <CardTitle>Candidate Processing</CardTitle>
              <CardDescription>Manage selected candidates and update joining details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobRequests.filter(job => job.selectedCandidate).map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">{job.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{job.id} • {job.department}</p>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Selected Candidate</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            {job.selectedCandidate?.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {job.selectedCandidate?.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {job.selectedCandidate?.phone}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="text-sm text-gray-500">Actual DOJ</div>
                          <div className="font-medium">{job.selectedCandidate?.actualDoj}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Update DOJ
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provisioning Tickets</CardTitle>
              <CardDescription>Auto-generated tickets for asset allocation and account creation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket Details</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provisioningTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.id}</div>
                          <div className="text-sm text-gray-500">Job: {ticket.jobId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{ticket.candidateName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {ticket.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>{ticket.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {ticket.jiraTicketId && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              JIRA
                            </Button>
                          )}
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Average Processing Time</span>
                      <span>3.2 days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Ticket Generation Rate</span>
                      <span>98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>DOJ Accuracy</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">In Progress</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Failed</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <CandidateFormDialog />
    </div>
  );
}
