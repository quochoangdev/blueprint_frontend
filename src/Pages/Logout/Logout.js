import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiAdminService";
import { CountCartContext } from "../../hooks/DataContext";

const Logout = () => {
  const navigate = useNavigate()
  const { setCountCart } = useContext(CountCartContext)

  useEffect(() => {
    const handleLogoutUser = async () => {
      try {
        const response = await logoutUser();
        if (response.EC === 0) {
          navigate("/")
          setCountCart(0)
        }
      } catch (error) {
        console.log("Lỗi trong quá trình đăng xuất: ", error);
      }
    };
    const handleLogout = () => {
      handleLogoutUser();
    };
    handleLogout();
  });

  return <></>;
};

export default Logout;
