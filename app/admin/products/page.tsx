'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Trash2, Plus, Edit2, X, AlertTriangle } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  burn_time: string
  image_url: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Scented')
  const [description, setDescription] = useState('')
  const [burnTime, setBurnTime] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formSubmitting, setFormSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingId(null)
    setName('')
    setPrice('')
    setCategory('Scented')
    setDescription('')
    setBurnTime('')
    setImageUrl('')
    setIsFormOpen(true)
  }

  function openEditModal(product: Product) {
    setEditingId(product.id)
    setName(product.name)
    setPrice(product.price.toString())
    setCategory(product.category)
    setDescription(product.description || '')
    setBurnTime(product.burn_time || '')
    setImageUrl(product.image_url || '')
    setIsFormOpen(true)
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price || !category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setFormSubmitting(true);

      let error = null;

      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, imageFile);

        if (uploadError) {
          alert("Image upload failed");
          return;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        uploadedImageUrl = data.publicUrl;
      }

      if (editingId) {
        // UPDATE
        const res = await supabase
          .from("products")
          .update({
            name,
            price: Number(price),
            category,
            burn_time: burnTime || null,
            image_url: uploadedImageUrl || null,
            description: description || null
          })
          .eq("id", editingId)
          .select();

        error = res.error;

      } else {
        // INSERT
        const res = await supabase
          .from("products")
          .insert([
            {
              name,
              price: Number(price),
              category,
              burn_time: burnTime || null,
              image_url: uploadedImageUrl || null,
              description: description || null
            }
          ])
          .select();

        error = res.error;
      }

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert("Success ✅");

      // RESET
      setName("");
      setPrice("");
      setCategory("Scented");
      setBurnTime("");
      setImageUrl("");
      setDescription("");

      setIsFormOpen(false);
      fetchProducts();

    } catch (err) {
      console.error("CATCH ERROR:", err);
    } finally {
      setFormSubmitting(false);
    }
  }
  async function executeDelete() {
    if (!deleteConfirmId) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteConfirmId)

      if (error) throw error

      toast.success('Product deleted')
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    } finally {
      setDeleteConfirmId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-32 animate-in fade-in duration-700">

      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-light text-[#F5F1E8] mb-2">Products Management</h1>
          <p className="text-[#F5F1E8]/50 font-light tracking-wide">Add, edit, and organize your luxury collection.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 rounded border border-[#D4AF37] bg:transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] font-light tracking-wider"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#0B0B0B] border border-[#D4AF37]/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {loading ? (
          <div className="p-12 text-center text-[#D4AF37] font-light tracking-widest uppercase animate-pulse">
            Loading Catalog...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4AF37]/20 bg-[#D4AF37]/5">
                  <th className="px-8 py-5 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Name</th>
                  <th className="px-8 py-5 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Price</th>
                  <th className="px-8 py-5 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Category</th>
                  <th className="px-8 py-5 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs">Burn Time</th>
                  <th className="px-8 py-5 font-light text-[#F5F1E8]/60 uppercase tracking-widest text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors group">
                    <td className="px-8 py-5 text-[#F5F1E8] font-light">{product.name}</td>
                    <td className="px-8 py-5 text-[#D4AF37] font-light">${Number(product.price || 0).toFixed(2)}</td>
                    <td className="px-8 py-5 text-[#F5F1E8]/60 font-light">{product.category}</td>
                    <td className="px-8 py-5 text-[#F5F1E8]/60 font-light text-sm italic">{product.burn_time || '-'}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 border border-[#D4AF37]/30 text-[#D4AF37] rounded hover:bg-[#D4AF37]/20 transition-all hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/20 transition-all hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-[#F5F1E8]/40 font-light italic">
                      No products found. Add a product to your catalog.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* -------------------- MODALS -------------------- */}

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300 px-4 py-10 overflow-y-auto">
          <div className="bg-[#0B0B0B] border border-[#D4AF37]/30 w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] relative h-auto max-h-[75vh] overflow-y-auto my-auto">
            <div className="px-8 py-6 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#D4AF37]/5">
              <h2 className="text-2xl font-serif font-light text-[#F5F1E8]">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-[#F5F1E8]/50 hover:text-[#D4AF37] transition-colors p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="max-w-4xl mx-auto pb-32 p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all font-light"
                    placeholder="e.g. Midnight Ember"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all font-light"
                    placeholder="e.g. 45.00"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all font-light"
                  >
                    <option value="Scented">Scented Candles</option>
                    <option value="Decorative">Decorative Candles</option>
                    <option value="Festive">Festive Candles</option>
                    <option value="Custom">Custom Candles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Burn Time</label>
                  <input
                    type="text"
                    value={burnTime}
                    onChange={(e) => setBurnTime(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all font-light"
                    placeholder="e.g. 45-50 hours"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Image URL</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] hover:border-[#D4AF37]/70 transition-all font-light"
                />
                {imageFile && (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    className="mt-4 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#F5F1E8]/60 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37] hover:border-[#D4AF37]/70 transition-all font-light"
                  rows={4}
                  placeholder="Luxurious blend of..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-4 border-t border-[#D4AF37]/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-transparent text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[#F5F1E8]/5 transition-all font-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-8 py-2.5 rounded-lg bg-[#D4AF37] text-black hover:bg-[#E8DCCB] font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 px-4">
          <div className="bg-[#0B0B0B] border border-red-500/30 w-full max-w-sm rounded-2xl shadow-[0_10px_50px_rgba(239,68,68,0.15)] overflow-hidden text-center p-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-light text-[#F5F1E8] mb-4">Are you sure?</h3>
            <p className="text-[#F5F1E8]/60 font-light mb-8">
              This action cannot be undone. This product will be permanently deleted from your catalog.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={executeDelete}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium tracking-wide transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Yes, Delete Product
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-full py-3 rounded-lg border border-transparent hover:border-[#F5F1E8]/20 text-[#F5F1E8]/60 hover:text-[#F5F1E8] hover:bg-[#F5F1E8]/5 transition-all font-light"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
