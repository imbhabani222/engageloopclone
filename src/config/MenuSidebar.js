import { ReactComponent as ProfileIcon } from "../assets/img/Profile.svg";
import { ReactComponent as OnboardOrgIcon } from "../assets/img/OnboardOrg.svg";
import { ReactComponent as ViewOrgIcon } from "../assets/img/ViewOrg.svg";
import {
  ReactComponent as OnboardEmpIcon
} from "../assets/img/emponboardicons.svg";
// import {
//   ReactComponent as NotificationsIcon
// } from "../assets/img/notification.svg";
// import { ReactComponent as ReportsIcon } from "../assets/img/ReportMenu.svg";
// import { ReactComponent as SettingsIcon } from "../assets/img/Settings.svg";

import constants from "../constants/constants";

const {
  ROLES: {
    ADMIN,
    HRBP,
    EMPLOYEE
  },
  PROFILE_LABEL,
  ONBOARD_ORG_LABEL,
  VIEW_ORG_LABEL,
  ONBOARD_EMP_LABEL,
  VIEW_EMP_LABEL,
  ROUTES: {
    ONBOARD,
    VIEWONBOARD,
    SETTINGS,
    ONBOARDEMPLOYEE,
    VIEWALLEMPLOYEE
  }
} = constants;

export const SidebarFirst = [
  {
    icon: ProfileIcon,
    text: PROFILE_LABEL,
    additionalClass: "",
    onClickAction: "",
    popover: "",
    route: SETTINGS,
    supportingRole: [ADMIN, EMPLOYEE]
  },
  {
    icon: OnboardOrgIcon,
    text: ONBOARD_ORG_LABEL,
    additionalClass: "",
    onClickAction: "",
    route: ONBOARD,
    supportingRole: [ADMIN]
  },
  {
    icon: ViewOrgIcon,
    text: VIEW_ORG_LABEL,
    additionalClass: "",
    onClickAction: "",
    popover: "",
    route: VIEWONBOARD,
    supportingRole: [ADMIN]
  },
  {
    icon: OnboardEmpIcon,
    text: ONBOARD_EMP_LABEL,
    additionalClass: "",
    onClickAction: "",
    popover: "",
    route: ONBOARDEMPLOYEE,
    supportingRole: [HRBP]
  },
  {
    icon: ViewOrgIcon,
    text: VIEW_EMP_LABEL,
    additionalClass: "",
    onClickAction: "",
    popover: "",
    route: VIEWALLEMPLOYEE,
    supportingRole: [HRBP]
  }
  // {
  //   icon: NotificationsIcon,
  //   text: NOTIFICATIONS_LABEL,
  //   additionalClass: "",
  //   onClickAction: "",
  //   popover: ""
  // },
  // {
  //   icon: ReportsIcon,
  //   text: REPORTS_LABEL,
  //   additionalClass: "",
  //   onClickAction: "",
  //   popover: ""
  // },
  // {
  //   icon: SettingsIcon,
  //   text: SETTINGS_LABEL,
  //   additionalClass: "",
  //   onClickAction: "",
  //   route: ""
  // }
];
