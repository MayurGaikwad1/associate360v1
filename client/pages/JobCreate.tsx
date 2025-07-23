import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Upload, Plus, X, Building, Users, Calendar as CalendarIcon, FileText } from 'lucide-react';

export default function JobCreate() {
  const [formData, setFormData] = useState({
    hodName: '',
    department: 'IT Department', // System generated
    expectedExperience: '',
    doj: '',
    jobTitle: '',
    jobDescription: '',
    skillsRequired: '',
    hardwareRequirements: [] as string[],
    softwareRequirements: [] as string[],
    approvalDocument: null as File | null
  });

  const [newHardware, setNewHardware] = useState('');
  const [newSoftware, setNewSoftware] = useState('');

  const hardwareOptions = [
    'Laptop - Windows',
    'Laptop - MacBook',
    'Desktop PC',
    'Mobile Phone - Android',
    'Mobile Phone - iPhone',
    'Tablet - iPad',
    'Monitor - 24 inch',
    'Monitor - 27 inch',
    'Keyboard & Mouse',
    'Headset',
    'Webcam',
    'Docking Station'
  ];

  const softwareOptions = [
    'Microsoft Office 365',
    'Adobe Creative Suite',
    'Visual Studio Code',
    'IntelliJ IDEA',
    'Slack',
    'Zoom',
    'Figma',
    'Jira',
    'Confluence',
    'Git',
    'Docker',
    'AWS CLI'
  ];

  const addHardware = (item: string) => {
    if (!formData.hardwareRequirements.includes(item)) {
      setFormData({
        ...formData,
        hardwareRequirements: [...formData.hardwareRequirements, item]
      });
    }
  };

  const removeHardware = (item: string) => {
    setFormData({
      ...formData,
      hardwareRequirements: formData.hardwareRequirements.filter(h => h !== item)
    });
  };

  const addSoftware = (item: string) => {
    if (!formData.softwareRequirements.includes(item)) {
      setFormData({
        ...formData,
        softwareRequirements: [...formData.softwareRequirements, item]
      });
    }
  };

  const removeSoftware = (item: string) => {
    setFormData({
      ...formData,
      softwareRequirements: formData.softwareRequirements.filter(s => s !== item)
    });
  };

  const addCustomHardware = () => {
    if (newHardware.trim() && !formData.hardwareRequirements.includes(newHardware.trim())) {
      addHardware(newHardware.trim());
      setNewHardware('');
    }
  };

  const addCustomSoftware = () => {
    if (newSoftware.trim() && !formData.softwareRequirements.includes(newSoftware.trim())) {
      addSoftware(newSoftware.trim());
      setNewSoftware('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-generate Job ID
    const jobId = `JOB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    
    console.log('Job Posted:', {
      jobId,
      ...formData,
      status: 'Pending Approval',
      createdAt: new Date().toISOString(),
      createdBy: 'John Manager'
    });
    
    // Route to Procurement inbox
    alert(`Job posted successfully! Job ID: ${jobId}\nRouted to Procurement inbox for processing.`);
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job Posting</h1>
          <p className="text-gray-600">
            Post a new position for off-role employees under T&M agreement
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Essential details about the position and reporting structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="hodName">Head of Department (HOD)</Label>
                  <Input
                    id="hodName"
                    value={formData.hodName}
                    onChange={(e) => setFormData({...formData, hodName: e.target.value})}
                    placeholder="Enter HOD name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Input
                      id="department"
                      value={formData.department}
                      disabled
                      className="bg-gray-50"
                    />
                    <Badge className="absolute right-2 top-2 bg-blue-100 text-blue-800">
                      Auto-detected
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="e.g., Senior Software Developer"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="expectedExperience">Expected Experience</Label>
                  <Select onValueChange={(value) => setFormData({...formData, expectedExperience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-8">5-8 years</SelectItem>
                      <SelectItem value="8+">8+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="doj">Expected Date of Joining</Label>
                  <Input
                    id="doj"
                    type="date"
                    value={formData.doj}
                    onChange={(e) => setFormData({...formData, doj: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Job Description & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="jobDescription">Detailed Job Description</Label>
                <Textarea
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                  placeholder="Describe the role, responsibilities, and key requirements..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="skillsRequired">Skills Required</Label>
                <Textarea
                  id="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={(e) => setFormData({...formData, skillsRequired: e.target.value})}
                  placeholder="List required technical and soft skills..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Hardware Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Hardware Requirements</CardTitle>
              <CardDescription>
                Select hardware equipment needed for this position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {hardwareOptions.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={formData.hardwareRequirements.includes(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => formData.hardwareRequirements.includes(item) ? removeHardware(item) : addHardware(item)}
                    className="justify-start"
                  >
                    {item}
                  </Button>
                ))}
              </div>

              {formData.hardwareRequirements.length > 0 && (
                <div>
                  <Label>Selected Hardware:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.hardwareRequirements.map((item) => (
                      <Badge key={item} variant="secondary" className="flex items-center gap-1">
                        {item}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeHardware(item)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom hardware..."
                  value={newHardware}
                  onChange={(e) => setNewHardware(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomHardware())}
                />
                <Button type="button" onClick={addCustomHardware}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Software Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Software Requirements</CardTitle>
              <CardDescription>
                Select software tools and applications needed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {softwareOptions.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={formData.softwareRequirements.includes(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => formData.softwareRequirements.includes(item) ? removeSoftware(item) : addSoftware(item)}
                    className="justify-start"
                  >
                    {item}
                  </Button>
                ))}
              </div>

              {formData.softwareRequirements.length > 0 && (
                <div>
                  <Label>Selected Software:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.softwareRequirements.map((item) => (
                      <Badge key={item} variant="secondary" className="flex items-center gap-1">
                        {item}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSoftware(item)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Add custom software..."
                  value={newSoftware}
                  onChange={(e) => setNewSoftware(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSoftware())}
                />
                <Button type="button" onClick={addCustomSoftware}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Approval Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Approval Documentation
              </CardTitle>
              <CardDescription>
                Upload required approval documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload approval document
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      PDF, DOC, or DOCX up to 10MB
                    </span>
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Submit Job Posting
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
