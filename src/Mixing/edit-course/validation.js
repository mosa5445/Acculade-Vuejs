export const validation = {
    methods: {
        imageHandler() {
            this.imageChanged = !this.imageChanged;
            if (this.imageChanged) this.changePictureBtnMsg = "منصرف شدم";
            else this.changePictureBtnMsg = "میخواهم تصویر را ویرایش کنم";
          },
          fileChange() {
            this.image = this.$refs.image.files[0];
            this.checkfile();
          },
          checkfile() {
            if (this.image.size > 1024 * 1024 * 2)
              this.err.file = "بیشترین حجم مجاز 2 مگابایت است";
            else if (this.image == "")
              this.err.file = "لطفا یک عکس برای دوره انتخاب کنید";
            else this.err.file = "";
          },
          hasWhiteSpace() {
            if (this.slug.indexOf(" ") >= 0)
              this.err.slug = "ادرس دوره نباید شامل فاصله خالی باشد";
            else if (this.slug == "")
              this.err.slug = "وارد کردن آدرس دوره الزامی است";
            else this.err.slug = "";
          },
      
          contentcheck() {
            if (this.content == "")
              this.err.content = "لطفا محتوای دوره را وارد کنید";
            else this.err.content = "";
          },
      
          checktitle() {
            if (this.title == "") this.err.title = "عنوان دوره نباید خالی بماند";
            else this.err.title = "";
          },
      
          checkprice() {
            if (this.type == "sale" && this.price == "")
              this.err.price = "قیمت دوره نباید خالی بماند";
            else this.err.price = "";
          }
    },
}