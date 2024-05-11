import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { ImageToBase64 } from "../../../utility/ImageToBase64";
import { createProduct, readBrand, readCategories } from "../../../services/apiAdminService";

import styles from "./ModalProductCreate.module.scss";

const cx = classNames.bind(styles);

const ModalProductCreate = (props) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [capacityData] = useState(["64GB", "128GB", "256GB", "512GB", "1TB"]);
  const [colors] = useState(["black", "white", "blue", "cream", "red", "purple", "grey", "gold", "silver", "pink", "green", "natural", "darkblue", "lightblue"]);
  const [data, setData] = useState({ title: "", price: "", categoriesId: "", brandId: "", version: "", quantity: "", percentDiscount: "", capacity: "", color: "", image: "" });
  const validInputDefault = { title: true, price: true, categoriesId: true, brandId: true, version: true, quantity: true, percentDiscount: true, color: true, capacity: true, image: true };
  const [validInputs, setValidInputs] = useState(validInputDefault);

  const isCheckInputs = () => {
    if (!data.title) { toast("Please Enter Title"); return false; }
    if (!data.price) { toast("Please Enter Price"); return false; }
    if (!data.categoriesId) { toast("Please Enter Last CategoriesId"); return false; }
    if (!data.brandId) { toast("Please Enter Last BrandId"); return false; }
    if (!data.version) { toast("Please Enter Version"); return false; }
    if (!data.quantity) { toast("Please Enter Quantity"); return false; }
    if (!data.percentDiscount) { toast("Please Enter PercentDiscount"); return false; }
    if (!data.capacity) { toast("Please Enter Capacity"); return false; }
    if (!data.color) { toast("Please Enter Color"); return false; }
    if (!data.image) { toast("Please Enter Image"); return false; }
    return true;
  };

  // Valid Input
  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = ["title", "price", "categoriesId", "brandId", "version", "quantity", "percentDiscount", "capacity", "color", "image"];
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

  const handleOnFocus = () => { setValidInputs(validInputDefault); };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => { return { ...prev, [name]: value, }; });
  };

  const handleOnChangeColor = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      if (prev.color.includes(value)) { return { ...prev }; }
      else { return { ...prev, [name]: [...prev.color, value] }; }
    });
  };

  const handleOnChangeCapacity = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      if (prev.capacity.includes(value)) { return prev; }
      else { return { ...prev, [name]: [...prev.capacity, value] }; }
    });
  };

  const handleImageWithColor = async (e, color) => {
    const multipleImages = e.target.files;
    const arrMultipleImage = [];
    for (let i = 0; i < multipleImages.length; ++i) {
      const base = await ImageToBase64(multipleImages[i]);
      arrMultipleImage.push(base);
    }
    setData((prev) => { return { ...prev, image: { ...prev.image, [color]: arrMultipleImage } }; });
  };

  // Get Category
  useEffect(() => { getCategory(); }, []);
  const getCategory = async () => {
    let response = await readCategories();
    if (response && response.EC === 0) {
      setCategoriesData(response.DT);
      if (response.DT && response.DT.length > 0) {
      }
    } else { toast.error(response.EM); }
  };

  // Get Brand
  useEffect(() => { getBrand(); }, []);
  const getBrand = async () => {
    let response = await readBrand();
    if (response && response.EC === 0) {
      setBrandData(response.DT);
      if (response.DT && response.DT.length > 0) {
      }
    } else { toast.error(response.EM); }
  };

  // Confirm
  const handleConfirmProduct = async () => {
    console.log(brandData)
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
          return { ...prev, title: "", price: "", version: "", quantity: "", image: "", capacity: "", color: "", percentDiscount: "", categoriesId: "", brandId: "" };
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
            {/* categories and brand */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Categories (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <select className={cx(validInputs.categoriesId ? "" : `is-valid`)} name="categoriesId" onChange={handleOnChange} onFocus={handleOnFocus}>
                    <option value={""}>-- option --</option>
                    {categoriesData?.map((categories, index) => <option key={`${index}-categories`} value={categories?.id}>{categories?.name}</option>)}
                  </select>
                  {!validInputs.categoriesId && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Brand (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <select className={cx(validInputs.brandId ? "" : `is-valid`)} name="brandId" onChange={handleOnChange} onFocus={handleOnFocus}>
                    <option value={""}>-- option --</option>
                    {brandData?.map((brand, index) => <option key={`${index}-brand`} value={brand?.id}>{brand?.name}</option>)}
                  </select>
                  {!validInputs.brandId && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/*version and quantity*/}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Version (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.version ? "" : `is-valid`)} type="text" name="version" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.version && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                <label>Quantity (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.quantity ? "" : `is-valid`)} type="text" name="quantity" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.quantity && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* percent discount */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>PercentDiscount (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <input className={cx(validInputs.percentDiscount ? "" : `is-valid`)} type="text" name="percentDiscount" onChange={handleOnChange} onFocus={handleOnFocus} />
                  {!validInputs.percentDiscount && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
            </div>
            {/* capacity */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Capacity (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <select className={cx(validInputs.capacity ? "" : `is-valid`)} name="capacity" onChange={handleOnChangeCapacity} onFocus={handleOnFocus}>
                    <option value={""}>-- option --</option>
                    {capacityData && capacityData.map((item, index) => <option key={`${index}-capacity`} value={item}>{item}</option>)}
                  </select>
                  {!validInputs.capacity && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                {data?.capacity.length > 0 &&
                  <>
                    <label>Selected capacity</label>
                    <div className={cx("select-block")}>{data?.capacity.map((item, index) => <span key={index}>{item}{' '}</span>)}</div>
                  </>
                }
              </div>
            </div>
            {/* color */}
            <div className={cx("two-row")}>
              <div className={cx("bl-input")}>
                <label>Color (<span className={cx("valid-start")}>*</span>)</label>
                <div className={cx("bl-icon")}>
                  <select className={cx(validInputs.color ? "" : `is-valid`)} name="color" onChange={handleOnChangeColor} onFocus={handleOnFocus}>
                    <option value={""}>-- option --</option>
                    {colors && colors.sort().map((item, index) => <option key={`${index}-color`} value={item}>{item}</option>)}
                  </select>
                  {!validInputs.color && (<MdErrorOutline className={cx("icon")} />)}
                </div>
              </div>
              <div className={cx("bl-input")}>
                {data?.color.length > 0 &&
                  <>
                    <label>Selected color</label>
                    <div className={cx("select-block")}>{data?.color.map((item, index) => <span key={index}>{item}{' '}</span>)}</div>
                  </>
                }
              </div>
            </div>
            {/* Image */}
            <div className={cx("bl-one-input")}>
              <label>Image (<span className={cx("valid-start")}>*</span>)</label>
              {data?.color.length > 0 && data?.color.map((item, index) => {
                const handleChange = (e) => handleImageWithColor(e, item);
                return (
                  <div className={cx("bl-icon")} key={index}>
                    <div>{item}</div>
                    <input className={cx(validInputs.image ? "" : `is-valid`)} type="file" name="image" accept="image/*" multiple onChange={handleChange} onFocus={handleOnFocus} />
                    {!validInputs.image && (<MdErrorOutline className={cx("icon")} />)}
                  </div>
                )
              })}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={cx("btn", "secondary")} onClick={props.handleClose}>Close</button>
          <button className={cx("btn", "primary")} onClick={() => handleConfirmProduct()}>Save</button>
        </Modal.Footer>
      </Modal >
    </>
  );
};

export default ModalProductCreate;
