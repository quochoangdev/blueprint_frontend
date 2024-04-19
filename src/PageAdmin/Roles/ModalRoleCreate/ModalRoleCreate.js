import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

import styles from "./ModalRoleCreate.module.scss";
import { createRole } from "../../../services/userService";

const cx = classNames.bind(styles);

const ModalRoleCreate = (props) => {
  const [data, setData] = useState({
    url: "",
    description: "",
  });

  const validInputDefault = {
    url: true,
    description: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.url) {
      toast("Please Enter Url");
      return false;
    }
    if (!data.description) {
      toast("Please Enter Description");
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
    let arr = ["url", "description"];
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

  // Confirm
  const handleConfirmRole = async () => {
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await createRole(data);
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
        props.fetchRoles();
        setData((prev) => {
          return {
            ...prev,
            url: "",
            description: "",
          };
        });
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
            {/* url */}
            <div className={cx("bl-one-input")}>
              <label>
                Url (<span className={cx("valid-start")}>*</span>)
              </label>
              <div className={cx("bl-icon")}>
                <input
                  className={cx(validInputs.url ? "" : `is-valid`)}
                  type="text"
                  name="url"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                />
                {!validInputs.url && <MdErrorOutline className={cx("icon")} />}
              </div>
            </div>
            {/* description */}
            <div className={cx("bl-one-input")}>
              <label>
                Description (<span className={cx("valid-start")}>*</span>)
              </label>
              <div className={cx("bl-icon")}>
                <input
                  className={cx(validInputs.description ? "" : `is-valid`)}
                  type="text"
                  name="description"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                />
                {!validInputs.description && <MdErrorOutline className={cx("icon")} />}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={cx("btn", "secondary")} onClick={props.handleClose}>
            Close
          </button>
          <button className={cx("btn", "primary")} onClick={() => handleConfirmRole()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRoleCreate;
