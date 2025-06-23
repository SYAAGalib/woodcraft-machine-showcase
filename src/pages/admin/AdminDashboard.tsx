
import React, { useState, useEffect } from 'react';
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
  type Product,
  type Category,
  type Inquiry
} from '@/utils/dataManager';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setInquiries(getInquiries());
  }, []);

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
      value: inquiries.length,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Views',
      value: products.reduce((sum, product) => sum + (product.viewCount || 0), 0),
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentInquiries = inquiries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const topProducts = products
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);

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
            {recentInquiries.length > 0 ? (
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
                        inquiry.status === 'new' 
                          ? 'bg-green-100 text-green-800' 
                          : inquiry.status === 'replied'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {inquiry.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No inquiries yet
              </div>
            )}
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
            {topProducts.length > 0 ? (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                        <span>{product.viewCount || 0} views</span>
                        <span className="capitalize">{product.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#387C2B]">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No products yet
              </div>
            )}
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
