import {
  ReactComponent as OnboardOrgIcon
} from "../../../assets/img/Dashboard/OnboardOrg.svg";
import {
  ReactComponent as ViewOrgIcon
} from "../../../assets/img/Dashboard/ViewOrg.svg";
import {
  ReactComponent as OnboardEmpIcon
} from "../../../assets/img/Dashboard/OnboardEmp.svg";
import constants from "../../../constants/constants";

const {
  ROLES: {
    ADMIN,
    HRBP
  },
  ONBOARD_ORG_LABEL,
  VIEW_ORG_LABEL,
  ONBOARD_EMP_LABEL,
  VIEW_EMP_LABEL,
  ROUTES: {
    ONBOARD,
    VIEWONBOARD,
    ONBOARDEMPLOYEE,
    VIEWALLEMPLOYEE
  }
} = constants;

export const RoleBasedDashboard = [
  {
    icon: OnboardOrgIcon,
    text: ONBOARD_ORG_LABEL,
    route: ONBOARD,
    supportingRole: [ADMIN]
  },
  {
    icon: OnboardEmpIcon,
    text: ONBOARD_EMP_LABEL,
    route: ONBOARDEMPLOYEE,
    supportingRole: [HRBP]
  },
  {
    icon: ViewOrgIcon,
    text: VIEW_EMP_LABEL,
    route: VIEWALLEMPLOYEE,
    supportingRole: [HRBP]
  },
  {
    icon: ViewOrgIcon,
    text: VIEW_ORG_LABEL,
    route: VIEWONBOARD,
    supportingRole: [ADMIN]
  }
];
