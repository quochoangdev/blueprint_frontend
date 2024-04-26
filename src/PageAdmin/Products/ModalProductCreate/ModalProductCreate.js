import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { ImageToBase64 } from "../../../utility/ImageToBase64";

import styles from "./ModalProductCreate.module.scss";
import { createProduct, readCategory } from "../../../services/apiAdminService";

const cx = classNames.bind(styles);

const ModalProductCreate = (props) => {
  const [data, setData] = useState({
    title: "",
    price: "",
    version: "",
    quantity: "",
    imageAvatar: "",
    imageDetail: "",
    colors: "",
    percentDiscount: "",
    categoriesId: "",
  });
  const [categoryData, setCategoryData] = useState([]);

  const validInputDefault = {
    title: true,
    price: true,
    version: true,
    quantity: true,
    imageAvatar: true,
    imageDetail: true,
    colors: true,
    percentDiscount: true,
    categoriesId: true,
  };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.title) { toast("Please Enter Title"); return false; }
    if (!data.price) { toast("Please Enter Price"); return false; }
    if (!data.version) { toast("Please Enter Version"); return false; }
    if (!data.quantity) { toast("Please Enter Quantity"); return false; }
    if (!data.imageAvatar) { toast("Please Enter Image Avatar"); return false; }
    if (!data.imageDetail) { toast("Please Enter Image Detail"); return false; }
    if (!data.colors) { toast("Please Enter Color"); return false; }
    if (!data.percentDiscount) { toast("Please Enter PercentDiscount"); return false; }
    if (!data.categoriesId) { toast("Please Enter Last CategoriesId"); return false; }
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
      "price",
      "version",
      "quantity",
      "imageAvatar",
      "imageDetail",
      "colors",
      "percentDiscount",
      "categoriesId",
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

  // Get Category
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
            categoriesId: "",
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
            {/* title and  price*/}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Title (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.title ? "" : `is-valid`)}
                    type="text"
                    name="title"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.title && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Price (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.price ? "" : `is-valid`)}
                    type="text"
                    name="price"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.price && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
            </div>
            {/* version and  categories*/}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Version (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.version ? "" : `is-valid`)}
                    type="text"
                    name="version"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.version && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  Categories (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.categoriesId ? "" : `is-valid`)}
                    type="text"
                    name="categoriesId"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.categoriesId && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
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
                  {!validInputs.imageAvatar && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
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
                  {!validInputs.imageDetail && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
            </div>
            {/* colors and percentDiscount */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Color (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.colors ? "" : `is-valid`)}
                    type="text"
                    name="colors"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.colors && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>
                  PercentDiscount (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(
                      validInputs.percentDiscount ? "" : `is-valid`
                    )}
                    type="text"
                    name="percentDiscount"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.percentDiscount && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
            </div>
            {/* quantities */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>
                  Quantity (<span className={cx("valid-start")}>*</span>)
                </label>
                <div className={cx("bl-icon")}>
                  <input
                    className={cx(validInputs.quantity ? "" : `is-valid`)}
                    type="text"
                    name="quantity"
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                  />
                  {!validInputs.quantity && (
                    <MdErrorOutline className={cx("icon")} />
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={cx("btn", "secondary")}
            onClick={props.handleClose}
          >
            Close
          </button>
          <button
            className={cx("btn", "primary")}
            onClick={() => handleConfirmUser()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProductCreate;
