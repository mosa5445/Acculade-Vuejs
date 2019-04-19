export const data = {
    data() {
        return {
          episodes: [],
          slug: "",
          title: "",
          content: "",
          image: "",
          type: "free",
          price: "",
          tag: "",
          time: "",
          episodePage: false,
          changePictureBtnMsg: "میخوام تصویر را ویرایش کنم",
          thumbnail: "",
          imageChanged: false,
          err: { slug: "", title: "", content: "", file: "", price: "" },
          serverErr: false,
          serverSuccess: false,
          msg: ""
        };
      }
}