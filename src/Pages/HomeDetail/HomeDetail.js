import classNames from "classnames/bind";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { PiStarThin } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { TbReplace } from "react-icons/tb";
import { FaCircleChevronLeft, FaCircleChevronRight, FaGift } from "react-icons/fa6";
import { toast } from "react-toastify";
import HomePageItem from "../../layout/components/HomePageItem/HomePageItem";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/cartSlice";
import { createCart, readCartTotal, readJWT, readProductDetail } from "../../services/apiUserService";
import { FiShoppingCart } from "react-icons/fi";
import jwtDecode from "../../routes/jwtDecode";
import { CountCartContext } from "../../hooks/DataContext";


import styles from "./HomeDetail.module.scss";

const cx = classNames.bind(styles);

const HomeDetail = () => {
  const { setCountCart } = useContext(CountCartContext)
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [userLogin, setUserLogin] = useState()
  const [data, setData] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [dataBuy, setDataBuy] = useState({});
  const [compact, setCompact] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
      fetchCartWithId(decoded?.user?.id)
    }
    setUserLogin(decoded)
  };
  const fetchCartWithId = async (idUser) => {
    const fetchCart = await readCartTotal(idUser)
    setCountCart(fetchCart.DT)
  }

  // price discount
  const priceDiscount = data && data.price - data.price * (data.percentDiscount / 100);

  // call Api
  useEffect(() => { fetchData(slug) }, [slug]);
  const fetchData = async (slug) => {
    try {
      const axiosProduct = await readProductDetail(slug)
      if (axiosProduct) { setData(axiosProduct?.DT); }
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu:", error);
    }
  }

  // left
  // handle describe scroll
  const describeScroll = useRef();
  const handleDescribeScrollT = () => { describeScroll.current.scrollLeft -= 208; };
  const handleDescribeScrollP = () => { describeScroll.current.scrollLeft += 208; };
  const formatNumber = (number) => { return number.toLocaleString("vi-VN"); };
  // handle show describe image
  const handleShowDescribeImage = (img) => { setShowImage(img); };

  // right
  // handle start
  const handleStart = () => { toast.warning("Chức năng đang được phát triển"); };
  // handle assess
  const handleAssess = () => { toast.warning("Chức năng đang được phát triển"); };
  // handle compare
  const handleCompare = () => { toast.warning("Chức năng đang được phát triển"); };

  // handle capacity
  useEffect(() => {
    const capacityTitle = data?.title.substring(data?.title.lastIndexOf(' ') + 1);
    setSelectedCapacity(capacityTitle)
  }, [data])
  const handleCapacity = useCallback(
    (capacity) => {
      setSelectedCapacity(capacity);
      const currentSlug = data?.slug.replace(data?.slug.substring(data?.slug.lastIndexOf('-') + 1), capacity).toLocaleLowerCase()
      navigate(`/${currentSlug}`)
    },
    [data?.slug, navigate]
  );

  // handle color 
  const handleColors = useCallback(
    (color) => {
      setSelectedColor(color);
    },
    [setSelectedColor]
  );
  const handleOptionClick = useCallback((color) => { handleColors(color); setShowImage(false); }, [handleColors]); // handle color onClick
  useEffect(() => { data && setSelectedColor(data?.color[0]) }, [data]); // set color default

  // handle compact
  const handleCompact = () => { setCompact((prev) => !prev); };

  // handle buy
  useEffect(() => {
    setDataBuy(() => {
      return {
        id: data?.id,
        title: data?.title,
        image: selectedColor && data?.image[selectedColor][0],
        color: data && selectedColor,
        capacity: data && selectedCapacity,
        price: data && priceDiscount,
        slug: data?.slug,
      };
    });
  }, [data, priceDiscount, selectedCapacity, selectedColor]);
  const handleBuy = (e) => {
    console.log(dataBuy)
    e.preventDefault(); dispatch(addCartItem(dataBuy));
  };

  // handle add cart
  const handleAddCart = async (e) => {
    e.preventDefault();
    const dataObj = { idUser: userLogin?.user?.id, idProduct: data?.id }
    const fetchCart = await createCart(dataObj)
    if (fetchCart?.EC === 0) {
      toast.success(fetchCart?.EM);
      fetchJWT()
    } else {
      toast.warning(fetchCart?.EM);
    }
  }

  // handle Installment
  const handleInstallment = (e) => { e.preventDefault(); toast.warning("Chức năng đang được phát triển") };

  return (
    <div className={cx("wrapper-background")}>
      <div className={cx("wrapper")}>
        <div className={cx("product")}>
          <div className={cx("product-left")}>
            <Link className={cx("left-link")} to={'/'}>
              {selectedColor && <img className={cx("left-img")} src={showImage || data?.image[selectedColor][0]} alt="" />}
            </Link>
            <div className={cx("left-describe-image")}>
              <div className={cx("left-describe-block")} ref={describeScroll}>
                {selectedColor && data?.image[selectedColor].map((img, index) => {
                  return (
                    <div className={cx("describe-item")} onClick={() => handleShowDescribeImage(img)} key={index}>
                      <img className={cx("image-item")} src={img} alt="" />
                    </div>
                  )
                })}
              </div>
              <FaCircleChevronLeft className={cx("describe-icon-left")} onClick={handleDescribeScrollT} />
              <FaCircleChevronRight className={cx("describe-icon-right")} onClick={handleDescribeScrollP} />
            </div>
          </div>
          <div className={cx("product-right")}>
            <h1 className={cx("title")}>{data?.title}</h1>
            <div className={cx("sub-title")}>
              <div className={cx("start")} onClick={handleStart}>
                <PiStarThin className={cx("start-icon")} />
                <PiStarThin className={cx("start-icon")} />
                <PiStarThin className={cx("start-icon")} />
                <PiStarThin className={cx("start-icon")} />
                <PiStarThin className={cx("start-icon")} />
              </div>
              <div className={cx("start-assess")} onClick={handleAssess}>
                Đánh giá
              </div>
              <div className={cx("compare")} onClick={handleCompare}>
                <IoIosAddCircleOutline className={cx("compare-icon")} />
                So sánh
              </div>
            </div>
            <div className={cx("price")}>
              <div className={cx("price-new")}>
                <span className={cx("price-new-text")}>{data && formatNumber(priceDiscount)}</span>
                <span className={cx("price-new-icon")}>₫</span>
              </div>
              <div className={cx("price-old")}>
                {data && formatNumber(data.price)}
                <span className={cx("price-old-icon")}>₫ {" "} -{data?.percentDiscount}%</span>
              </div>
            </div>
            <div className={cx("phone-capacity")}>
              <div className={cx("phone-capacity-title")}>Dung lượng</div>
              <div className={cx("phone-capacity-select")}>
                {data?.capacity.map((capacity, index) => (
                  <div className={cx("phone-capacity-option", `${capacity === selectedCapacity ? "active" : ""}`)} key={index} onClick={() => handleCapacity(capacity)}>
                    {capacity === "1000GB" ? "1TB" : capacity}
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("phone-color")}>
              <div className={cx("phone-color-title")}>Màu sắc</div>
              <div className={cx("phone-color-select")}>
                {data?.color.map((color, index) => {
                  return (
                    <div key={index} className={cx("phoneColorOption", `${color === selectedColor ? "active" : ""}`)} onClick={() => handleOptionClick(color)}>
                      <div className={cx("phoneColorOptionColor")} style={{ backgroundColor: `${color === "natural" ? "#C7BEAF" : color}` }} onClick={() => handleOptionClick(color)}></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={cx("special-offers")}>
              <div className={cx("title")}>
                <div className={cx("title-icon")}><FaGift /></div>
                <div className={cx("title-text")}>Ưu đãi</div>
              </div>
              <div className={cx("description", `${compact ? "" : "description-height-107"}`)}>
                {/*  */}
                <div className={cx("description-item")}>
                  <div className={cx("heading")}>I. Ưu đãi thanh toán</div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Giảm tới <span>600.000đ</span> qua cổng thanh toán
                    </div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Giảm tới <span>2.000.000đ</span> khi thanh toán qua thẻ tín dụng
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className={cx("description-item")}>
                  <div className={cx("heading")}>II. Ưu đãi trả góp (1/12 - 31/12)</div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Ưu đãi tới <span>500.000đ</span> khi thanh toán trả góp
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className={cx("description-item")}>
                  <div className={cx("heading")}>III. Ưu đãi mua kèm iPhone 15 series</div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>Mua kèm giảm sâu phụ kiện Apple</div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>Mua kèm giảm sâu phụ kiện Non Apple</div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Giảm 10% khi mua Bảo hành tiêu chuẩn mở rộng (6 tháng, 12 tháng)
                    </div>
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Giảm 20% khi mua Bảo hành kim cương, Bảo hành VIP (Rơi vỡ, vào nước)
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className={cx("description-item")}>
                  <div className={cx("heading")}>
                    IV. Ưu đãi cán bộ công nhân viên VietinBank, VietcomBank, VinFast
                  </div>
                  <div className={cx("content")}>
                    <div className={cx("content-icon")}>
                      <FaCheckCircle />
                    </div>
                    <div className={cx("content-text")}>
                      Tặng voucher giảm giá <span>500.000đ</span>
                    </div>
                  </div>
                </div>
                <div className={cx("compact")} onClick={handleCompact}>
                  {compact ? (
                    <>Thu gọn <AiOutlineUp /></>
                  ) : (
                    <>Xem thêm ưu đãi khác <AiOutlineDown /></>
                  )}
                </div>
              </div>
            </div>
            <div className={cx("btn-buy")}>
              <Link className={cx("btn-buy-link")} to="/" onClick={handleBuy}>
                MUA NGAY
              </Link>
            </div>
            <div className={cx("btn-installment")}>
              <Link className={cx("btn-installment-link")} to="#" onClick={handleAddCart}>
                <FiShoppingCart className={cx("btn-installment-link-icon")} />
                Thêm vào giỏ hàng
              </Link>
              <Link className={cx("btn-installment-link")} to="/" onClick={handleInstallment}>
                <TbReplace className={cx("btn-installment-link-icon")} />
                Thu cũ đổi mới
              </Link>
            </div>
            <div className={cx("policy")}>
              <div className={cx("policy-item")}>
                <div className={cx("policy-item-icon")}>
                  <FaCheckCircle />
                </div>
                <div className={cx("policy-item-text")}>
                  Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Type C
                </div>
              </div>
              <div className={cx("policy-item")}>
                <div className={cx("policy-item-icon")}>
                  <FaCheckCircle />
                </div>
                <div className={cx("policy-item-text")}>Bảo hành chính hãng 1 năm</div>
              </div>
              <div className={cx("policy-item")}>
                <div className={cx("policy-item-icon")}>
                  <FaCheckCircle />
                </div>
                <div className={cx("policy-item-text")}>Giao hàng nhanh toàn quốc</div>
              </div>
              <div className={cx("policy-item")}>
                <div className={cx("policy-item-icon")}>
                  <FaCheckCircle />
                </div>
                <div className={cx("policy-item-text")}>
                  Gọi đặt mua <span>0971955144</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("suggest")}>
          <h3 className={cx("title")}>Gợi ý phụ kiện đi kèm</h3>
          <HomePageItem />
        </div>
      </div>
    </div>
  );
};

export default HomeDetail;
