import React, { useState, useEffect } from 'react';

const AddProduct = ({ onSubmit, initialData = { title: '', description: '' }, mode = 'add' }) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  // Update inputs if initialData changes (important when editing a new product)
  useEffect(() => {
    setTitle(initialData.title);
    setDescription(initialData.description);
  }, [initialData.title, initialData.description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please enter both title and description');
      return;
    }
    onSubmit({ title, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        {mode === 'edit' ? 'Edit Product' : 'Add Product'}
      </h2>

      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-gray-700 font-medium mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
          autoComplete="off"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-medium mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={5}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
      >
        {mode === 'edit' ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProduct;
//comment