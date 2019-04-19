import validator from "validator";

export const validation = {
  methods: {
    name() {
      if (validator.isEmpty(this.user.name))
        this.err.name = "فیلد نام باید وارد شود";
      else if (this.user.name.length < 3)
        this.err.name = "نام باید بیشتر از دو حرف باشد";
      else this.err.name = "";
    },
    email() {
      if (validator.isEmpty(this.user.email))
        this.err.email = "فیلد ایمیل باید وارد شود";
      else if (!validator.isEmail(this.user.email))
        this.err.email = "ایمیل نامعتبر";
      else this.err.email = "";
    },
    username() {
      if (validator.isEmpty(this.user.username))
        this.err.username = "فیلد نام کاربری باید وارد شود";
      else this.err.username = "";
    },
    password() {
      if (!validator.isLength(this.user.password, { min: 8 }))
        this.err.password = "رمز ورود باید حداقل 8 حرف باشد";
      else {
        this.err.password = "";

      }
    },
    confirmpassword() {
      if (this.user.confirmpassword !== this.user.password)
        this.err.confirmpassword = "این مقدار با مقدار رمز ورود یکسان نیست";
      else this.err.confirmpassword = "";
    }
  },
}