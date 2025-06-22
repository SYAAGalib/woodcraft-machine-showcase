
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Archive, 
  Users, 
  MessageSquare, 
  Settings,
  TrendingUp,
  Eye,
  ShoppingCart
} from 'lucide-react';
import { products, categories } from '@/data/products';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Archive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Categories',
      value: categories.length,
      icon: Settings,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Inquiries',
      value: 12,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Page Views',
      value: '2.4k',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentInquiries = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      product: 'DW-CNC-3020 Desktop CNC Router',
      date: '2024-01-15',
      status: 'New'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      product: 'DW-SAW-500 Horizontal Band Saw',
      date: '2024-01-14',
      status: 'Replied'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@workshop.com',
      product: 'DW-EDGE-300 Automatic Edge Bander',
      date: '2024-01-13',
      status: 'New'
    },
  ];

  const topProducts = products
    .filter(p => p.featured)
    .slice(0, 5)
    .map((product, index) => ({
      ...product,
      views: Math.floor(Math.random() * 500) + 100,
      inquiries: Math.floor(Math.random() * 20) + 5,
    }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Dolphine Wood Machineries admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Inquiries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                    <p className="text-sm text-gray-600">{inquiry.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{inquiry.product}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'New' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {inquiry.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Top Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                      <span>{product.views} views</span>
                      <span>{product.inquiries} inquiries</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#387C2B]">#{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/products"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <Archive className="h-8 w-8 text-[#387C2B] mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Manage Products</h3>
              <p className="text-sm text-gray-500 mt-1">Add, edit, or remove products</p>
            </a>
            
            <a
              href="/admin/categories"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <Settings className="h-8 w-8 text-[#387C2B] mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Manage Categories</h3>
              <p className="text-sm text-gray-500 mt-1">Organize product categories</p>
            </a>
            
            <a
              href="/admin/inquiries"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <Users className="h-8 w-8 text-[#387C2B] mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">View Inquiries</h3>
              <p className="text-sm text-gray-500 mt-1">Respond to customer inquiries</p>
            </a>
            
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <Eye className="h-8 w-8 text-[#387C2B] mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">View Site</h3>
              <p className="text-sm text-gray-500 mt-1">Preview the live website</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
