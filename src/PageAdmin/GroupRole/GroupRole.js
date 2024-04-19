import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./GroupRole.module.scss";
import { IoMenuOutline, IoAddOutline } from "react-icons/io5";
import { LuListTree } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { TfiReload } from "react-icons/tfi";
import { deleteGroupRole, readGroupRole } from "../../services/userService";
import ModalGroupRoleDelete from "./ModalGroupRoleDelete";
import ModalGroupRoleCreate from "./ModalGroupRoleCreate/ModalGroupRoleCreate";
import ModalGroupRoleEdit from "./ModalGroupRoleEdit/ModalGroupRoleEdit";

const cx = classNames.bind(styles);

const GroupRole = () => {
  // Pagination
  const [listDataGroupRole, setListDataGroupRole] = useState([]);
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
    fetchGroupRole();
    setCurrentLimit(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchGroupRole = async () => {
    let data = await readGroupRole(currentPage, currentLimit);
    setListDataGroupRole(data);
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
  const handleUpdate = (groupRole) => {
    setIsShowModalEdit(true);
    setDataModalEdit(groupRole);
  };
  const handleCloseModelUpdate = () => {
    setIsShowModalEdit(false);
  };

  // Delete
  const handleDelete = async (groupRole) => {
    setIsShowModalDelete(true);
    setDataModalDelete(groupRole);
  };
  const handleCloseModelDelete = () => {
    setIsShowModalDelete(false);
  };

  const handleConfirmModelDelete = async () => {
    let resDelete = await deleteGroupRole(dataModelDelete.id);
    if (resDelete.EC === 0) {
      fetchGroupRole();
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
            <span>Group Role</span>
          </div>
          <div className={cx("heading-right")}>
            <button className={cx("btn-create")} onClick={handleReload}>
              <TfiReload className={cx("btn-icon-reload")} />
              <span>Reload</span>
            </button>
            <button className={cx("btn-create")} onClick={handleNewProduct}>
              <IoAddOutline className={cx("btn-icon")} />
              <span>New GroupRole</span>
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
                <th>GroupID</th>
                <th>RoleID</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listDataGroupRole &&
                listDataGroupRole.DT &&
                listDataGroupRole.DT.groupRole &&
                listDataGroupRole.DT.groupRole.map((groupRole, index) => {
                  return (
                    <tr key={index} className={cx("row-inner")}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{groupRole?.Group?.name}</td>
                      <td>{groupRole?.Role?.url}</td>
                      <td>{groupRole?.Role?.description}</td>
                      <td>
                        <div className={cx("action")}>
                          <div className={cx("action-upd")} onClick={() => handleUpdate(groupRole)}>
                            <FaRegEdit className={cx("action-upd-icon")} />
                          </div>
                          <div className={cx("action-del")} onClick={() => handleDelete(groupRole)}>
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
      <ModalGroupRoleDelete
        show={isShowModalDelete}
        handleClose={handleCloseModelDelete}
        handleConfirm={handleConfirmModelDelete}
        dataModel={dataModelDelete}
      />
      <ModalGroupRoleCreate
        show={isShowModalCreate}
        handleClose={handleCloseModelCreate}
        fetchGroupRole={fetchGroupRole}
      />
      <ModalGroupRoleEdit
        show={isShowModalEdit}
        handleClose={handleCloseModelUpdate}
        dataModel={dataModalEdit}
        fetchGroupRole={fetchGroupRole}
      />
    </>
  );
};

export default GroupRole;
