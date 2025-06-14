import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="w-full rounded-lg border border-gray-300 p-2">
      {/* Desktop Table */}
      <table className="min-w-full bg-white border-collapse hidden sm:table">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-5 text-left w-12 border border-gray-300">#</th>
            <th className="py-3 px-5 text-left w-44 border border-gray-300">Title</th>
            <th className="py-3 px-5 text-left border border-gray-300">Description</th>
            <th className="py-3 px-5 text-center w-36 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 italic text-gray-500">
                No products added yet.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr
                key={product._id}
                className={`border border-gray-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-colors duration-200`}
              >
                <td className="py-4 px-5 font-semibold border border-gray-300">{index + 1}</td>
                <td className="py-4 px-5 font-semibold border border-gray-300">{product.title}</td>
                <td className="py-4 px-5 border border-gray-300 break-words">{product.description}</td>
                <td className="py-4 px-5 flex justify-center space-x-6 border border-gray-300 text-gray-700">
                  <button
                    onClick={() => onEdit(product._id)}
                    className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    aria-label="Edit product"
                    title="Edit"
                  >
                    <FiEdit size={22} />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                    aria-label="Delete product"
                    title="Delete"
                  >
                    <FiTrash2 size={22} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {products.length === 0 ? (
          <p className="text-center py-10 italic text-gray-500">No products added yet.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">#{index + 1}</span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(product._id)}
                    className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    aria-label="Edit product"
                    title="Edit"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                    aria-label="Delete product"
                    title="Delete"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Title: </span>
                <span className="text-gray-900">{product.title}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Description: </span>
                <p className="text-gray-800 whitespace-pre-wrap">{product.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
