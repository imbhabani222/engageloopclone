import constants from "../../../constants/constants";
import colors from "../../../constants/colors";

import CardIcon from "../../../assets/img/cards.svg";
import GroupIcon from "../../../assets/img/Group.svg";
import WalletIcon from "../../../assets/img/wallet.svg";

const {
  POINTS_MODULE: {
    MY_EL_POINTS,
    POINT_EARNED_THIS_MONTH,
    POINT_USED_THIS_MONTH
  }
} = constants;

export const PointsHTMLData = [
  {
    icon: CardIcon,
    text: MY_EL_POINTS,
    value: 3600,
    color: colors.greenColor
  },
  {
    icon: GroupIcon,
    text: POINT_EARNED_THIS_MONTH,
    value: 3600,
    color: colors.orangeColor
  },
  {
    icon: WalletIcon,
    text: POINT_USED_THIS_MONTH,
    value: 3600,
    color: colors.skyBlueColor
  }
];
