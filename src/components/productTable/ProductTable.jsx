// src/components/ProductTable.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../store/productslice/productSlice";
import "./producttable.css";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);


  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "", 
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);


  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (product) => {
    setEditProductId(product.id);
    setEditedProduct({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image, 
    });
  };

  const handleSave = (id) => {
    dispatch(updateProduct({ id, ...editedProduct }));
    setEditProductId(null);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="product-container">
      {items.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          {editProductId === product.id ? (
            <>
              <input
                type="text"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, title: e.target.value })
                }
              />
              <input
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              />
              <input type="file" onChange={handleImageChange} />
              <button onClick={() => handleSave(product.id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{product.title}</h3>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <div className="buttonGroup">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
