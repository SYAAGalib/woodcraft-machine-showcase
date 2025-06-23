
import React, { useEffect, useState } from 'react';
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
import {
  getProducts,
  getCategories,
  getInquiries,
  getProductStats,
  Product,
  Category,
  Inquiry
} from '@/utils/dataManager';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 0,
    totalInquiries: 0,
    newInquiries: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const loadedProducts = getProducts();
    const loadedCategories = getCategories();
    const loadedInquiries = getInquiries();
    const productStats = getProductStats();

    setProducts(loadedProducts);
    setCategories(loadedCategories);
    setInquiries(loadedInquiries);
    
    setStats({
      totalProducts: loadedProducts.length,
      totalViews: productStats.totalViews,
      totalInquiries: loadedInquiries.length,
      newInquiries: loadedInquiries.filter(i => i.status === 'new').length
    });
  };

  const dashboardStats = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
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
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentInquiries = inquiries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const topProducts = products
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
        {dashboardStats.map((stat, index) => (
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
              {stats.newInquiries > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.newInquiries} new
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{inquiry.name}</h4>
                      <p className="text-sm text-gray-600">{inquiry.email}</p>
                      {inquiry.product && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{inquiry.product}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        inquiry.status === 'new' 
                          ? 'bg-green-100 text-green-800' 
                          : inquiry.status === 'replied'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {inquiry.status.replace('-', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(inquiry.date)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No inquiries yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Top Products by Views</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length > 0 ? (
                topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                        <span>{product.viewCount} views</span>
                        <span className="capitalize">{product.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#387C2B]">#{index + 1}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Archive className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No products yet</p>
                </div>
              )}
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
              {stats.newInquiries > 0 && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                  {stats.newInquiries} new
                </span>
              )}
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
