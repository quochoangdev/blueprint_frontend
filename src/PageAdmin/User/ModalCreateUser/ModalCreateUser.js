import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

import styles from "./ModalCreateUser.module.scss";
import { createUser, readGroup } from "../../../services/userService";

const cx = classNames.bind(styles);

const ModalCreateUser = (props) => {
  const [data, setData] = useState({
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    email: "",
    sex: "male",
    groupId: "",
  });

  const validInputDefault = {
    lastName: true,
    firstName: true,
    password: true,
    confirmPassword: true,
    phone: true,
    address: true,
    email: true,
    sex: true,
    groupId: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);
  const [userGroups, setUserGroups] = useState([]);

  const isCheckInputs = () => {
    if (!data.lastName) {
      toast("Please Enter Last Name");
      return false;
    }
    if (!data.firstName) {
      toast("Please Enter First Name");
      return false;
    }
    if (!data.phone) {
      toast("Please Enter Phone");
      return false;
    }
    if (!data.password) {
      toast("Please Enter Password");
      return false;
    }
    if (!data.email) {
      toast("Please Enter Email");
      return false;
    }
    if (!data.sex) {
      toast("Please Select Sex");
      return false;
    }
    if (!data.groupId) {
      toast("Please Select Group");
      return false;
    }
    let regular = /\S+@\S+\.\S+/;
    if (!regular.test(data.email)) {
      toast("Địa chỉ email không hợp lệ");
      setValidInputs((prev) => {
        return {
          ...prev,
          email: false,
        };
      });
      return false;
    }
    if (data.password.length < 6) {
      toast("Your password must have more than 6 letters");
      setValidInputs((prev) => {
        return {
          ...prev,
          password: false,
        };
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast("Mật khẩu không trùng nhau");
      setValidInputs((prev) => {
        return {
          ...prev,
          password: false,
          confirmPassword: false,
        };
      });
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
    let arr = ["lastName", "firstName", "phone", "password", "email", "sex", "groupId"];
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

  // Get Groups
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let response = await readGroup();
    if (response && response.EC === 0) {
      setUserGroups(response.DT);
      if (response.DT && response.DT.length > 0) {
        setData((prev) => {
          return {
            ...prev,
            groupId: response.DT[0].id,
          };
        });
      }
    } else {
      toast.error(response.EM);
    }
  };

  // Confirm
  const handleConfirmUser = async () => {
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await createUser(data);
      if (response && response.EC === 1) {
        let dataValid = response.DT;
        console.log(dataValid);
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
        props.fetchUsers();
        setData((prev) => {
          return {
            ...prev,
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            phone: "",
            address: "",
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
            <div className={cx("title")}>Create New User</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={cx("form-wrapper")}>
            {/* name */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Last Name (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.lastName ? "" : `is-valid`)}
                    type="text"
                    name="lastName"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.lastName && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  First Name (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.firstName ? "" : `is-valid`)}
                    type="text"
                    name="firstName"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.firstName && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
            </div>
            {/* password */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Password (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.password ? "" : `is-valid`)}
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.password && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Confirm Password (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.confirmPassword ? "" : `is-valid`)}
                    type="password"
                    name="confirmPassword"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.confirmPassword && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
            </div>
            {/* phone and address */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Phone (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.phone ? "" : `is-valid`)}
                    type="text"
                    name="phone"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.phone && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  onFocus={handleOnFocus}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            {/* email */}
            <div className={cx("bl-one-input")}>
              <label>
                Email (<span className={cx("valid-start")}>*</span>)
              </label>
              <div className={cx("bl-icon")}>
                <input
                  className={cx(validInputs.email ? "" : `is-valid`)}
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                />
                {!validInputs.email && <MdErrorOutline className={cx("icon")} />}
              </div>
            </div>
            <div className={cx("two-row")}>
              <div className={cx("bl-select")}>
                <label>
                  Sex (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.sex ? "" : `is-valid`)}
                  name="sex"
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                  value={data.sex}
                >
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Other</option>
                </select>
              </div>
              <div className={cx("bl-select")}>
                <label>
                  Group (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.groupId ? "" : `is-valid`)}
                  name="groupId"
                  value={data.groupId}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  {userGroups.length > 0 &&
                    userGroups.map((item, index) => {
                      return (
                        <option key={`groupId-${index}`} value={item.id}>
                          {item.name}
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
          <button className={cx("btn", "primary")} onClick={() => handleConfirmUser()}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
