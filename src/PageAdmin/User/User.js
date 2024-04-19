import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./User.module.scss";
import { IoMenuOutline, IoAddOutline } from "react-icons/io5";
import { LuListTree } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import ModalUserDelete from "./ModalUserDelete";
import ModalEditUser from "./ModalEditUser/ModalEditUser";
import ModalCreateUser from "./ModalCreateUser";
import { toast } from "react-toastify";
import { deleteUser, readUser } from "../../services/userService";
import { TfiReload } from "react-icons/tfi";

const cx = classNames.bind(styles);

const User = () => {
  // Pagination
  const [listUsers, setListUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({});

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
    fetchUsers();
    setCurrentLimit(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchUsers = async () => {
    let data = await readUser(currentPage, currentLimit);
    setListUsers(data);
    setTotalPages(data?.DT?.totalPages);
  };

  // Delete
  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setDataModalDelete(user);
  };
  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModalDelete({});
  };
  const handleConfirm = async () => {
    let response = await deleteUser(dataModalDelete.id);
    if (response.EC === 0) {
      fetchUsers();
      toast.success(response?.EM);
    } else {
      toast.error(response?.EM);
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

  const handleReload = () => {
    window.location.reload();
  };
  return (
    <>
      <div className={cx("wrapper")}>
        <h2 className={cx("heading")}>
          <div className={cx("heading-left")}>
            <IoMenuOutline className={cx("heading-icon")} />
            <span>Users</span>
          </div>
          <div className={cx("heading-right")}>
            <button className={cx("btn-create")} onClick={handleReload}>
              <TfiReload className={cx("btn-icon-reload")} />
              <span>Reload</span>
            </button>
            <button className={cx("btn-create")} onClick={handleCreate}>
              <IoAddOutline className={cx("btn-icon")} />
              <span>New User</span>
            </button>
          </div>
        </h2>
        <div className={cx("container")}>
          <table className={cx("table-inner")}>
            <tbody>
              <tr className={cx("row-inner")}>
                <th>
                  <div className={cx("th-content")}>
                    <LuListTree className={cx("th-content-icon")} />
                    ID
                  </div>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Sex</th>
                <th>enabled</th>
                <th>Group Id</th>
                <th>Action</th>
              </tr>
              {listUsers &&
                listUsers.DT &&
                listUsers.DT.users.map((user, index) => {
                  return (
                    <tr key={index} className={cx("row-inner")}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{user.lastName + " " + user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.sex}</td>
                      <td>
                        <input className={cx("input-checkbox")} type="checkbox" />
                      </td>
                      <td>{user?.Group?.name ? user?.Group?.name : ""}</td>
                      <td>
                        <div className={cx("action")}>
                          <div className={cx("action-upd")} onClick={() => handleEdit(user)}>
                            <FaRegEdit className={cx("action-upd-icon")} />
                          </div>
                          <div className={cx("action-del")} onClick={() => handleDelete(user)}>
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
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< Prev"
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
      <ModalUserDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        dataModalDelete={dataModalDelete}
      />
      <ModalCreateUser
        show={isShowModalCreate}
        handleClose={handleCloseCreate}
        fetchUsers={fetchUsers}
      />
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleCloseEdit}
        dataModalEdit={dataModalEdit}
        fetchUsers={fetchUsers}
      />
    </>
  );
};

export default User;
