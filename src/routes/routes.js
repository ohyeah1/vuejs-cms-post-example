import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/table",
    children: [
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard
      // },
      {
        path: "table",
        name: "Table List",
        component: TableList,
        //query: { page: 'private' },
        children: [
          // UserHome will be rendered inside User's <router-view>
          // when /user/:id is matched
          // { path: "", component: TableList },
          { path: "/table/:id", component: TableList }

          // ...other sub routes
        ]
      },
      {
        path: "post",
        name: "Post Profile",
        component: UserProfile,
        children: [
          // UserHome will be rendered inside User's <router-view>
          // when /user/:id is matched
          // { path: "", component: UserProfile },
          { path: "/post/:id", component: UserProfile }

          // ...other sub routes
        ]
      }
      // {
      //   path: "typography",
      //   name: "Typography",
      //   component: Typography
      // },
      // {
      //   path: "icons",
      //   name: "Icons",
      //   component: Icons
      // },
      // {
      //   path: "maps",
      //   name: "Maps",
      //   meta: {
      //     hideFooter: true
      //   },
      //   component: Maps
      // },
      // {
      //   path: "notifications",
      //   name: "Notifications",
      //   component: Notifications
      // },
      // {
      //   path: "upgrade",
      //   name: "Upgrade to PRO",
      //   component: UpgradeToPRO
      // }
    ]
  }
];

export default routes;
