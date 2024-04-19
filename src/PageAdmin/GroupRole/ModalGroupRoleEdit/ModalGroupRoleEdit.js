import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ModalGroupRoleEdit.module.scss";
import { readGroup, readRole, updateGroupRole } from "../../../services/userService";

const cx = classNames.bind(styles);

const ModalGroupRoleEdit = (props) => {
  const [data, setData] = useState({
    groupId: "",
    roleId: "",
  });
  const [groupData, setGroupData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const validInputDefault = {
    groupId: true,
    roleId: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.groupId) {
      toast("Please Enter GroupId");
      return false;
    }
    if (!data.roleId) {
      toast("Please Enter RoleId");
      return false;
    }
    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnFocus = () => {
    setValidInputs(validInputDefault);
  };

  // Valid Input
  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = ["groupId", "roleId"];
    let check = true;
    // eslint-disable-next-line array-callback-return
    arr.map((item, index) => {
      if (!data[item] && check) {
        setValidInputs((prev) => {
          return {
            ...prev,
            [item]: false,
          };
        });
        check = false;
        return false;
      }
    });
    return true;
  };

  // Call Api Group
  useEffect(() => {
    let currentGroupId = props?.dataModel?.groupId;
    let currentRoleId = props?.dataModel?.roleId;
    setData((prev) => {
      return {
        ...prev,
        ...props.dataModel,
        groupId: currentGroupId ? currentGroupId : "",
        roleId: currentRoleId ? currentRoleId : "",
      };
    });
  }, [props.dataModel]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await readGroup();
    if (response && response.EC === 0) {
      setGroupData(response.DT);
      if (response.DT && response.DT.length > 0) {
        // setData((prev) => {
        //   return {
        //     ...prev,
        //     groupId: response.DT[0].id,
        //   };
        // });
      }
    } else {
      toast.error(response.EM);
    }
  };

  // Call Api Role
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    let response = await readRole();
    if (response && response.EC === 0) {
      setRoleData(response.DT);
      if (response.DT && response.DT.length > 0) {
        // setData((prev) => {
        //   return {
        //     ...prev,
        //     roleId: response.DT[0].id,
        //   };
        // });
      }
    } else {
      toast.error(response.EM);
    }
  };

  // Confirm
  const handleConfirmGroup = async () => {
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await updateGroupRole(data);
      if (response && response.EC === 1) {
        let dataValid = response.DT;
        setValidInputs((prev) => {
          return {
            ...prev,
            [dataValid]: false,
          };
        });
      }
      if (response && response.EC === 0) {
        toast.success(response.EM);
        props.handleClose();
        props.fetchGroupRole();
      } else {
        toast.error(response.EM);
      }
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        fullscreen={"xxl-down"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={cx("title")}>Create New Role</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={cx("form-wrapper")}>
            <div className={cx("two-row")}>
              <div className={cx("bl-select")}>
                <label>
                  Group (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.groupId ? "" : `is-valid`)}
                  name="groupId"
                  value={data?.groupId}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  {groupData.length > 0 &&
                    groupData.map((item, index) => {
                      return (
                        <option key={`groupId-${index}`} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={cx("bl-select")}>
                <label>
                  Role (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.roleId ? "" : `is-valid`)}
                  name="roleId"
                  value={data?.roleId}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  {roleData.length > 0 &&
                    roleData.map((item, index) => {
                      return (
                        <option key={`roleId-${index}`} value={item.id}>
                          {item.url}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={cx("btn", "secondary")} onClick={props.handleClose}>
            Close
          </button>
          <button className={cx("btn", "primary")} onClick={() => handleConfirmGroup()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGroupRoleEdit;
