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
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState({ title: "", price: "", version: "", categoriesId: "", image: "", capacity: "", color: "", percentDiscount: "", quantity: "" });
  const validInputDefault = { title: true, price: true, version: true, categoriesId: true, image: true, capacity: true, color: true, percentDiscount: true, quantity: true };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.title) { toast("Please Enter Title"); return false; }
    if (!data.price) { toast("Please Enter Price"); return false; }
    if (!data.version) { toast("Please Enter Version"); return false; }
    if (!data.categoriesId) { toast("Please Enter Last CategoriesId"); return false; }
    if (!data.image) { toast("Please Enter Image"); return false; }
    if (!data.capacity) { toast("Please Enter Capacity"); return false; }
    if (!data.color) { toast("Please Enter Color"); return false; }
    if (!data.percentDiscount) { toast("Please Enter PercentDiscount"); return false; }
    if (!data.quantity) { toast("Please Enter Quantity"); return false; }
    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => { return { ...prev, [name]: value, }; });
  };

  const handleImage = async (e) => {
    const multipleImages = e.target.files;
    const arrMultipleImage = [];
    for (let i = 0; i < multipleImages.length; ++i) {
      const base = await ImageToBase64(multipleImages[i]);
      arrMultipleImage.push(base);
    }
    setData((prev) => { return { ...prev, image: arrMultipleImage, }; });
  };

  const handleOnFocus = () => { setValidInputs(validInputDefault); };

  // Valid Input
  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = ["title", "price", "version", "categoriesId", "image", "capacity", "color", "percentDiscount", "quantity"];
    let check = true;
    // eslint-disable-next-line array-callback-return
    arr.map((item, index) => {
      if (!data[item] && check) {
        setValidInputs((prev) => { return { ...prev, [item]: false, }; });
        check = false; return false;
      }
    });
    return true;
  };

  // Get Category
  useEffect(() => { getCategory(); }, []);
  const getCategory = async () => {
    let response = await readCategory();
    if (response && response.EC === 0) {
      setCategoryData(response.DT);
      if (response.DT && response.DT.length > 0) {
      }
    } else { toast.error(response.EM); }
  };

  // Confirm
  const handleConfirmProduct = async () => {
    console.log(data)
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let response = await createProduct(data);

      if (response && response.EC === 1) {
        let dataValid = response.DT;
        setValidInputs((prev) => { return { ...prev, [dataValid]: false, }; });
      }

      if (response && response.EC === 0) {
        toast.success(response.EM);
        props.handleClose(); props.fetchProducts();
        setData((prev) => {
          return { ...prev, title: "", price: "", version: "", quantity: "", image: "", capacity: "", color: "", percentDiscount: "", categoriesId: "" };
        });

      } else { toast.error(response.EM); }
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} fullscreen={"xxl-down"} backdrop="static" keyboard={false}>
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
                <label>Title (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.title ? "" : `is-valid`)} type="text" name="title" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.title && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Price (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.price ? "" : `is-valid`)} type="text" name="price" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.price && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* version and  categories*/}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Version (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.version ? "" : `is-valid`)} type="text" name="version" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.version && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Categories (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.categoriesId ? "" : `is-valid`)} type="text" name="categoriesId" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.categoriesId && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* Image and Capacity */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Image (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.image ? "" : `is-valid`)} type="file" name="image" accept="image/*" multiple onChange={handleImage} onFocus={handleOnFocus} />
                  {!validInputs.image && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Capacity (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.capacity ? "" : `is-valid`)} type="text" name="capacity" multiple onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.capacity && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* color and percentDiscount */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Color (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.color ? "" : `is-valid`)} type="text" name="color" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.color && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>PercentDiscount (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.percentDiscount ? "" : `is-valid`)} type="text" name="percentDiscount" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.percentDiscount && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* quantities */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Quantity (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.quantity ? "" : `is-valid`)} type="text" name="quantity" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.quantity && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={cx("btn", "secondary")} onClick={props.handleClose}>Close</button>
          <button className={cx("btn", "primary")} onClick={() => handleConfirmProduct()}>Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalProductCreate;
