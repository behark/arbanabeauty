"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowLeft, FiPrinter, FiDownload, FiMail, FiEdit, FiCheckCircle } from "react-icons/fi";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAuthCheck from "@/components/admin/AdminAuthCheck";
import { Order, OrderStatus } from "@/types/order";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/utils/helpers";

export default function OrderDetailsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the order
  useEffect(() => {
    const loadOrder = () => {
      try {
        const savedOrders = localStorage.getItem("adminOrders");
        if (savedOrders) {
          const orders: Order[] = JSON.parse(savedOrders);
          const foundOrder = orders.find(order => order.id === orderId);
          
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            setError(t('admin.orders.orderNotFound'));
          }
        } else {
          setError(t('admin.orders.noOrdersFound'));
        }
      } catch (error) {
        console.error("Error loading order:", error);
        setError(t('admin.orders.loadError'));
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId, t]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle updating order status
  const handleUpdateStatus = (newStatus: OrderStatus) => {
    if (!order) return;
    
    try {
      // Get all orders from localStorage
      const savedOrders = localStorage.getItem("adminOrders");
      if (savedOrders) {
        const orders: Order[] = JSON.parse(savedOrders);
        
        // Update the order status
        const updatedOrders = orders.map(o => {
          if (o.id === orderId) {
            return {
              ...o,
              status: newStatus,
              updatedAt: new Date().toISOString()
            };
          }
          return o;
        });
        
        // Save back to localStorage
        localStorage.setItem("adminOrders", JSON.stringify(updatedOrders));
        
        // Update local state
        setOrder(prevOrder => {
          if (!prevOrder) return null;
          return {
            ...prevOrder,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert(t('admin.orders.updateError'));
    }
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

  // Generate and download invoice PDF
  const generateInvoice = () => {
    alert(t('admin.orders.invoiceGenerating'));
    // In a real implementation, this would generate a PDF invoice
  };

  // Send order confirmation email
  const sendOrderEmail = () => {
    alert(t('admin.orders.emailSent'));
    // In a real implementation, this would send an email
  };

  return (
    <AdminAuthCheck>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header with Back Button and Order Info */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/admin/orders")}
                className="p-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiArrowLeft size={18} />
              </button>
              <h1 className="text-2xl font-bold">
                {isLoading ? t('admin.loading') : (
                  error ? t('admin.error') : `Viewing Order ${order?.orderNumber || ''}`
                )}
              </h1>
            </div>
            
            {!isLoading && !error && order && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={generateInvoice}
                  className="btn-secondary flex items-center gap-1"
                >
                  <FiDownload size={16} />
                  {t('admin.orders.downloadInvoice')}
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-secondary flex items-center gap-1"
                >
                  <FiPrinter size={16} />
                  {t('admin.orders.print')}
                </button>
                <button
                  onClick={sendOrderEmail}
                  className="btn-secondary flex items-center gap-1"
                >
                  <FiMail size={16} />
                  {t('admin.orders.sendEmail')}
                </button>
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p>{error}</p>
              <button
                onClick={() => router.push("/admin/orders")}
                className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
              >
                {t('admin.backToOrders')}
              </button>
            </div>
          ) : order ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Summary and Status */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Status */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{t('admin.orders.status')}</h2>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                          {t(`admin.orders.status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{formatDate(order.updatedAt)}</span>
                      </div>
                    </div>
                    
                    {/* Status Update Dropdown */}
                    <div className="relative group">
                      <button className="btn-primary flex items-center gap-1">
                        <FiEdit size={16} />
                        {t('admin.orders.updateStatus')}
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
                        <div className="py-1">
                          {["pending", "processing", "shipped", "delivered", "completed", "cancelled", "refunded"].map((status) => (
                            <button
                              key={status}
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={() => handleUpdateStatus(status as OrderStatus)}
                            >
                              {t(`admin.orders.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Timeline */}
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium mb-4">{t('admin.orders.timeline')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <FiCheckCircle size={16} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {t('admin.orders.orderPlaced')}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      
                      {/* More timeline items would go here in a real implementation */}
                      {order.status !== "pending" && (
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <FiCheckCircle size={16} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {t('admin.orders.statusProcessing')}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(order.updatedAt)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">{t('admin.orders.orderItems')}</h2>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-4 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                          <div className="relative h-full w-full">
                            <Image
                              src={item.productSnapshot.image}
                              alt={item.productSnapshot.title}
                              fill
                              className="object-cover object-center"
                              sizes="64px"
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                              <h3>
                                <a href={`/shop/${item.productSnapshot.slug}`}>
                                  {item.productSnapshot.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                {formatPrice(item.price * item.quantity, order.currency)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {formatPrice(item.price, order.currency)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Customer and Payment Info */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">{t('admin.orders.summary')}</h2>
                  <div className="flow-root">
                    <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="flex justify-between items-center py-4">
                        <dt className="text-gray-600 dark:text-gray-400">{t('admin.orders.subtotal')}</dt>
                        <dd className="font-medium text-gray-900 dark:text-white">
                          {formatPrice(order.subtotal, order.currency)}
                        </dd>
                      </div>
                      {order.tax > 0 && (
                        <div className="flex justify-between items-center py-4">
                          <dt className="text-gray-600 dark:text-gray-400">{t('admin.orders.tax')}</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(order.tax, order.currency)}
                          </dd>
                        </div>
                      )}
                      {order.shipping > 0 && (
                        <div className="flex justify-between items-center py-4">
                          <dt className="text-gray-600 dark:text-gray-400">{t('admin.orders.shipping')}</dt>
                          <dd className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(order.shipping, order.currency)}
                          </dd>
                        </div>
                      )}
                      {order.discount > 0 && (
                        <div className="flex justify-between items-center py-4">
                          <dt className="text-gray-600 dark:text-gray-400">{t('admin.orders.discount')}</dt>
                          <dd className="font-medium text-green-600 dark:text-green-400">
                            -{formatPrice(order.discount, order.currency)}
                          </dd>
                        </div>
                      )}
                      <div className="flex justify-between items-center py-4">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">{t('admin.orders.total')}</dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(order.total, order.currency)}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customer Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">{t('admin.orders.customerInfo')}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.name')}</h3>
                      <p className="mt-1">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.contact')}</h3>
                      <p className="mt-1">{order.customerInfo.email}</p>
                      {order.customerInfo.phone && <p className="mt-1">{order.customerInfo.phone}</p>}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.shippingAddress')}</h3>
                      <p className="mt-1">{order.customerInfo.address.line1}</p>
                      {order.customerInfo.address.line2 && <p>{order.customerInfo.address.line2}</p>}
                      <p>{order.customerInfo.address.city}, {order.customerInfo.address.postalCode}</p>
                      {order.customerInfo.address.state && <p>{order.customerInfo.address.state}</p>}
                      <p>{order.customerInfo.address.country}</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">{t('admin.orders.paymentInfo')}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.paymentMethod')}</h3>
                      <p className="mt-1">{t(`admin.orders.method${order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}`)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.paymentStatus')}</h3>
                      <p className="mt-1">{t(`admin.orders.payment${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}`)}</p>
                    </div>
                    {order.paymentId && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('admin.orders.transactionId')}</h3>
                        <p className="mt-1">{order.paymentId}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </AdminLayout>
    </AdminAuthCheck>
  );
}
