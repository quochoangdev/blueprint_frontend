import React, { useEffect, useState } from "react";
import { readCities, readDistricts, readJWT, readUser, updateUser } from "../../services/apiUserService";
import jwtDecode from "../../hooks/jwtDecode"
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { ImageToBase64 } from "../../utility/ImageToBase64";

const cx = classNames.bind(styles);

const Profile = () => {
  const [data, setData] = useState();
  const validInputDefault = { lastName: true, firstName: true, address: true, sex: true };
  const [validInputs, setValidInputs] = useState(validInputDefault);
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])

  // call api
  useEffect(() => { window.scrollTo(0, 0); fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
    }
    const fetchUser = await readUser(decoded?.user?.id);
    setData(fetchUser?.DT)

    const fetchCities = await readCities()
    if (fetchCities.EC === 0) { setCities(fetchCities?.DT); }
  };

  // Fetch districts when data.cities changes
  useEffect(() => { if (data?.cities) { fetchDistricts(data?.cities); } }, [data?.cities]);
  const fetchDistricts = async (idCity) => {
    const fetchDistricts = await readDistricts(idCity, null)
    if (fetchDistricts.EC === 0) {
      setDistricts(fetchDistricts?.DT)
    }
  }
  const fetchDistrictsFirst = async (idCity) => {
    const fetchDistricts = await readDistricts(idCity, null)
    if (fetchDistricts.EC === 0) {
      setData((prev) => ({ ...prev, districts: fetchDistricts.DT[0].id }));
    }
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => { return { ...prev, [name]: value, }; });
    if (name === "cities") {
      fetchDistricts(value);
      fetchDistrictsFirst(value)
    }
  };
  console.log(data)
  const handleOnImage = async (e, color) => {
    const multipleImages = e.target.files;
    let uploadImage = ""
    for (let i = 0; i < multipleImages.length; ++i) {
      uploadImage = await ImageToBase64(multipleImages[i]);
    }
    setData((prev) => { return { ...prev, image: uploadImage }; });
  };

  // check valid
  const isCheckInputs = () => {
    if (!data.lastName) { toast("Please Enter Last Name"); return false; }
    if (!data.firstName) { toast("Please Enter First Name"); return false; }
    if (!data.sex) { toast("Please Select Sex"); return false; }
    return true;
  };

  const checkValidateInputs = () => {
    setValidInputs(validInputDefault);
    let arr = ["lastName", "firstName", "sex"];
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

  // focus
  const handleOnFocus = () => { setValidInputs(validInputDefault); };

  // Confirm
  const handleConfirmUser = async (e) => {
    e.preventDefault()
    let isCheckBorder = checkValidateInputs();
    let isCheckTextEmpty = isCheckInputs();
    if (isCheckBorder && isCheckTextEmpty) {
      let fetchUser = await updateUser(data);
      if (fetchUser && fetchUser.EC === 0) {
        fetchJWT()
        toast.success(fetchUser.EM);
      } else {
        toast.error(fetchUser.EM);
      }
    }
  };

  return (
    <>
      <form className={cx("form-wrapper")}>
        {/* image */}
        <div className={cx("bl-one-input")}>
          <div className={cx("bl-avatar")}>
            {data?.image ? <img className={cx("img")} src={`${data?.image}`} alt="" /> : <FiUser className={cx("icon")} />}
            <div className={cx("bl-file")}>
              <span className={cx("title")}>Edit Avatar</span>
              <input className={cx("file")} type="file" name="image" accept="image/*" onChange={handleOnImage} onFocus={handleOnFocus} />
            </div>
          </div>
        </div>
        {/* name */}
        <div className={cx("two-row")}>
          <div className={cx("bl-input")}>
            <label>
              Last Name (<span className={cx("valid-start")}>*</span>)
            </label>
            <div className={cx("bl-icon")}>
              <input
                value={(data && data?.lastName) || ""}
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
                value={(data && data.firstName) || ""}
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
        {/* email */}
        <div className={cx("bl-one-input")}>
          <label>
            Email (<span className={cx("valid-start")}>*</span>)
          </label>
          <div className={cx("bl-icon")}>
            <input
              disabled
              value={(data && data?.email) || ""}
              type="email"
              name="email"
            />
          </div>
        </div>
        {/* phone and group */}
        <div className={cx("two-row")}>
          <div className={cx("bl-input")}>
            <label>
              Phone (<span className={cx("valid-start")}>*</span>)
            </label>
            <div className={cx("bl-icon")}>
              <input
                disabled
                value={(data && data.phone) || ""}
                type="text"
                name="phone"
              />
            </div>
          </div>
          <div className={cx("bl-input")}>
            <label>
              Group (<span className={cx("valid-start")}>*</span>)
            </label>
            <div className={cx("bl-icon")}>
              <input
                disabled
                value={(data && data?.Group?.name) || ""}
                type="text"
              />
            </div>
          </div>
        </div>
        {/* sex and address */}
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
              value={(data && data.sex) || ""}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>
          </div>
          <div className={cx("bl-input")}>
            <label>Address</label>
            <input
              value={(data && data?.address) || ""}
              type="text"
              name="address"
              onChange={handleOnChange}
            />
          </div>
        </div>
        {/* address */}
        <div className={cx("two-row")}>
          <div className={cx("bl-select")}>
            <label>
              City (<span className={cx("valid-start")}>*</span>)
            </label>
            <select
              // className={cx(validInputs.sex ? "" : `is-valid`)}
              name="cities"
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              value={(data && data.cities) || 0}
            >
              {cities?.map((city, index) => {
                return <option value={city?.id} key={`${index}-city`}>{city.name}</option>
              })}
            </select>
          </div>
          <div className={cx("bl-select")}>
            <label>
              District (<span className={cx("valid-start")}>*</span>)
            </label>
            <select
              // className={cx(validInputs.sex ? "" : `is-valid`)}
              name="districts"
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              value={(data?.districts)}
            >
              {districts.length > 0 && districts?.map((district, index) => {
                return <option value={district?.id} key={`${index}-district`}>{district?.name}</option>
              })}
            </select>
          </div>
        </div>
        <div className={cx("confirm")}>
          <button className={cx("email-letter-register")} onClick={handleConfirmUser}>
            Lưu thay đổi
          </button>
        </div>
      </form >
    </>
  );
};

export default Profile;
