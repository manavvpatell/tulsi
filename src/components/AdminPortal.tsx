import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, MetalCraft, OrderStatus } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Package, 
  RotateCcw, 
  CheckCircle2, 
  Send, 
  Truck, 
  ShieldCheck, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    resetCatalog,
    orders,
    updateOrderStatus,
    formatPrice,
    setActiveTab
  } = useShop();

  const [activeTab, setActiveTabLocal] = useState<'products' | 'orders'>('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Adding / Editing Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'necklaces' as ProductCategory,
    price: 95000,
    originalPrice: 110000,
    craft: '22K Royal Gold' as MetalCraft,
    goldPurity: '22K' as '22K' | '18K' | '14K',
    grossWeight: '24.5g',
    netGoldWeight: '22.0g',
    diamondCarat: '',
    stoneDetails: '',
    image: '/src/assets/images/category_necklace_banner_1791946992514.jpg',
    description: '',
    inStock: true,
    featured: false,
    hallmarking: 'BIS 916 Hallmarked & Certified by Assaying Centre'
  });

  const presetImages = [
    { label: 'Polki Choker', url: '/src/assets/images/product_polki_choker_1791946991224.jpg' },
    { label: 'Solitaire Ring', url: '/src/assets/images/product_solitaire_ring_1791946993300.jpg' },
    { label: 'Temple Jhumkas', url: '/src/assets/images/product_temple_jhumka_1791946992985.jpg' },
    { label: 'Layered Necklace', url: '/src/assets/images/category_necklace_banner_1791946992514.jpg' }
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'necklaces',
      price: 95000,
      originalPrice: 110000,
      craft: '22K Royal Gold',
      goldPurity: '22K',
      grossWeight: '24.5g',
      netGoldWeight: '22.0g',
      diamondCarat: '',
      stoneDetails: '',
      image: '/src/assets/images/category_necklace_banner_1791946992514.jpg',
      description: '',
      inStock: true,
      featured: false,
      hallmarking: 'BIS 916 Hallmarked & Certified by Assaying Centre'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      craft: prod.craft,
      goldPurity: prod.goldPurity,
      grossWeight: prod.grossWeight,
      netGoldWeight: prod.netGoldWeight || '',
      diamondCarat: prod.diamondCarat || '',
      stoneDetails: prod.stoneDetails || '',
      image: prod.image,
      description: prod.description,
      inStock: prod.inStock,
      featured: !!prod.featured,
      hallmarking: prod.hallmarking
    });
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData
      });
    } else {
      addProduct(formData);
    }

    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="py-12 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C7D6B] font-medium block mb-1">
              Atelier Management Console
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal">
              Tulsi Jewellers Admin Portal
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Add new jewelry heirlooms, delete discontinued items, and update customer shipment tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetCatalog}
              className="px-3.5 py-2 text-xs uppercase tracking-wider font-medium text-stone-600 bg-white border border-stone-200 rounded-sm hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              title="Reset catalog to master collection"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default Catalog</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2 bg-[#1A1816] text-[#F9F7F2] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Piece</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 mb-6 sm:mb-8 gap-4 sm:gap-8 overflow-x-auto whitespace-nowrap pb-1">
          <button
            onClick={() => setActiveTabLocal('products')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative flex items-center gap-2 ${
              activeTab === 'products'
                ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Product Catalog Inventory ({products.length} pieces)</span>
          </button>

          <button
            onClick={() => setActiveTabLocal('orders')}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1A1816]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Order Fulfillment & Shipping Updates ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Piece</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Craft & Purity</th>
                    <th className="p-4">Weight</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/60 transition-colors">
                      {/* Piece info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden border border-stone-200 shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-editorial text-sm font-semibold text-stone-900 block leading-snug">
                              {prod.name}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {prod.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 uppercase tracking-wider text-[11px] font-medium text-stone-600">
                        {prod.category}
                      </td>

                      {/* Craft & Purity */}
                      <td className="p-4">
                        <span className="font-medium text-stone-800">{prod.craft}</span>
                        <span className="text-stone-400 block text-[10px]">{prod.goldPurity} Gold</span>
                      </td>

                      {/* Weight */}
                      <td className="p-4 tabular-nums">
                        {prod.grossWeight}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-semibold text-stone-900 tabular-nums">
                        {formatPrice(prod.price)}
                      </td>

                      {/* Stock status */}
                      <td className="p-4">
                        <button
                          onClick={() => updateProduct({ ...prod, inStock: !prod.inStock })}
                          className={`px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold tracking-wider transition-colors ${
                            prod.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          }`}
                        >
                          {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                            title="Edit Piece"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => setDeleteConfirmId(prod.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 transition-colors"
                            title="Delete Piece from Catalog"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & SHIPMENT FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D6] rounded-sm text-xs text-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A880]" />
                <span>
                  Updating an order status to <strong>&ldquo;Shipped&rdquo;</strong> will automatically generate and dispatch an Insured Shipment Update email to the customer!
                </span>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer & Destination</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Current Status</th>
                      <th className="p-4">Update Pipeline (Triggers Email)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-4">
                          <span className="font-semibold text-stone-900 block">#{order.id}</span>
                          <span className="text-[10px] text-stone-400">{order.date}</span>
                          <span className="text-[10px] font-mono text-[#8C7D6B] block mt-0.5">{order.trackingNumber}</span>
                        </td>

                        <td className="p-4">
                          <span className="font-semibold text-stone-900 block">{order.shippingAddress.fullName}</span>
                          <span className="text-[11px] text-stone-500">{order.shippingAddress.email}</span>
                          <span className="text-[10px] text-stone-400 block">{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                        </td>

                        <td className="p-4">
                          <div className="text-xs space-y-0.5">
                            {order.items.map((it, idx) => (
                              <p key={idx} className="line-clamp-1">
                                {it.quantity}x {it.name}
                              </p>
                            ))}
                          </div>
                        </td>

                        <td className="p-4 font-semibold text-stone-900 tabular-nums">
                          {formatPrice(order.total)}
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold tracking-wider ${
                            order.status === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'shipped' || order.status === 'out_for_delivery'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="p-1.5 text-xs bg-stone-50 border border-stone-200 rounded-sm font-medium uppercase tracking-wider text-stone-800 focus:outline-none focus:border-[#C5A880]"
                          >
                            <option value="confirmed">1. Confirmed</option>
                            <option value="crafting">2. Crafting & Hallmarking</option>
                            <option value="quality_check">3. Quality Check</option>
                            <option value="shipped">4. Shipped (Dispatch Email)</option>
                            <option value="out_for_delivery">5. Out for Delivery</option>
                            <option value="delivered">6. Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
              
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAFAF8]">
                <h3 className="font-editorial text-xl font-medium text-stone-900">
                  {editingProduct ? 'Edit Jewellery Piece' : 'Add New Piece to Tulsi Jewellers Catalog'}
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
                
                {/* Title */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Piece Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    placeholder="e.g. Royal Rajputana Polki Hasli Necklace"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm uppercase tracking-wider"
                    >
                      <option value="necklaces">Necklaces</option>
                      <option value="rings">Rings</option>
                      <option value="earrings">Earrings</option>
                    </select>
                  </div>

                  {/* Craft */}
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Craft / Style *
                    </label>
                    <select
                      value={formData.craft}
                      onChange={(e) => setFormData({ ...formData, craft: e.target.value as MetalCraft })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    >
                      <option value="22K Royal Gold">22K Royal Gold</option>
                      <option value="Polki & Kundan">Polki & Kundan</option>
                      <option value="Solitaire Diamond">Solitaire Diamond</option>
                      <option value="Antique Temple">Antique Temple</option>
                      <option value="Rose Gold & Diamonds">Rose Gold & Diamonds</option>
                    </select>
                  </div>

                  {/* Gold Purity */}
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Gold Purity *
                    </label>
                    <select
                      value={formData.goldPurity}
                      onChange={(e) => setFormData({ ...formData, goldPurity: e.target.value as '22K' | '18K' | '14K' })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm uppercase tracking-wider"
                    >
                      <option value="22K">22K (91.6% Pure)</option>
                      <option value="18K">18K (75.0% Pure)</option>
                      <option value="14K">14K (58.5% Pure)</option>
                    </select>
                  </div>
                </div>

                {/* Weights & Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Gross Weight *
                    </label>
                    <input
                      type="text"
                      value={formData.grossWeight}
                      onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                      placeholder="e.g. 34.2g"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Net Gold Weight
                    </label>
                    <input
                      type="text"
                      value={formData.netGoldWeight}
                      onChange={(e) => setFormData({ ...formData, netGoldWeight: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                      placeholder="e.g. 30.5g"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Diamond Carat
                    </label>
                    <input
                      type="text"
                      value={formData.diamondCarat}
                      onChange={(e) => setFormData({ ...formData, diamondCarat: e.target.value })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                      placeholder="e.g. 1.25 ct VVS1"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Selling Price (INR ₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Original Price (MSRP Strikethrough)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    />
                  </div>
                </div>

                {/* Image URL & Presets */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Jewellery Image Path or URL *
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm mb-2"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-stone-400">Quick luxury presets:</span>
                    {presetImages.map((pr) => (
                      <button
                        key={pr.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: pr.url })}
                        className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[10px]"
                      >
                        {pr.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Artisan Craft Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                    placeholder="Describe the royal heritage, gemstones, and carving techniques..."
                  />
                </div>

                {/* Hallmarking Text */}
                <div>
                  <label className="block text-stone-600 uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Hallmarking & Certification Text
                  </label>
                  <input
                    type="text"
                    value={formData.hallmarking}
                    onChange={(e) => setFormData({ ...formData, hallmarking: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-sm"
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="accent-[#1A1816] w-4 h-4 rounded"
                    />
                    <span className="text-stone-700 font-medium">In Stock (Available for Purchase)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="accent-[#1A1816] w-4 h-4 rounded"
                    />
                    <span className="text-stone-700 font-medium">Featured on Home</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 rounded-sm uppercase tracking-wider font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1A1816] text-white rounded-sm uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
                  >
                    {editingProduct ? 'Save Updates' : 'Add to Catalog'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-sm max-w-sm w-full border border-stone-200 shadow-xl text-center space-y-4">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-medium text-stone-900">
                Confirm Deletion
              </h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to permanently remove this fine jewellery piece from the live catalog?
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 border border-stone-200 text-stone-600 rounded-sm text-xs uppercase tracking-wider font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 bg-rose-600 text-white rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-rose-700"
                >
                  Delete Piece
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
