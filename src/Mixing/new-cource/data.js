export const data = {
  data() {
    return {
      nextPage: false,
      status: false,
      episodes: [
        {
          title: "",
          url: "",
          time: "",
          sec: "",
          min: "",
          hour: "",
          preview: false
        }
      ],
      slug: "",
      title: "",
      content: "",
      image: "",
      type: "free",
      price: "",
      tag: "",
      time: "",
      err: { slug: "", title: "", content: "", file: "", price: "" },
      serverErr: false,
      serverSuccess: false,
      msg: ""
    };
  }
}