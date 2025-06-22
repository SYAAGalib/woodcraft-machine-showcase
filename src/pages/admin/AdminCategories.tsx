
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/products';

const AdminCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">
            Organize and manage your product categories
          </p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#387C2B] hover:bg-[#2d6322]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600">
              {filteredCategories.length} categories found
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="group hover:shadow-lg transition-all duration-200">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200" />
              <div className="absolute top-4 right-4">
                <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
                <span className="bg-[#387C2B] text-white text-sm px-2 py-1 rounded-full">
                  {category.productCount}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {category.description}
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <div className="h-16 w-16 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                <Plus className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or add a new category.
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Category
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowAddModal(false)} />
            <Card className="relative bg-white rounded-lg max-w-lg w-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name
                    </label>
                    <Input placeholder="e.g. CNC Machines" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#387C2B]"
                      rows={3}
                      placeholder="Brief description of the category..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload category image</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button onClick={() => setShowAddModal(false)} className="flex-1">
                    Create Category
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
