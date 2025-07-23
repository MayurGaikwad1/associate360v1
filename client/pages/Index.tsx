import { Link } from 'react-router-dom';
import { Users, FileText, Package, CheckCircle, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Index() {
  return (
    <div className="px-6 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Associate 360</h2>
        <p className="text-lg text-gray-600">
          Comprehensive platform for managing off-role employees under T&M agreement - from hiring to offboarding
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Associates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">8 pending approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets Allocated</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">486</div>
            <p className="text-xs text-muted-foreground">12 pending return</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clearances Pending</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 critical</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/jobs/create">
                  <Button className="w-full h-auto p-4 flex flex-col items-start space-y-2" variant="outline">
                    <UserPlus className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Create Job Posting</div>
                      <div className="text-sm text-gray-500">Post new position requirements</div>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/assets/allocate">
                  <Button className="w-full h-auto p-4 flex flex-col items-start space-y-2" variant="outline">
                    <Package className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Allocate Assets</div>
                      <div className="text-sm text-gray-500">Assign equipment to associates</div>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/clearance/bulk">
                  <Button className="w-full h-auto p-4 flex flex-col items-start space-y-2" variant="outline">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Bulk Clearance</div>
                      <div className="text-sm text-gray-500">Process multiple clearances</div>
                    </div>
                  </Button>
                </Link>
                
                <Link to="/reports/generate">
                  <Button className="w-full h-auto p-4 flex flex-col items-start space-y-2" variant="outline">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Generate Reports</div>
                      <div className="text-sm text-gray-500">Asset and associate analytics</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Job ID: JOB-2024-0156 approved</p>
                    <p className="text-xs text-gray-500">Software Developer position for IT Department • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Asset allocation completed</p>
                    <p className="text-xs text-gray-500">Laptop LP-2024-0234 assigned to John Smith • 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Clearance pending</p>
                    <p className="text-xs text-gray-500">Sarah Johnson - LWD in 3 days • 6 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Asset return overdue</p>
                    <p className="text-xs text-gray-500">Mobile phone MP-2024-0123 from Mike Davis • 8 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3">
                  <p className="text-sm font-medium">Asset Return Due</p>
                  <p className="text-xs text-gray-500">Tomorrow</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="text-sm font-medium">LWD Alert - 5 Associates</p>
                  <p className="text-xs text-gray-500">This Week</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm font-medium">Procurement Review</p>
                  <p className="text-xs text-gray-500">Next Monday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">JIRA Integration</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Asset Portal</span>
                  <Badge className="bg-green-100 text-green-800">Synced</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Batch Updates</span>
                  <Badge className="bg-green-100 text-green-800">Running</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Asset Utilization</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Clearance Rate</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Job Fill Rate</span>
                    <span>76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '76%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
