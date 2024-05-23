export const defaultEmailRule = {
  required: true,
  message: "Please input valid email!"
};
export const defaultEmailRuleRestirct = {
  required: true,
  type: "email",
  message: "Please input valid email!"
};

export const defaultPasswordRule = {
  required: true,
  message: "Please input your Password!"
};

export const defaultRequiredRule = {
  required: true,
  message: "This feild is required"
};

export const defaultRequiredLimitRule = {
  min: 6,
  message: "Username must be minimum 5 characters."
};

export const defaultConfirmRequiredRule = [
  {
    required: true,
    message: "Please confirm your password!"
  },
  ({ getFieldValue }) => ({
    validator (_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    }
  })
];
