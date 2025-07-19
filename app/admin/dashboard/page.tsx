"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiEdit, 
  FiImage, 
  FiShoppingBag, 
  FiUsers, 
  FiBook, 
  FiEye,
  FiTrendingUp,
  FiCalendar,
  FiMail
} from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  const quickActions = [
    {
      title: 'Edit Content',
      description: 'Update text, images, and content across all pages',
      icon: FiEdit,
      href: '/admin/content',
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Images',
      description: 'Upload, replace, and organize website images',
      icon: FiImage,
      href: '/admin/images',
      color: 'bg-green-500',
    },
    {
      title: 'Products',
      description: 'Add, edit, and manage your beauty products',
      icon: FiShoppingBag,
      href: '/admin/products',
      color: 'bg-purple-500',
    },
    {
      title: 'Testimonials',
      description: 'Manage client reviews and testimonials',
      icon: FiUsers,
      href: '/admin/testimonials',
      color: 'bg-pink-500',
    },
    {
      title: 'Academy',
      description: 'Manage courses and educational content',
      icon: FiBook,
      href: '/admin/academy',
      color: 'bg-indigo-500',
    },
    {
      title: 'Preview Site',
      description: 'View your website as visitors see it',
      icon: FiEye,
      href: '/',
      color: 'bg-gray-500',
      external: true,
    },
  ];

  const stats = [
    {
      title: 'Total Products',
      value: '4',
      icon: FiShoppingBag,
      change: '+2 this month',
      changeType: 'positive',
    },
    {
      title: 'Client Testimonials',
      value: '3',
      icon: FiUsers,
      change: '+1 this week',
      changeType: 'positive',
    },
    {
      title: 'Academy Courses',
      value: '6',
      icon: FiBook,
      change: 'No changes',
      changeType: 'neutral',
    },
    {
      title: 'Site Visits',
      value: '1.2k',
      icon: FiTrendingUp,
      change: '+15% this week',
      changeType: 'positive',
    },
  ];

  const recentActivity = [
    {
      action: 'Updated hero section image',
      time: '2 hours ago',
      type: 'content',
    },
    {
      action: 'Added new product: Luminous Foundation',
      time: '1 day ago',
      type: 'product',
    },
    {
      action: 'New testimonial from Sarah Johnson',
      time: '3 days ago',
      type: 'testimonial',
    },
    {
      action: 'Updated Albanian translations',
      time: '1 week ago',
      type: 'content',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{action.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FiImage className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Optimize Images</p>
                  <p className="text-xs text-gray-600">Keep images under 500KB for faster loading</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiEdit className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Update Content Regularly</p>
                  <p className="text-xs text-gray-600">Fresh content keeps visitors engaged</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiUsers className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Collect Testimonials</p>
                  <p className="text-xs text-gray-600">Client reviews build trust and credibility</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FiCalendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Schedule Updates</p>
                  <p className="text-xs text-gray-600">Plan content updates in advance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
