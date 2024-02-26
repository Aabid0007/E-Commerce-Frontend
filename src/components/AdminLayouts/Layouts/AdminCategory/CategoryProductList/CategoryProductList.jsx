import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, updateCategoryId } from '../../../../../Redux/Slices/Product.Slice';
import { getCategories } from '../../../../../Redux/Slices/Category.Slice';
import AddProduct from '../../AdminProduct/AddProduct/AddProduct';
import EditProduct from '../../AdminProduct/EditProduct/EditProduct';
import DeleteProduct from '../../AdminProduct/DeleteProduct/DeleteProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CategoryProductList.css"
import AdminHeader from '../../AdminHeader/AdminHeader';
import AdminSideBar from '../../AdminSideBar/AdminSideBar';

const CategoryProductList = () => {
  const location = useLocation();
  const { product, loading, error } = useSelector((state) => state.product);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = location.state.categoryId;

  useEffect(() => {
    dispatch(getProducts({ categoryId }));
    dispatch(updateCategoryId(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
 
  const handleProductDetails = (productId) => {
    navigate('/admin/product-details',{state: { productId }})
};

  return (
    <div className='MainPage'>
      <div className='container'>
        <div className='Main_Heading'>
          <AdminHeader />
        </div>
      </div>
      <div className='PageSection'>
        <div className='container'>
          <div className="pageContent">
            <div className='adminSideBar'>
              <AdminSideBar />
            </div>
            <div className='pageBody'>
              <div className='productPage'>
                <div className='productHeading'>
                  <h2>Products</h2>
                  <button className='addBtn product' onClick={() => setAddModal(true)}>Create new</button>
                </div>
                <div className='ProductSection'>
                  <div className='productDetails'>
                    {product[0] && product?.map((products) => (
                      <div className='productCard' key={products._id}>
                        <div className='productCardImg' onClick={() => handleProductDetails(products._id)}>
                          <img src={`http://localhost:5001/${products.images[0]}`} alt="" />
                        </div>
                        <div className='cardContent'>
                          <h3>{products.name}</h3>
                          <p>{products.description}</p>
                          <div className='price'>${products.price}</div>
                          <div className='productAction'>
                            <button className='productBtn edit' onClick={() => setEditModal(products._id)} > <i className="fa-solid fa-pen"></i></button>
                            <button className='productBtn delete' onClick={() => setDeleteModal(products._id)}>  <i className="fa-regular fa-trash-can"></i></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {product?.length === 0 && <p className='NoProduct'>No Product found</p>}
                  {
                    addModal && <AddProduct closeModal={() => setAddModal(false)} />
                  }
                  {
                    editModal && <EditProduct editModalClose={() => setEditModal(false)} productId={editModal} />
                  }
                  {
                    deleteModal && <DeleteProduct deleteModalClose={() => { setDeleteModal(false) }} productId={deleteModal} />
                  }
                  {
                    loading && <div className="loading"> Loading ... </div>
                  }
                  {
                    error && <div className="error"> {error} </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CategoryProductList;
