
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  Phone,
  MessageSquare,
  Archive,
  Trash2,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  getInquiries, 
  updateInquiry, 
  deleteInquiry,
  type Inquiry 
} from '@/utils/dataManager';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    setInquiries(getInquiries());
  };

  const handleStatusUpdate = async (id: string, status: Inquiry['status']) => {
    try {
      updateInquiry(id, { 
        status,
        lastReply: status === 'replied' ? new Date().toISOString() : undefined
      });
      loadInquiries();
      toast({
        title: "Status Updated",
        description: `Inquiry status changed to ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inquiry status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        deleteInquiry(id);
        loadInquiries();
        setSelectedInquiry(null);
        toast({
          title: "Inquiry Deleted",
          description: "Inquiry has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete inquiry.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.product.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'replied': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Inquiries</h1>
          <p className="text-gray-600 mt-2">
            Manage and respond to customer inquiries and quote requests
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
          <Button className="bg-[#387C2B] hover:bg-[#2d6322]">
            <Mail className="h-4 w-4 mr-2" />
            Bulk Reply
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="w-full lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#387C2B]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="in-progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">
              {filteredInquiries.length} inquiries found
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {inquiries.filter(i => i.status === 'new').length} New
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                {inquiries.filter(i => i.status === 'in-progress').length} In Progress
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {inquiry.name}
                    </h3>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(inquiry.priority)}>
                      {inquiry.priority} priority
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {inquiry.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {inquiry.phone}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p><strong>Company:</strong> {inquiry.company}</p>
                      <p><strong>Product:</strong> {inquiry.product}</p>
                      <p><strong>Department:</strong> {inquiry.department}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {inquiry.message}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(inquiry.date)}
                      </span>
                      {inquiry.lastReply && (
                        <span>
                          Last reply: {formatDate(inquiry.lastReply)}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value as Inquiry['status'])}
                        className="px-2 py-1 text-xs border border-gray-300 rounded"
                      >
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="in-progress">In Progress</option>
                        <option value="archived">Archived</option>
                      </select>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(inquiry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No inquiries found
            </h3>
            <p className="text-gray-600">
              No inquiries match your current search criteria.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSelectedInquiry(null)} />
            <Card className="relative bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Inquiry Details</h3>
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(selectedInquiry.status)}>
                      {selectedInquiry.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(selectedInquiry.priority)}>
                      {selectedInquiry.priority} priority
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {selectedInquiry.name}</p>
                        <p><strong>Email:</strong> {selectedInquiry.email}</p>
                        <p><strong>Phone:</strong> {selectedInquiry.phone}</p>
                        <p><strong>Company:</strong> {selectedInquiry.company}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Inquiry Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Product:</strong> {selectedInquiry.product}</p>
                        <p><strong>Department:</strong> {selectedInquiry.department}</p>
                        <p><strong>Date:</strong> {formatDate(selectedInquiry.date)}</p>
                        {selectedInquiry.lastReply && (
                          <p><strong>Last Reply:</strong> {formatDate(selectedInquiry.lastReply)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Message</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedInquiry.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1"
                      onClick={() => handleStatusUpdate(selectedInquiry.id, 'replied')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Mark as Replied
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedInquiry.id, 'archived')}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
