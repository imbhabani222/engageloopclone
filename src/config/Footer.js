import constants from "../constants/constants";

const {
  ROUTES: {
    CONTACT_US,
    TERMSANDACONDITIONS,
    PRIVACYPOLICY,
    COOKIEPREFERENCES
  }
} = constants;

export const FooterData = [
  {
    label: "© EngageLoop 2021"
  },
  {
    label: "Terms & Conditions",
    route: TERMSANDACONDITIONS
  },
  {
    label: "Privacy Policy",
    route: PRIVACYPOLICY
  },
  {
    label: "Cookie Preferences",
    route: COOKIEPREFERENCES
  },
  {
    label: "Contact Us",
    route: CONTACT_US
  }
];
