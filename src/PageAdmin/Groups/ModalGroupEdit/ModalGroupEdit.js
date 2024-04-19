import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

import styles from "./ModalGroupEdit.module.scss";
import { updateGroup } from "../../../services/userService";

const cx = classNames.bind(styles);

const ModalGroupEdit = (props) => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const validInputDefault = {
    name: true,
    description: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.name) {
      toast("Please Enter Name");
      return false;
    }
    if (!data.description) {
      toast("Please Enter Description");
      return false;
    }
    return true;
  };

  useEffect(() => {
    setData({ ...props.dataModel });
  }, [props.dataModel]);

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
    let arr = ["name", "description"];
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
  const handleConfirmGroup = async () => {
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await updateGroup(data);
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
        props.fetchGroups();
        setData((prev) => {
          return {
            ...prev,
            name: "",
            description: "",
          };
        });
      } else {
        toast.error(response.EM);
      }
    }
  };
  console.log(data);
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
            {/* name */}
            <div className={cx("bl-one-input")}>
              <label>
                Name (<span className={cx("valid-start")}>*</span>)
              </label>
              <div className={cx("bl-icon")}>
                <input
                  className={cx(validInputs.name ? "" : `is-valid`)}
                  value={data.name}
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                />
                {!validInputs.name && <MdErrorOutline className={cx("icon")} />}
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
                  value={data.description}
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
          <button className={cx("btn", "primary")} onClick={() => handleConfirmGroup()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalGroupEdit;
