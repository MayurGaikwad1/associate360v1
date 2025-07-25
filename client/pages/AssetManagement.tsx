import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Package, User, Calendar, MapPin, ExternalLink, Download, Upload, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
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

interface Asset {
  id: string;
  name: string;
  type: 'Hardware' | 'Software';
  category: string;
  serialNumber: string;
  model: string;
  brand: string;
  status: 'Available' | 'Allocated' | 'In Use' | 'Maintenance' | 'Returned' | 'Damaged' | 'Disposed';
  condition: 'New' | 'Good' | 'Fair' | 'Poor';
  purchaseDate: string;
  purchasePrice: number;
  warranty: string;
  location: string;
  assignedTo?: string;
  assignedDate?: string;
  jobId?: string;
  notes?: string;
  lastUpdated: string;
}

interface AssetAllocation {
  id: string;
  assetId: string;
  assetName: string;
  serialNumber: string;
  employeeName: string;
  employeeId: string;
  jobId: string;
  allocationDate: string;
  expectedReturnDate?: string;
  actualReturnDate?: string;
  status: 'Pending' | 'Allocated' | 'In Use' | 'Returned' | 'Overdue';
  returnCondition?: 'Good' | 'Fair' | 'Damaged';
  returnNotes?: string;
  allocatedBy: string;
}

interface AssetRequest {
  id: string;
  type: 'Allocation' | 'Return' | 'Replacement' | 'Maintenance';
  assetId: string;
  assetName: string;
  employeeName: string;
  requestedBy: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  notes?: string;
  approvedBy?: string;
  completedDate?: string;
}

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState('assets');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [allocationForm, setAllocationForm] = useState({
    assetIds: [] as string[],
    employeeName: '',
    employeeId: '',
    jobId: '',
    expectedReturnDate: '',
    notes: ''
  });

  // Mock data
  const assets: Asset[] = [
    {
      id: 'AST-LP-001',
      name: 'MacBook Pro 16"',
      type: 'Hardware',
      category: 'Laptop',
      serialNumber: 'MB-2024-001',
      model: 'MacBook Pro 16"',
      brand: 'Apple',
      status: 'Allocated',
      condition: 'New',
      purchaseDate: '2024-01-10',
      purchasePrice: 2499,
      warranty: '2027-01-10',
      location: 'IT Warehouse',
      assignedTo: 'Alex Thompson',
      assignedDate: '2024-01-20',
      jobId: 'JOB-2024-0157',
      notes: 'Allocated for UI/UX Designer position',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'AST-LP-002',
      name: 'Dell XPS 15',
      type: 'Hardware',
      category: 'Laptop',
      serialNumber: 'DL-2024-002',
      model: 'XPS 15 9520',
      brand: 'Dell',
      status: 'Available',
      condition: 'New',
      purchaseDate: '2024-01-15',
      purchasePrice: 1899,
      warranty: '2027-01-15',
      location: 'IT Warehouse',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'AST-MON-003',
      name: 'Dell UltraSharp 27"',
      type: 'Hardware',
      category: 'Monitor',
      serialNumber: 'MON-2024-003',
      model: 'U2723QE',
      brand: 'Dell',
      status: 'Allocated',
      condition: 'New',
      purchaseDate: '2024-01-12',
      purchasePrice: 599,
      warranty: '2027-01-12',
      location: 'IT Warehouse',
      assignedTo: 'Alex Thompson',
      assignedDate: '2024-01-20',
      jobId: 'JOB-2024-0157',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'AST-PHN-004',
      name: 'iPhone 15 Pro',
      type: 'Hardware',
      category: 'Mobile Phone',
      serialNumber: 'IP-2024-004',
      model: 'iPhone 15 Pro',
      brand: 'Apple',
      status: 'Returned',
      condition: 'Good',
      purchaseDate: '2024-01-08',
      purchasePrice: 999,
      warranty: '2025-01-08',
      location: 'IT Warehouse',
      lastUpdated: '2024-01-25'
    },
    {
      id: 'AST-SW-005',
      name: 'Adobe Creative Suite',
      type: 'Software',
      category: 'Design Software',
      serialNumber: 'ACS-2024-005',
      model: 'Creative Cloud',
      brand: 'Adobe',
      status: 'Allocated',
      condition: 'New',
      purchaseDate: '2024-01-05',
      purchasePrice: 599,
      warranty: '2025-01-05',
      location: 'Software Repository',
      assignedTo: 'Alex Thompson',
      assignedDate: '2024-01-20',
      jobId: 'JOB-2024-0157',
      lastUpdated: '2024-01-20'
    }
  ];

  const allocations: AssetAllocation[] = [
    {
      id: 'ALLOC-001',
      assetId: 'AST-LP-001',
      assetName: 'MacBook Pro 16"',
      serialNumber: 'MB-2024-001',
      employeeName: 'Alex Thompson',
      employeeId: 'EMP-001',
      jobId: 'JOB-2024-0157',
      allocationDate: '2024-01-20',
      expectedReturnDate: '2025-01-20',
      status: 'In Use',
      allocatedBy: 'Procurement Team'
    },
    {
      id: 'ALLOC-002',
      assetId: 'AST-PHN-004',
      assetName: 'iPhone 15 Pro',
      serialNumber: 'IP-2024-004',
      employeeName: 'John Smith',
      employeeId: 'EMP-002',
      jobId: 'JOB-2024-0156',
      allocationDate: '2024-01-15',
      expectedReturnDate: '2024-01-25',
      actualReturnDate: '2024-01-25',
      status: 'Returned',
      returnCondition: 'Good',
      returnNotes: 'All accessories returned in good condition',
      allocatedBy: 'Asset Team'
    },
    {
      id: 'ALLOC-003',
      assetId: 'AST-LP-002',
      assetName: 'Dell XPS 15',
      serialNumber: 'DL-2024-002',
      employeeName: 'Sarah Wilson',
      employeeId: 'EMP-003',
      jobId: 'JOB-2024-0158',
      allocationDate: '2024-01-18',
      expectedReturnDate: '2024-01-30',
      status: 'Overdue',
      allocatedBy: 'IT Team'
    }
  ];

  const assetRequests: AssetRequest[] = [
    {
      id: 'REQ-001',
      type: 'Allocation',
      assetId: 'AST-LP-002',
      assetName: 'Dell XPS 15',
      employeeName: 'Maria Garcia',
      requestedBy: 'John Manager',
      requestDate: '2024-01-22',
      status: 'Pending',
      priority: 'High',
      reason: 'New developer joining - requires development setup'
    },
    {
      id: 'REQ-002',
      type: 'Replacement',
      assetId: 'AST-LP-001',
      assetName: 'MacBook Pro 16"',
      employeeName: 'Alex Thompson',
      requestedBy: 'Alex Thompson',
      requestDate: '2024-01-21',
      status: 'In Progress',
      priority: 'Medium',
      reason: 'Current laptop has display issues',
      notes: 'Screen flickering reported'
    },
    {
      id: 'REQ-003',
      type: 'Return',
      assetId: 'AST-PHN-004',
      assetName: 'iPhone 15 Pro',
      employeeName: 'John Smith',
      requestedBy: 'John Smith',
      requestDate: '2024-01-24',
      status: 'Completed',
      priority: 'Low',
      reason: 'Employee leaving company',
      completedDate: '2024-01-25',
      approvedBy: 'Asset Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Allocated': return 'bg-blue-100 text-blue-800';
      case 'In Use': return 'bg-purple-100 text-purple-800';
      case 'Returned': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Damaged': return 'bg-red-100 text-red-800';
      case 'Disposed': return 'bg-black text-white';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Allocated': return <User className="w-4 h-4 text-blue-600" />;
      case 'In Use': return <Package className="w-4 h-4 text-purple-600" />;
      case 'Returned': return <RefreshCw className="w-4 h-4 text-gray-600" />;
      case 'Maintenance': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Damaged': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase() || '');
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleBulkAllocation = () => {
    if (selectedAssets.length === 0) {
      alert('Please select assets to allocate');
      return;
    }
    setAllocationForm({...allocationForm, assetIds: selectedAssets});
    setShowAllocationModal(true);
  };

  const handleAllocationSubmit = () => {
    // Create new allocations
    const newAllocations = allocationForm.assetIds.map(assetId => {
      const asset = assets.find(a => a.id === assetId);
      return {
        id: `ALLOC-${Date.now()}-${assetId}`,
        assetId,
        assetName: asset?.name || '',
        serialNumber: asset?.serialNumber || '',
        employeeName: allocationForm.employeeName,
        employeeId: allocationForm.employeeId,
        jobId: allocationForm.jobId,
        allocationDate: new Date().toISOString().split('T')[0],
        expectedReturnDate: allocationForm.expectedReturnDate,
        status: 'Allocated' as 'Allocated',
        allocatedBy: 'Current User'
      };
    });

    // Update asset status
    allocationForm.assetIds.forEach(assetId => {
      const assetIndex = assets.findIndex(a => a.id === assetId);
      if (assetIndex !== -1) {
        assets[assetIndex].status = 'Allocated';
        assets[assetIndex].assignedTo = allocationForm.employeeName;
        assets[assetIndex].assignedDate = new Date().toISOString().split('T')[0];
        assets[assetIndex].jobId = allocationForm.jobId;
      }
    });

    allocations.push(...newAllocations);
    setShowAllocationModal(false);
    setSelectedAssets([]);
    setAllocationForm({
      assetIds: [],
      employeeName: '',
      employeeId: '',
      jobId: '',
      expectedReturnDate: '',
      notes: ''
    });
    alert('Assets allocated successfully!');
  };

  const AssetDetailsDialog = ({ asset }: { asset: Asset }) => (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {asset.name}
          <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
        </DialogTitle>
        <DialogDescription>Asset ID: {asset.id} | Serial: {asset.serialNumber}</DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Asset Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Type:</span> {asset.type}</div>
              <div><span className="font-medium">Category:</span> {asset.category}</div>
              <div><span className="font-medium">Brand:</span> {asset.brand}</div>
              <div><span className="font-medium">Model:</span> {asset.model}</div>
              <div><span className="font-medium">Condition:</span> {asset.condition}</div>
              <div><span className="font-medium">Location:</span> {asset.location}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Purchase & Warranty</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Purchase Date:</span> {asset.purchaseDate}</div>
              <div><span className="font-medium">Purchase Price:</span> ${asset.purchasePrice.toLocaleString()}</div>
              <div><span className="font-medium">Warranty Until:</span> {asset.warranty}</div>
              <div><span className="font-medium">Last Updated:</span> {asset.lastUpdated}</div>
            </div>
          </div>
        </div>

        {asset.assignedTo && (
          <div>
            <h3 className="font-semibold mb-3">Current Assignment</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Assigned To:</span> {asset.assignedTo}</div>
              <div><span className="font-medium">Assignment Date:</span> {asset.assignedDate}</div>
              <div><span className="font-medium">Job ID:</span> {asset.jobId}</div>
            </div>
          </div>
        )}

        {asset.notes && (
          <div>
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm text-gray-600">{asset.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Asset
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Transfer
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            QR Code
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Asset Portal
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Asset Management</h1>
            <p className="text-gray-600">Comprehensive asset lifecycle management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Assets
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold">{assets.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.status === 'Available').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Allocated</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.status === 'Allocated').length}</p>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Maintenance</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.status === 'Maintenance').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue Returns</p>
                  <p className="text-2xl font-bold">{allocations.filter(a => a.status === 'Overdue').length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="assets">Asset Inventory</TabsTrigger>
          <TabsTrigger value="allocations">Allocations & Tracking</TabsTrigger>
          <TabsTrigger value="returns">Returns & Replacements</TabsTrigger>
          <TabsTrigger value="requests">Asset Requests</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by asset name, serial number, or assigned to..."
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
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Allocated">Allocated</SelectItem>
                    <SelectItem value="In Use">In Use</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>

                {selectedAssets.length > 0 && (
                  <Button onClick={handleBulkAllocation}>
                    <User className="w-4 h-4 mr-2" />
                    Allocate Selected ({selectedAssets.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assets Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Asset Inventory ({filteredAssets.length})</CardTitle>
                  <CardDescription>Track and manage all organizational assets</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Sync with Portal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedAssets.length === filteredAssets.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAssets(filteredAssets.map(a => a.id));
                          } else {
                            setSelectedAssets([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Asset Details</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedAssets.includes(asset.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAssets([...selectedAssets, asset.id]);
                            } else {
                              setSelectedAssets(selectedAssets.filter(id => id !== asset.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.id} • {asset.type} • {asset.brand}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{asset.serialNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(asset.status)}
                          <Badge className={getStatusColor(asset.status)}>
                            {asset.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {asset.assignedTo ? (
                          <div>
                            <div className="font-medium">{asset.assignedTo}</div>
                            <div className="text-sm text-gray-500">{asset.assignedDate}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {asset.location}
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
                            <AssetDetailsDialog asset={asset} />
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

        <TabsContent value="allocations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocations & Tracking</CardTitle>
              <CardDescription>Monitor all asset assignments and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Details</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Allocation Date</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{allocation.assetName}</div>
                          <div className="text-sm text-gray-500">
                            {allocation.assetId} • {allocation.serialNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{allocation.employeeName}</div>
                          <div className="text-sm text-gray-500">
                            {allocation.employeeId} • {allocation.jobId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{allocation.allocationDate}</TableCell>
                      <TableCell>
                        {allocation.expectedReturnDate || 'Not specified'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(allocation.status)}
                          <Badge className={getStatusColor(allocation.status)}>
                            {allocation.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {allocation.status === 'In Use' && (
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Return
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

        <TabsContent value="returns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Returns</CardTitle>
                <CardDescription>Process asset returns from employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocations.filter(a => a.status === 'Returned').map((allocation) => (
                    <div key={allocation.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{allocation.assetName}</h3>
                          <p className="text-sm text-gray-500">{allocation.employeeName}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Returned</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Return Date:</span> {allocation.actualReturnDate}
                        </div>
                        <div>
                          <span className="font-medium">Condition:</span> {allocation.returnCondition}
                        </div>
                      </div>
                      
                      {allocation.returnNotes && (
                        <div className="mt-2">
                          <span className="font-medium text-sm">Notes:</span>
                          <p className="text-sm text-gray-600">{allocation.returnNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overdue Returns</CardTitle>
                <CardDescription>Assets that should have been returned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocations.filter(a => a.status === 'Overdue').map((allocation) => (
                    <div key={allocation.id} className="p-4 border rounded-lg border-red-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{allocation.assetName}</h3>
                          <p className="text-sm text-gray-500">{allocation.employeeName}</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Overdue
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Expected:</span> {allocation.expectedReturnDate}
                        </div>
                        <div>
                          <span className="font-medium">Days Overdue:</span> 
                          <span className="text-red-600 ml-1">5</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                        <Button size="sm">
                          Force Return
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Requests</CardTitle>
              <CardDescription>Manage asset allocation, return, and replacement requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Details</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.id}</div>
                          <div className="text-sm text-gray-500">{request.requestDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.assetName}</div>
                          <div className="text-sm text-gray-500">{request.assetId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.employeeName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.priority === 'High' ? 'destructive' : request.priority === 'Medium' ? 'default' : 'secondary'}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {request.status === 'Pending' && (
                            <>
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline">
                                Reject
                              </Button>
                            </>
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

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Hardware Utilization</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Software Utilization</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Return Rate</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Laptops</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mobile Phones</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monitors</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Software Licenses</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
                <CardDescription>Asset Management Portal connectivity and sync status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Portal Sync</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Serial Tracking</span>
                    <Badge className="bg-green-100 text-green-800">Real-time</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Warranty Alerts</span>
                    <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Auto Backup</span>
                    <Badge className="bg-green-100 text-green-800">Daily</Badge>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Force Sync
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Portal
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Allocation Modal */}
      <Dialog open={showAllocationModal} onOpenChange={setShowAllocationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Allocate Assets</DialogTitle>
            <DialogDescription>
              Allocate {allocationForm.assetIds.length} selected asset(s) to an employee
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  value={allocationForm.employeeName}
                  onChange={(e) => setAllocationForm({...allocationForm, employeeName: e.target.value})}
                  placeholder="Enter employee name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  value={allocationForm.employeeId}
                  onChange={(e) => setAllocationForm({...allocationForm, employeeId: e.target.value})}
                  placeholder="EMP-001"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobId">Job ID</Label>
                <Input
                  id="jobId"
                  value={allocationForm.jobId}
                  onChange={(e) => setAllocationForm({...allocationForm, jobId: e.target.value})}
                  placeholder="JOB-2024-0001"
                />
              </div>
              
              <div>
                <Label htmlFor="expectedReturnDate">Expected Return Date</Label>
                <Input
                  id="expectedReturnDate"
                  type="date"
                  value={allocationForm.expectedReturnDate}
                  onChange={(e) => setAllocationForm({...allocationForm, expectedReturnDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={allocationForm.notes}
                onChange={(e) => setAllocationForm({...allocationForm, notes: e.target.value})}
                placeholder="Additional notes for this allocation"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAllocationModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAllocationSubmit}>
                Allocate Assets
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
