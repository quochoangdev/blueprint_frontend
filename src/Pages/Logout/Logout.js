import { useEffect } from "react";
import { logoutUser } from "../../services/userService";

const Logout = () => {
  useEffect(() => {
    const handleLogoutUser = async () => {
      try {
        const response = await logoutUser();
        if (response.EC === 0) {
          localStorage.removeItem("dataUsers");
          window.location.href = "/";
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
