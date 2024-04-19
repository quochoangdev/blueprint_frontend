import config from "../config";
import DefaultLayout from "../layout/DefaultLayout";
import HeadlessLayout from "../layout/HeadlessLayout";
import AdminLayout from "../layout/AdminLayout";
// import HomeLayout from "../layout/HomeLayout";

// Page
import Home from "../Pages/Home";
import HomeDetail from "../Pages/HomeDetail";
import DichVu from "../Pages/DichVu";
import DuAn from "../Pages/DuAn";
import BaoGia from "../Pages/BaoGia";
import PhanHoi from "../Pages/PhanHoi";
import TuyenDung from "../Pages/TuyenDung";
import Heart from "../Pages/Heart";
import CheckOut from "../Pages/CheckOut";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";

// Sub page
import NhaCap4 from "../Pages/NhaCap4";
import NhaPho from "../Pages/NhaPho";
import MauBietThu from "../Pages/MauBietThu";
import MauKhachSan from "../Pages/MauKhachSan";

// Admin Page
import HomeAdmin from "../PageAdmin/Home";
import GroupAdmin from "../PageAdmin/Groups";
import GroupRoleAdmin from "../PageAdmin/GroupRole";
import RoleAdmin from "../PageAdmin/Roles";
import UserAdmin from "../PageAdmin/User";
import ProductAdmin from "../PageAdmin/Products";
import CategoryAdmin from "../PageAdmin/Category";
import OrderAdmin from "../PageAdmin/Order";
import SettingAdmin from "../PageAdmin/Settings";
import SignOutAdmin from "../PageAdmin/SignOut";
import NoLayout from "../layout/NoLayout";

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
    path: config.routes.duAn,
    component: DuAn,
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
    path: config.routes.heart,
    component: Heart,
    layout: HeadlessLayout,
  },
  {
    path: config.routes.checkout,
    component: CheckOut,
    layout: HeadlessLayout,
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
    path: config.routes.nhaCap4Dep,
    component: NhaCap4,
    layout: DefaultLayout,
  },
  {
    path: config.routes.nhaPhoDep,
    component: NhaPho,
    layout: DefaultLayout,
  },
  {
    path: config.routes.mauBietThuDep,
    component: MauBietThu,
    layout: DefaultLayout,
  },
  {
    path: config.routes.mauKhachSanDep,
    component: MauKhachSan,
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
    path: config.routes.categoryAdmin,
    component: CategoryAdmin,
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
