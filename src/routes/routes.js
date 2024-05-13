import config from "../config";
import DefaultLayout from "../layout/DefaultLayout";
import HeadlessLayout from "../layout/HeadlessLayout";
import AdminLayout from "../layout/AdminLayout";
// import HomeLayout from "../layout/HomeLayout";

// Page
import Home from "../Pages/Home";
import HomeDetail from "../Pages/HomeDetail";
import DichVu from "../Pages/DichVu";
import BaoGia from "../Pages/BaoGia";
import PhanHoi from "../Pages/PhanHoi";
import TuyenDung from "../Pages/TuyenDung";
import Cart from "../Pages/Cart";
import CheckOut from "../Pages/CheckOut";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";

// Sub page
import Mobile from "../Pages/Mobile";
import Tablet from "../Pages/Tablet";
import Laptop from "../Pages/Laptop";

// Admin Page
import HomeAdmin from "../PageAdmin/Home";
import GroupAdmin from "../PageAdmin/Groups";
import GroupRoleAdmin from "../PageAdmin/GroupRole";
import RoleAdmin from "../PageAdmin/Roles";
import UserAdmin from "../PageAdmin/User";
import ProductAdmin from "../PageAdmin/Products";
import CategoriesAdmin from "../PageAdmin/Categories/Categories";
import BrandAdmin from "../PageAdmin/Brand";
import OrderAdmin from "../PageAdmin/Order";
import SettingAdmin from "../PageAdmin/Settings";
import SignOutAdmin from "../PageAdmin/SignOut";
import NoLayout from "../layout/NoLayout";
import Iphone from "../Pages/Iphone/Iphone";
import Samsung from "../Pages/Samsung";

// Public routes
const publicRoutes = [
  // Page
  {
    path: config.routes.home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: config.routes.homeDetail,
    component: HomeDetail,
    layout: DefaultLayout,
  },
  {
    path: config.routes.dichVu,
    component: DichVu,
    layout: DefaultLayout,
  },
  {
    path: config.routes.baoGia,
    component: BaoGia,
    layout: DefaultLayout,
  },
  {
    path: config.routes.phanHoi,
    component: PhanHoi,
    layout: DefaultLayout,
  },
  {
    path: config.routes.tuyenDung,
    component: TuyenDung,
    layout: DefaultLayout,
  },
  {
    path: config.routes.cart,
    component: Cart,
    layout: HeadlessLayout,
  },
  {
    path: config.routes.checkout,
    component: CheckOut,
    layout: DefaultLayout,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: HeadlessLayout,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: HeadlessLayout,
  },
  {
    path: config.routes.logout,
    component: Logout,
    layout: NoLayout,
  },
  // Sub page
  {
    path: config.routes.mobile,
    component: Mobile,
    layout: DefaultLayout,
  },
  {
    path: config.routes.iphone,
    component: Iphone,
    layout: DefaultLayout,
  },
  {
    path: config.routes.samsung,
    component: Samsung,
    layout: DefaultLayout,
  },
  {
    path: config.routes.tablet,
    component: Tablet,
    layout: DefaultLayout,
  },
  {
    path: config.routes.laptop,
    component: Laptop,
    layout: DefaultLayout,
  },
  // Admin
  {
    path: config.routes.homeAdmin,
    component: HomeAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.userAdmin,
    component: UserAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.groupAdmin,
    component: GroupAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.groupRoleAdmin,
    component: GroupRoleAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.roleAdmin,
    component: RoleAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.productAdmin,
    component: ProductAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.categoriesAdmin,
    component: CategoriesAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.brandAdmin,
    component: BrandAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.orderAdmin,
    component: OrderAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.settingAdmin,
    component: SettingAdmin,
    layout: AdminLayout,
  },
  {
    path: config.routes.signOutAdmin,
    component: SignOutAdmin,
    layout: AdminLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
