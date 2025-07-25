import { useState } from 'react';
import { Search, Filter, Calendar, User, Package, CheckCircle, Clock, AlertTriangle, XCircle, Download, Upload, FileText, ExternalLink, Eye, Edit, Send, Plus } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

interface ClearanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  manager: string;
  lwd: string; // Last Working Day
  resignationDate: string;
  clearanceStatus: 'Pending' | 'In Progress' | 'Completed' | 'Blocked' | 'Overdue';
  assetsAllocated: number;
  assetsReturned: number;
  assetsPending: number;
  clearanceProgress: number;
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
  createdDate: string;
  lastUpdated: string;
  clearedBy?: string;
  clearanceDate?: string;
}

interface AssetClearance {
  id: string;
  employeeId: string;
  assetId: string;
  assetName: string;
  serialNumber: string;
  category: string;
  status: 'Pending Return' | 'Returned' | 'Damaged' | 'Lost' | 'Waived';
  expectedReturnDate: string;
  actualReturnDate?: string;
  returnCondition?: 'Good' | 'Fair' | 'Damaged';
  recoveryNotes?: string;
  handedOverTo?: string;
  verifiedBy?: string;
}

interface OffboardingTask {
  id: string;
  employeeId: string;
  taskType: 'Asset Return' | 'Access Revocation' | 'Documentation' | 'Exit Interview' | 'Knowledge Transfer';
  description: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Blocked';
  dueDate: string;
  completedDate?: string;
  priority: 'High' | 'Medium' | 'Low';
  dependencies?: string[];
}

export default function ClearanceManagement() {
  const [activeTab, setActiveTab] = useState('clearances');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [lwdFromDate, setLwdFromDate] = useState('');
  const [lwdToDate, setLwdToDate] = useState('');
  const [selectedClearances, setSelectedClearances] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');

  // Mock data
  const clearanceRecords: ClearanceRecord[] = [
    {
      id: 'CLR-001',
      employeeId: 'EMP-001',
      employeeName: 'Alex Thompson',
      department: 'Design Department',
      position: 'UI/UX Designer',
      manager: 'Sarah Design',
      lwd: '2024-02-15',
      resignationDate: '2024-01-30',
      clearanceStatus: 'In Progress',
      assetsAllocated: 4,
      assetsReturned: 2,
      assetsPending: 2,
      clearanceProgress: 75,
      priority: 'High',
      notes: 'Key designer with multiple project handovers required',
      createdDate: '2024-01-30',
      lastUpdated: '2024-02-10'
    },
    {
      id: 'CLR-002',
      employeeId: 'EMP-002',
      employeeName: 'John Smith',
      department: 'IT Department',
      position: 'Software Developer',
      manager: 'John Manager',
      lwd: '2024-02-20',
      resignationDate: '2024-02-05',
      clearanceStatus: 'Pending',
      assetsAllocated: 3,
      assetsReturned: 0,
      assetsPending: 3,
      clearanceProgress: 10,
      priority: 'Medium',
      createdDate: '2024-02-05',
      lastUpdated: '2024-02-05'
    },
    {
      id: 'CLR-003',
      employeeId: 'EMP-003',
      employeeName: 'Sarah Wilson',
      department: 'Analytics Department',
      position: 'Data Analyst',
      manager: 'Mike Analytics',
      lwd: '2024-01-25',
      resignationDate: '2024-01-10',
      clearanceStatus: 'Overdue',
      assetsAllocated: 2,
      assetsReturned: 1,
      assetsPending: 1,
      clearanceProgress: 60,
      priority: 'High',
      notes: 'LWD passed, pending laptop return',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-26'
    },
    {
      id: 'CLR-004',
      employeeId: 'EMP-004',
      employeeName: 'Mike Davis',
      department: 'IT Department',
      position: 'DevOps Engineer',
      manager: 'John Manager',
      lwd: '2024-01-20',
      resignationDate: '2024-01-05',
      clearanceStatus: 'Completed',
      assetsAllocated: 5,
      assetsReturned: 5,
      assetsPending: 0,
      clearanceProgress: 100,
      priority: 'Low',
      clearedBy: 'Asset Team',
      clearanceDate: '2024-01-19',
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-19'
    }
  ];

  const assetClearances: AssetClearance[] = [
    {
      id: 'AC-001',
      employeeId: 'EMP-001',
      assetId: 'AST-LP-001',
      assetName: 'MacBook Pro 16"',
      serialNumber: 'MB-2024-001',
      category: 'Laptop',
      status: 'Returned',
      expectedReturnDate: '2024-02-10',
      actualReturnDate: '2024-02-09',
      returnCondition: 'Good',
      handedOverTo: 'Asset Team',
      verifiedBy: 'John Asset'
    },
    {
      id: 'AC-002',
      employeeId: 'EMP-001',
      assetId: 'AST-MON-003',
      assetName: 'Dell UltraSharp 27"',
      serialNumber: 'MON-2024-003',
      category: 'Monitor',
      status: 'Pending Return',
      expectedReturnDate: '2024-02-15'
    },
    {
      id: 'AC-003',
      employeeId: 'EMP-003',
      assetId: 'AST-LP-002',
      assetName: 'Dell XPS 15',
      serialNumber: 'DL-2024-002',
      category: 'Laptop',
      status: 'Pending Return',
      expectedReturnDate: '2024-01-25'
    },
    {
      id: 'AC-004',
      employeeId: 'EMP-004',
      assetId: 'AST-PHN-004',
      assetName: 'iPhone 15 Pro',
      serialNumber: 'IP-2024-004',
      category: 'Mobile Phone',
      status: 'Returned',
      expectedReturnDate: '2024-01-18',
      actualReturnDate: '2024-01-18',
      returnCondition: 'Good',
      handedOverTo: 'Asset Team',
      verifiedBy: 'Sarah Asset'
    }
  ];

  const offboardingTasks: OffboardingTask[] = [
    {
      id: 'OT-001',
      employeeId: 'EMP-001',
      taskType: 'Asset Return',
      description: 'Return all allocated hardware and software assets',
      assignedTo: 'Asset Team',
      status: 'In Progress',
      dueDate: '2024-02-14',
      priority: 'High'
    },
    {
      id: 'OT-002',
      employeeId: 'EMP-001',
      taskType: 'Access Revocation',
      description: 'Revoke all system access and accounts',
      assignedTo: 'IT Security',
      status: 'Pending',
      dueDate: '2024-02-15',
      priority: 'High',
      dependencies: ['OT-001']
    },
    {
      id: 'OT-003',
      employeeId: 'EMP-001',
      taskType: 'Knowledge Transfer',
      description: 'Complete handover of ongoing projects',
      assignedTo: 'Sarah Design',
      status: 'In Progress',
      dueDate: '2024-02-13',
      priority: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Pending Return': return 'bg-yellow-100 text-yellow-800';
      case 'Damaged': return 'bg-orange-100 text-orange-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Waived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'In Progress': return <AlertTriangle className="w-4 h-4 text-blue-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Blocked': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Returned': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending Return': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Damaged': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Lost': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClearances = clearanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.clearanceStatus === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    
    let matchesLwdRange = true;
    if (lwdFromDate && lwdToDate) {
      const lwdDate = new Date(record.lwd);
      const fromDate = new Date(lwdFromDate);
      const toDate = new Date(lwdToDate);
      matchesLwdRange = lwdDate >= fromDate && lwdDate <= toDate;
    }
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesLwdRange;
  });

  const handleBulkAction = () => {
    if (selectedClearances.length === 0) {
      alert('Please select clearance records to process');
      return;
    }
    setShowBulkModal(true);
  };

  const processBulkAction = () => {
    // Process bulk action based on bulkAction type
    const action = bulkAction;
    const count = selectedClearances.length;
    
    // Update selected clearances based on action
    selectedClearances.forEach(clearanceId => {
      const clearanceIndex = clearanceRecords.findIndex(c => c.id === clearanceId);
      if (clearanceIndex !== -1) {
        switch (action) {
          case 'approve':
            clearanceRecords[clearanceIndex].clearanceStatus = 'Completed';
            clearanceRecords[clearanceIndex].clearanceProgress = 100;
            clearanceRecords[clearanceIndex].clearedBy = 'Bulk Process';
            clearanceRecords[clearanceIndex].clearanceDate = new Date().toISOString().split('T')[0];
            break;
          case 'reminder':
            // Send reminder logic would go here
            break;
          case 'escalate':
            clearanceRecords[clearanceIndex].priority = 'High';
            break;
        }
        clearanceRecords[clearanceIndex].lastUpdated = new Date().toISOString().split('T')[0];
      }
    });

    setShowBulkModal(false);
    setSelectedClearances([]);
    setBulkAction('');
    alert(`Bulk ${action} completed for ${count} records`);
  };

  const ClearanceDetailsDialog = ({ record }: { record: ClearanceRecord }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {record.employeeName} - Clearance Details
          <Badge className={getStatusColor(record.clearanceStatus)}>{record.clearanceStatus}</Badge>
        </DialogTitle>
        <DialogDescription>Employee ID: {record.employeeId} | Clearance ID: {record.id}</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Employee Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Name:</span> {record.employeeName}</div>
              <div><span className="font-medium">Department:</span> {record.department}</div>
              <div><span className="font-medium">Position:</span> {record.position}</div>
              <div><span className="font-medium">Manager:</span> {record.manager}</div>
              <div><span className="font-medium">Priority:</span> 
                <Badge className={`ml-2 ${getPriorityColor(record.priority)}`}>{record.priority}</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Resignation Date:</span> {record.resignationDate}</div>
              <div><span className="font-medium">Last Working Day:</span> {record.lwd}</div>
              <div><span className="font-medium">Created:</span> {record.createdDate}</div>
              <div><span className="font-medium">Last Updated:</span> {record.lastUpdated}</div>
              {record.clearanceDate && (
                <div><span className="font-medium">Cleared On:</span> {record.clearanceDate}</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Asset Clearance Progress</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span>{record.clearanceProgress}%</span>
            </div>
            <Progress value={record.clearanceProgress} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{record.assetsAllocated}</div>
                <div className="text-sm text-gray-500">Total Assets</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{record.assetsReturned}</div>
                <div className="text-sm text-gray-500">Returned</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{record.assetsPending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Asset Details</h3>
          <div className="space-y-2">
            {assetClearances.filter(ac => ac.employeeId === record.employeeId).map(asset => (
              <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{asset.assetName}</div>
                  <div className="text-sm text-gray-500">{asset.serialNumber} • {asset.category}</div>
                </div>
                <Badge className={getStatusColor(asset.status)}>
                  {asset.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Offboarding Tasks</h3>
          <div className="space-y-2">
            {offboardingTasks.filter(task => task.employeeId === record.employeeId).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{task.taskType}</div>
                  <div className="text-sm text-gray-500">{task.description}</div>
                  <div className="text-sm text-gray-500">Assigned to: {task.assignedTo}</div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  <div className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {record.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">{record.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Update Status
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Offboard Workflow
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Clearance Management</h1>
            <p className="text-gray-600">Handle employee offboarding and asset clearance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Clearance
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clearances</p>
                  <p className="text-2xl font-bold">{clearanceRecords.length}</p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{clearanceRecords.filter(c => c.clearanceStatus === 'Pending').length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold">{clearanceRecords.filter(c => c.clearanceStatus === 'In Progress').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold">{clearanceRecords.filter(c => c.clearanceStatus === 'Overdue').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{clearanceRecords.filter(c => c.clearanceStatus === 'Completed').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="clearances">Clearance Records</TabsTrigger>
          <TabsTrigger value="assets">Asset Recovery</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
          <TabsTrigger value="workflow">Offboarding Workflow</TabsTrigger>
          <TabsTrigger value="reports">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="clearances" className="space-y-6">
          {/* Advanced Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Employee ID, name, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">Clearance Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="IT Department">IT Department</SelectItem>
                      <SelectItem value="Design Department">Design Department</SelectItem>
                      <SelectItem value="Analytics Department">Analytics Department</SelectItem>
                      <SelectItem value="Product Department">Product Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="lwdFrom">LWD From</Label>
                  <Input
                    id="lwdFrom"
                    type="date"
                    value={lwdFromDate}
                    onChange={(e) => setLwdFromDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="lwdTo">LWD To</Label>
                  <Input
                    id="lwdTo"
                    type="date"
                    value={lwdToDate}
                    onChange={(e) => setLwdToDate(e.target.value)}
                  />
                </div>
              </div>

              {selectedClearances.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <Button onClick={handleBulkAction}>
                    <Package className="w-4 h-4 mr-2" />
                    Bulk Actions ({selectedClearances.length})
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedClearances([])}>
                    Clear Selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Clearance Records Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Clearance Records ({filteredClearances.length})</CardTitle>
                  <CardDescription>Filter and manage employee clearance processes</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedClearances.length === filteredClearances.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedClearances(filteredClearances.map(c => c.id));
                          } else {
                            setSelectedClearances([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Employee Details</TableHead>
                    <TableHead>LWD</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assets Progress</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClearances.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedClearances.includes(record.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedClearances([...selectedClearances, record.id]);
                            } else {
                              setSelectedClearances(selectedClearances.filter(id => id !== record.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.employeeName}</div>
                          <div className="text-sm text-gray-500">
                            {record.employeeId} • {record.department}
                          </div>
                          <div className="text-sm text-gray-500">{record.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {record.lwd}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.clearanceStatus)}
                          <Badge className={getStatusColor(record.clearanceStatus)}>
                            {record.clearanceStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{record.assetsReturned}/{record.assetsAllocated}</span>
                            <span>{record.clearanceProgress}%</span>
                          </div>
                          <Progress value={record.clearanceProgress} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(record.priority)}>
                          {record.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <ClearanceDetailsDialog record={record} />
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

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Recovery Tracking</CardTitle>
              <CardDescription>Monitor and manage asset returns during clearance process</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Details</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetClearances.map((asset) => {
                    const employee = clearanceRecords.find(r => r.employeeId === asset.employeeId);
                    return (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{asset.assetName}</div>
                            <div className="text-sm text-gray-500">
                              {asset.serialNumber} • {asset.category}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{employee?.employeeName}</div>
                            <div className="text-sm text-gray-500">{asset.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{asset.expectedReturnDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(asset.status)}
                            <Badge className={getStatusColor(asset.status)}>
                              {asset.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {asset.returnCondition ? (
                            <Badge variant="outline">{asset.returnCondition}</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {asset.status === 'Pending Return' && (
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Returned
                              </Button>
                            )}
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

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Clearance Processing</CardTitle>
              <CardDescription>Process multiple clearances using templates and bulk operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Template Upload</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Upload a CSV file with clearance data to process multiple records
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download Template
                        </Button>
                        <Button className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Bulk Approval</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Approve multiple clearances that meet specific criteria
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Filter className="w-4 h-4 mr-2" />
                          Set Criteria
                        </Button>
                        <Button className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Bulk Approve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Reminder Notifications</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Send automated reminders for pending clearances
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Reminders
                        </Button>
                        <Button className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Send Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Processing History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Bulk approval - Q1 2024 clearances</div>
                        <div className="text-sm text-gray-500">Processed 15 records • 2024-01-25</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Template upload - IT Department clearances</div>
                        <div className="text-sm text-gray-500">Processed 8 records • 2024-01-20</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offboarding Workflow Integration</CardTitle>
              <CardDescription>Manage complete employee offboarding process with automated tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Workflow Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium">Standard Employee</h4>
                          <p className="text-sm text-gray-500">Asset return + Access revocation + Documentation</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Use Template</Button>
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium">Senior Employee</h4>
                          <p className="text-sm text-gray-500">Extended workflow with knowledge transfer</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Use Template</Button>
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                          <h4 className="font-medium">Remote Employee</h4>
                          <p className="text-sm text-gray-500">Includes shipping and remote asset collection</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm">Use Template</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Workflows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {offboardingTasks.slice(0, 4).map((task) => (
                          <div key={task.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{task.taskType}</h4>
                              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Assigned to: {task.assignedTo}</span>
                              <span>Due: {task.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Integration Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">HRIS System</span>
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Email Automation</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Asset Portal</span>
                        <Badge className="bg-green-100 text-green-800">Synced</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Access Management</span>
                        <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clearance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Average Clearance Time</span>
                      <span>12 days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Asset Recovery Rate</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>On-time Completion</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
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

      {/* Bulk Action Modal */}
      <Dialog open={showBulkModal} onOpenChange={setShowBulkModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Action</DialogTitle>
            <DialogDescription>
              Select an action to perform on {selectedClearances.length} selected clearance records
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Action Type</Label>
              <Select value={bulkAction} onValueChange={setBulkAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve Clearances</SelectItem>
                  <SelectItem value="reminder">Send Reminders</SelectItem>
                  <SelectItem value="escalate">Escalate Priority</SelectItem>
                  <SelectItem value="export">Export Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBulkModal(false)}>
                Cancel
              </Button>
              <Button onClick={processBulkAction} disabled={!bulkAction}>
                Execute Action
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
