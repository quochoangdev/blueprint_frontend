import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./Groups.module.scss";
import { IoMenuOutline, IoAddOutline } from "react-icons/io5";
import { LuListTree } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { TfiReload } from "react-icons/tfi";
import { deleteGroup, readGroup } from "../../services/userService";
import ModalGroupDelete from "./ModalGroupDelete";
import ModalGroupEdit from "./ModalGroupEdit";
import ModalGroupCreate from "./ModalGroupCreate/ModalGroupCreate";

const cx = classNames.bind(styles);

const Groups = () => {
  // Pagination
  const [listDataGroup, setListDataGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModelDelete, setDataModalDelete] = useState([]);

  // Create
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);

  // Update
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState([]);

  // Call API
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    fetchGroups();
    setCurrentLimit(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchGroups = async () => {
    let data = await readGroup(currentPage, currentLimit);
    setListDataGroup(data);
    setTotalPages(data?.DT?.totalPages);
  };

  // Create
  const handleNewProduct = () => {
    setIsShowModalCreate(true);
  };

  const handleCloseModelCreate = () => {
    setIsShowModalCreate(false);
  };

  // Update
  const handleUpdate = (user) => {
    setIsShowModalEdit(true);
    setDataModalEdit(user);
  };

  const handleCloseModelUpdate = () => {
    setIsShowModalEdit(false);
  };

  // Delete
  const handleDelete = async (group) => {
    setIsShowModalDelete(true);
    setDataModalDelete(group);
  };
  const handleCloseModelDelete = () => {
    setIsShowModalDelete(false);
  };

  const handleConfirmModelDelete = async () => {
    let resDelete = await deleteGroup(dataModelDelete.id);
    if (resDelete.EC === 0) {
      fetchGroups();
      toast.success(resDelete.EM);
    } else {
      toast.error(resDelete.EM);
    }
    setIsShowModalDelete(false);
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
            <span>Groups</span>
          </div>
          <div className={cx("heading-right")}>
            <button className={cx("btn-create")} onClick={handleReload}>
              <TfiReload className={cx("btn-icon-reload")} />
              <span>Reload</span>
            </button>
            <button className={cx("btn-create")} onClick={handleNewProduct}>
              <IoAddOutline className={cx("btn-icon")} />
              <span>New Role</span>
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
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listDataGroup &&
                listDataGroup.DT &&
                listDataGroup.DT.groups &&
                listDataGroup.DT.groups.map((group, index) => {
                  return (
                    <tr key={index} className={cx("row-inner")}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{group.name}</td>
                      <td>{group.description}</td>
                      <td>
                        <div className={cx("action")}>
                          <div className={cx("action-upd")} onClick={() => handleUpdate(group)}>
                            <FaRegEdit className={cx("action-upd-icon")} />
                          </div>
                          <div className={cx("action-del")} onClick={() => handleDelete(group)}>
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
      <ModalGroupDelete
        show={isShowModalDelete}
        handleClose={handleCloseModelDelete}
        handleConfirm={handleConfirmModelDelete}
        dataModel={dataModelDelete}
      />
      <ModalGroupCreate
        show={isShowModalCreate}
        handleClose={handleCloseModelCreate}
        fetchGroups={fetchGroups}
      />
      <ModalGroupEdit
        show={isShowModalEdit}
        handleClose={handleCloseModelUpdate}
        dataModel={dataModalEdit}
        fetchGroups={fetchGroups}
      />
    </>
  );
};

export default Groups;
