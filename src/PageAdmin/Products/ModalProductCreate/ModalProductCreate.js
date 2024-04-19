import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { ImageToBase64 } from "../../../utility/ImageToBase64";

import styles from "./ModalProductCreate.module.scss";
import { createProduct, readCategory } from "../../../services/userService";

const cx = classNames.bind(styles);

const ModalProductCreate = (props) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    imageAvatar: "",
    imageDetail: "",
    price: "",
    numberOfFloors: "",
    width: "",
    length: "",
    roomNumber: "",
    facade: "",
    productCode: "",
    categoryId: "",
  });
  const [categoryData, setCategoryData] = useState([]);

  const validInputDefault = {
    title: true,
    description: true,
    imageAvatar: true,
    imageDetail: true,
    price: true,
    numberOfFloors: true,
    width: true,
    length: true,
    roomNumber: true,
    facade: true,
    productCode: true,
    categoryId: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.title) {
      toast("Please Enter Title");
      return false;
    }
    if (!data.imageAvatar) {
      toast("Please Enter Image Avatar");
      return false;
    }
    if (!data.imageDetail) {
      toast("Please Enter Image Detail");
      return false;
    }
    if (!data.price) {
      toast("Please Enter Price");
      return false;
    }
    if (!data.numberOfFloors) {
      toast("Please Enter Number of floors");
      return false;
    }
    if (!data.width) {
      toast("Please Enter Width");
      return false;
    }
    if (!data.length) {
      toast("Please Enter Length");
      return false;
    }
    if (!data.roomNumber) {
      toast("Please Enter Room Number");
      return false;
    }
    if (!data.facade) {
      toast("Please Enter Facade");
      return false;
    }
    if (!data.productCode) {
      toast("Please Enter Product Code");
      return false;
    }
    if (!data.categoryId) {
      toast("Please Enter Last CategoryId");
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

  const handleImageAvatar = async (e) => {
    const multipleImages = e.target.files;
    const arrMultipleImage = [];

    for (let i = 0; i < multipleImages.length; ++i) {
      const base = await ImageToBase64(multipleImages[i]);
      arrMultipleImage.push(base);
    }

    setData((prev) => {
      return {
        ...prev,
        imageAvatar: arrMultipleImage,
      };
    });
  };

  const handleImageDetail = async (e) => {
    const multipleImages = e.target.files;
    const arrMultipleImage = [];

    for (let i = 0; i < multipleImages.length; ++i) {
      const base = await ImageToBase64(multipleImages[i]);
      arrMultipleImage.push(base);
    }

    setData((prev) => {
      return {
        ...prev,
        imageDetail: arrMultipleImage,
      };
    });
  };

  const handleOnFocus = () => {
    setValidInputs(validInputDefault);
  };

  // Valid Input
  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = [
      "title",
      "imageAvatar",
      "imageDetail",
      "price",
      "numberOfFloors",
      "width",
      "length",
      "roomNumber",
      "facade",
      "productCode",
      "categoryId",
    ];
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
    getCategory();
  }, []);

  const getCategory = async () => {
    let response = await readCategory();
    if (response && response.EC === 0) {
      setCategoryData(response.DT);
      if (response.DT && response.DT.length > 0) {
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
      let response = await createProduct(data);
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
        props.fetchProducts();
        setData((prev) => {
          return {
            ...prev,
            title: "",
            description: "",
            imageAvatar: "",
            imageDetail: "",
            price: "",
            numberOfFloors: "",
            width: "",
            length: "",
            roomNumber: "",
            facade: "",
            productCode: "",
            categoryId: "",
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
            <div className={cx("title")}>Create New User</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={cx("form-wrapper")}>
            {/* title and  description*/}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Tiêu đề (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.title ? "" : `is-valid`)}
                    type="text"
                    name="title"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.title && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Mô tả (<span className={cx("valid-start")}>*</span>)
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
            </div>
            {/* ImageAvatar and ImageDetail */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  ImageAvatar (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.imageAvatar ? "" : `is-valid`)}
                    type="file"
                    name="imageAvatar"
                    accept="image/*"
                    multiple
                    onChange={handleImageAvatar}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.imageAvatar && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  ImageDetail (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.imageDetail ? "" : `is-valid`)}
                    type="file"
                    name="imageDetail"
                    accept="image/*"
                    multiple
                    onChange={handleImageDetail}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.imageDetail && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
            </div>
            {/* Price and Facade */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Giá (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.price ? "" : `is-valid`)}
                    type="text"
                    name="price"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.price && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Mặt tiền (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.facade ? "" : `is-valid`)}
                    type="text"
                    name="facade"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.facade && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
            </div>
            {/* Width and Length */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Chiều rộng (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.width ? "" : `is-valid`)}
                    type="text"
                    name="width"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.width && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Chiều dài (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.length ? "" : `is-valid`)}
                    type="text"
                    name="length"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.length && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
            </div>
            {/* RoomNumber and NumberOfFloors */}
            <div className={cx("two-row")}>
              <div className={cx("bl-select")}>
                <label>
                  Số phòng (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.roomNumber ? "" : `is-valid`)}
                  name="roomNumber"
                  value={data?.roomNumber}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  <option value={`1`}>1</option>
                  <option value={`2`}>2</option>
                  <option value={`3`}>3</option>
                  <option value={`4`}>4</option>
                  <option value={`5`}>5</option>
                  <option value={`6`}>6</option>
                  <option value={`7`}>7</option>
                  <option value={`8`}>8</option>
                </select>
              </div>
              <div className={cx("bl-select")}>
                <label>
                  Số tầng (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.numberOfFloors ? "" : `is-valid`)}
                  name="numberOfFloors"
                  value={data?.numberOfFloors}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  <option value={`1`}>1</option>
                  <option value={`2`}>2</option>
                  <option value={`3`}>3</option>
                  <option value={`4`}>4</option>
                  <option value={`5`}>5</option>
                  <option value={`6`}>6</option>
                  <option value={`7`}>7</option>
                  <option value={`8`}>8</option>
                </select>
              </div>
            </div>
            {/* ProductCode and CategoryId */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Mã sản phẩm (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.productCode ? "" : `is-valid`)}
                    type="text"
                    name="productCode"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.productCode && <MdErrorOutline className={cx("icon")} />}
                </div>
              </div>
              <div className={cx("bl-select")}>
                <label>
                  Category (<span className={cx("valid-start")}>*</span>)
                </label>
                <select
                  className={cx(validInputs.categoryId ? "" : `is-valid`)}
                  name="categoryId"
                  value={data?.categoryId}
                  onChange={handleOnChange}
                  onFocus={handleOnFocus}
                >
                  {categoryData.length > 0 &&
                    categoryData.map((item, index) => {
                      return (
                        <option key={`categoryId-${index}`} value={item.id}>
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

export default ModalProductCreate;
