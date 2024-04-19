import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { IoMenuOutline, IoAddOutline } from "react-icons/io5";
import { LuListTree } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { TfiReload } from "react-icons/tfi";
import { deleteProduct, readProduct } from "../../services/userService";
import ModalProductDelete from "./ModalProductDelete";
import ModalProductCreate from "./ModalProductCreate";
import ModalProductEdit from "./ModalProductEdit/ModalProductEdit";

const cx = classNames.bind(styles);

const Products = () => {
  // Pagination
  const [listDataProduct, setListDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModelDelete, setDataModalDelete] = useState([]);

  // Edit
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState({});

  // Create
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);

  // Page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchProducts();
    setCurrentLimit(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProducts = async () => {
    let data = await readProduct(currentPage, currentLimit);
    setListDataProduct(data);
    setTotalPages(data?.DT?.totalPages);
  };

  // Delete
  const handleDelete = async (role) => {
    setIsShowModalDelete(true);
    setDataModalDelete(role);
  };
  const handleCloseModelDelete = () => {
    setIsShowModalDelete(false);
  };

  const handleConfirmModelDelete = async () => {
    let resDelete = await deleteProduct(dataModelDelete.id);
    if (resDelete.EC === 0) {
      fetchProducts();
      toast.success(resDelete.EM);
    } else {
      toast.error(resDelete.EM);
    }
    setIsShowModalDelete(false);
  };

  // Edit
  const handleEdit = (user) => {
    setIsShowModalEdit(true);
    setDataModalEdit(user);
  };

  const handleCloseEdit = () => {
    setIsShowModalEdit(false);
  };

  // Create
  const handleCreate = () => {
    setIsShowModalCreate(true);
  };

  const handleCloseCreate = () => {
    setIsShowModalCreate(false);
  };

  // Reload
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <h2 className={cx("heading")}>
          <div className={cx("heading-left")}>
            <IoMenuOutline className={cx("heading-icon")} />
            <span>Products</span>
          </div>
          <div className={cx("heading-right")}>
            <button className={cx("btn-create")} onClick={handleReload}>
              <TfiReload className={cx("btn-icon-reload")} />
              <span>Reload</span>
            </button>
            <button className={cx("btn-create")} onClick={handleCreate}>
              <IoAddOutline className={cx("btn-icon")} />
              <span>New Product</span>
            </button>
          </div>
        </h2>
        <div className={cx("container")}>
          <table className={cx("table-inner")}>
            <thead>
              <tr className={cx("row-inner")}>
                <th>
                  <div className={cx("th-content")}>
                    <LuListTree className={cx("th-content-icon")} />
                    ID
                  </div>
                </th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listDataProduct &&
                listDataProduct.DT &&
                listDataProduct.DT.products &&
                listDataProduct.DT.products.map((product, index) => {
                  return (
                    <tr key={index} className={cx("row-inner")}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{product?.title}</td>
                      <td>{product?.price}</td>
                      <td>{product?.Category?.name}</td>
                      <td>
                        <div className={cx("action")}>
                          <div className={cx("action-upd")} onClick={() => handleEdit(product)}>
                            <FaRegEdit className={cx("action-upd-icon")} />
                          </div>
                          <div className={cx("action-del")} onClick={() => handleDelete(product)}>
                            <MdDeleteForever className={cx("action-del-icon")} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 0 && (
        <div className={cx("page")}>
          <ReactPaginate
            className={cx("pagination", "hello")}
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
      <ModalProductDelete
        show={isShowModalDelete}
        handleClose={handleCloseModelDelete}
        handleConfirm={handleConfirmModelDelete}
        dataModel={dataModelDelete}
      />
      <ModalProductCreate
        show={isShowModalCreate}
        handleClose={handleCloseCreate}
        fetchProducts={fetchProducts}
      />
      <ModalProductEdit
        show={isShowModalEdit}
        handleClose={handleCloseEdit}
        dataModalEdit={dataModalEdit}
        fetchProducts={fetchProducts}
      />
    </>
  );
};

export default Products;
