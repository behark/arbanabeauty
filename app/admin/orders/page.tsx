"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FiSearch, FiFilter, FiChevronDown, FiChevronUp, 
  FiEye, FiEdit, FiTrash2, FiDownload, FiRefreshCw 
} from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthCheck from "@/components/admin/AdminAuthCheck";
import { Order, OrderStatus } from "@/types/order";
import { orders as initialOrders } from "@/data/orders";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/utils/helpers";

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  return (
    <AdminAuthCheck>
      <OrdersManager />
    </AdminAuthCheck>
  );
}

function OrdersManager() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");
  const [sortField, setSortField] = useState<"date" | "total" | "status">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"all" | "recent" | "unpaid">("all");

  // Load orders from localStorage or use initial data
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem("adminOrders");
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        } else {
          setOrders(initialOrders);
          localStorage.setItem("adminOrders", JSON.stringify(initialOrders));
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders(initialOrders);
      }
      setIsLoading(false);
    };

    loadOrders();
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("adminOrders", JSON.stringify(orders));
    }
  }, [orders, isLoading]);

  // Handle deletion of an order
  const handleDeleteOrder = (orderId: string) => {
    if (confirm(t('admin.orders.deleteConfirm'))) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  // Handle viewing order details
  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  // Handle updating order status
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
  };

  // Filter orders based on search term, status and view mode
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    
    const isRecent = viewMode !== "recent" || new Date(order.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
    
    const isUnpaid = viewMode !== "unpaid" || order.paymentStatus !== "completed";
    
    return matchesSearch && matchesStatus && isRecent && isUnpaid;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc" 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortField === "total") {
      return sortDirection === "asc" 
        ? a.total - b.total
        : b.total - a.total;
    } else { // status
      return sortDirection === "asc" 
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
  });

  // Handle sort toggle
  const handleSort = (field: "date" | "total" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  // Export orders as CSV
  const exportOrdersCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header
    csvContent += "Order Number,Date,Customer,Total,Status,Payment Status\n";
    
    // Data
    filteredOrders.forEach(order => {
      const row = [
        order.orderNumber,
        formatDate(order.createdAt),
        `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        `${order.currency}${order.total.toFixed(2)}`,
        order.status,
        order.paymentStatus
      ].map(cell => `"${cell}"`).join(",");
      
      csvContent += row + "\n";
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('admin.orders.title')}</h1>
          <div className="flex space-x-2">
            <button
              onClick={exportOrdersCSV}
              className="btn-secondary flex items-center gap-2"
              title={t('admin.orders.export')}
            >
              <FiDownload size={18} />
              {t('admin.orders.export')}
            </button>
          </div>
        </div>
        
        {/* Filters, Search and View Mode */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.orders.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          
          <div className="flex-1 md:max-w-xs">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | "all")}
                className="w-full p-2 border rounded-md appearance-none pr-10 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">{t('admin.orders.allStatuses')}</option>
                <option value="pending">{t('admin.orders.statusPending')}</option>
                <option value="processing">{t('admin.orders.statusProcessing')}</option>
                <option value="shipped">{t('admin.orders.statusShipped')}</option>
                <option value="delivered">{t('admin.orders.statusDelivered')}</option>
                <option value="completed">{t('admin.orders.statusCompleted')}</option>
                <option value="cancelled">{t('admin.orders.statusCancelled')}</option>
                <option value="refunded">{t('admin.orders.statusRefunded')}</option>
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 md:max-w-xs">
            <div className="relative">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as "all" | "recent" | "unpaid")}
                className="w-full p-2 border rounded-md appearance-none pr-10 dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="all">{t('admin.orders.viewAll')}</option>
                <option value="recent">{t('admin.orders.viewRecent')}</option>
                <option value="unpaid">{t('admin.orders.viewUnpaid')}</option>
              </select>
              <FiRefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.orders.orderNumber')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    {t('admin.orders.date')}
                    {sortField === "date" ? (
                      sortDirection === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    ) : null}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.orders.customer')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("total")}
                >
                  <div className="flex items-center">
                    {t('admin.orders.total')}
                    {sortField === "total" ? (
                      sortDirection === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    ) : null}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    {t('admin.orders.status')}
                    {sortField === "status" ? (
                      sortDirection === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                    ) : null}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('admin.orders.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    {t('admin.loading')}...
                  </td>
                </tr>
              ) : sortedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    {t('admin.orders.noOrders')}
                  </td>
                </tr>
              ) : (
                sortedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.customerInfo.firstName} {order.customerInfo.lastName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customerInfo.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatPrice(order.total, order.currency)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.items.length} {order.items.length === 1 ? t('admin.orders.item') : t('admin.orders.items')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {t(`admin.orders.status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {t(`admin.orders.payment${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title={t('admin.orders.view')}
                        >
                          <FiEye size={18} />
                        </button>
                        {/* Status update dropdown */}
                        <div className="relative group">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title={t('admin.orders.updateStatus')}
                          >
                            <FiEdit size={18} />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
                            <div className="py-1">
                              {["pending", "processing", "shipped", "delivered", "completed", "cancelled", "refunded"].map((status) => (
                                <button
                                  key={status}
                                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => handleUpdateStatus(order.id, status as OrderStatus)}
                                >
                                  {t(`admin.orders.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title={t('admin.orders.delete')}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Order Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.totalOrders')}</h3>
            <p className="text-2xl font-semibold mt-1">{orders.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.totalRevenue')}</h3>
            <p className="text-2xl font-semibold mt-1">
              {formatPrice(orders.reduce((total, order) => total + order.total, 0), "€")}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.avgOrderValue')}</h3>
            <p className="text-2xl font-semibold mt-1">
              {orders.length > 0 
                ? formatPrice(orders.reduce((total, order) => total + order.total, 0) / orders.length, "€")
                : formatPrice(0, "€")
              }
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
