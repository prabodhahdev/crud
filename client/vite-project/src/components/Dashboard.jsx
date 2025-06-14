import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

const Dashboard = () => {
  const { user, token, logout } = useContext(AuthContext);

  const [view, setView] = useState('add'); // 'add' or 'list' or 'edit'
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('http://localhost:5000/api/products', config);
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [token]);

  const handleAddProduct = async ({ title, description }) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post('http://localhost:5000/api/products/create', { title, description }, config);
      setProducts([...products, res.data]);
      setView('list');
      alert('Successfully added');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert('Successfully Deleted');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleEditClick = (id) => {
    const product = products.find((p) => p._id === id);
    setEditProduct(product);
    setView('edit');
  };

  const handleUpdateProduct = async ({ title, description }) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.put(
        `http://localhost:5000/api/products/edit/${editProduct._id}`,
        { title, description },
        config
      );
      setProducts((prev) => prev.map((p) => (p._id === editProduct._id ? res.data : p)));
      setEditProduct(null);
      setView('list');
      alert('Successfully Edited');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <nav className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 shadow-sm gap-4 sm:gap-0">
        <div className="text-lg font-semibold text-gray-800">
          Welcome, {user?.name || 'User'}
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => {
              setView('add');
              setEditProduct(null);
            }}
            disabled={view === 'add'}
            className={`px-4 py-2 rounded font-semibold transition ${
              view === 'add'
                ? 'text-blue-600 cursor-default'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            }`}
          >
            Add Product
          </button>

          <button
            onClick={() => {
              setView('list');
              setEditProduct(null);
            }}
            disabled={view === 'list'}
            className={`px-4 py-2 rounded font-semibold transition ${
              view === 'list'
                ? 'text-blue-600 cursor-default'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            }`}
          >
            All Products
          </button>

          <button
            onClick={logout}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        {view === 'add' && <AddProduct onSubmit={handleAddProduct} mode="add" />}
        {view === 'edit' && <AddProduct onSubmit={handleUpdateProduct} initialData={editProduct} mode="edit" />}
        {view === 'list' && <ProductList products={products} onDelete={handleDelete} onEdit={handleEditClick} />}
      </main>
    </div>
  );
};

export default Dashboard;
