import axios from "axios";
export const submit = {
    methods: {
        async submit() {
            const token = localStorage.getItem("auth");
            await this.checkfile();
            await this.hasWhiteSpace();
            await this.contentcheck();
            await this.checktitle();
            await this.checkprice();

            //concat hour min sec in time
            this.episodes.forEach(episode => {
                episode.time = "";
                if (episode.min.length == 1) episode.min = "0" + episode.min;

                if (episode.sec.length == 1) episode.sec = "0" + episode.sec;

                if (!episode.hour || episode.hour == '0' || !episode.hour == '00') {
                    episode.time = episode.min + ":" + episode.sec;
                    episode.hour = '00'
                }
                else
                    episode.time = episode.hour + ":" + episode.min + ":" + episode.sec;
            });

            //validation
            let err = false;
            for (let i = 0; i < this.episodes.length && !err; i++) {
                if (
                    !this.episodes[i].title ||
                    !this.episodes[i].url ||
                    !this.episodes[i].time
                )
                    err = true;
            }

            ///calculate entire course time length
            let timeSec = 0;
            //convert time to second
            await this.episodes.forEach(episode => {
                if (episode.hour) timeSec += parseInt(episode.hour) * 60 * 60;
                if (episode.min) timeSec += parseInt(episode.min) * 60;
                if (episode.sec) timeSec += parseInt(episode.sec);

            });

            timeSec = await timeSec.toString();

            //convert second to time format
            String.prototype.toHHMMSS = function () {
                var sec_num = parseInt(this, 10);
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - hours * 3600) / 60);
                var seconds = sec_num - hours * 3600 - minutes * 60;

                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                if (hours != "00")
                    return hours + ":" + minutes + ":" + seconds;
                else
                    return minutes + ":" + seconds;
            };

            this.time = timeSec.toHHMMSS();


            //if image was changed
            if (this.imageChanged) {
                if (
                    this.err.price == "" &&
                    this.err.title == "" &&
                    this.err.slug == "" &&
                    this.err.content == "" &&
                    this.err.file == "" &&
                    !err
                ) {
                    let formData = new FormData();
                    let jsonEpisodes = await JSON.stringify(this.episodes);
                    formData.append("id", this.$route.params.id);
                    formData.append("episodes", jsonEpisodes);
                    formData.append("image", this.image);
                    formData.append("title", this.title);
                    formData.append("type", this.type);
                    formData.append("price", this.price);
                    formData.append("content", this.content);
                    formData.append("status", this.status);
                    formData.append("tag", this.tag);
                    formData.append("preview", this.preview);
                    formData.append("slug", this.slug);
                    formData.append("time", this.time);
                    formData.append("token", token);
                    try {
                        let res = await axios({
                            method: "put",
                            url: "http://localhost:4000/admin/course",
                            headers: {
                                token: token
                            },
                            data: formData
                        });
                        this.serverErr = false;
                        this.msg = "";
                        this.serverSuccess = true;
                        this.msg = res.data.msg;
                    } catch (err) {
                        this.serverSuccess = false;
                        this.msg = "";
                        this.serverErr = true;
                        if (err.response.data.err) this.msg = err.response.data.err;
                        else if (err.response.status == 401)
                            this.msg = "لطفا دوباره وارد سایت شوید";
                        else
                            this.msg = "به نظر میاد که یه مشکلی هست ، لطفا دوباره امتحان کن";
                        console.log("err", err, " ", err.response.data);
                    }
                } else {
                    this.serverErr = true;
                    this.msg = "";
                    if (err)
                        this.msg =
                            "لطفا اطلاعات مربوط به قسمت های دوره را دوباره بررسی کنید";
                    else this.msg = "لطفا همه ی موارد خواسته شده را وارد کنید";
                }
            }

            //if image wasnt changed
            else {
                if (
                    this.err.price == "" &&
                    this.err.title == "" &&
                    this.err.slug == "" &&
                    this.err.content == "" &&
                    !err
                ) {
                    try {
                        let res = await axios({
                            method: "put",
                            url: "http://localhost:4000/admin/course",
                            headers: {
                                token: token
                            },
                            data: {
                                id: this.$route.params.id,
                                title: this.title,
                                type: this.type,
                                price: this.price,
                                content: this.content,
                                tag: this.tag,
                                slug: this.slug,
                                status: this.status,
                                episodes: this.episodes,
                                time: this.time,
                                preview: this.preview,
                                token
                            }
                        });
                        this.serverErr = false;
                        this.msg = "";
                        this.serverSuccess = true;
                        this.msg = res.data.msg;
                    } catch (err) {
                        this.serverSuccess = false;
                        this.msg = "";
                        this.serverErr = true;
                        if (err.response.data.err) this.msg = err.response.data.err;
                        else if (err.response.status == 401)
                            this.msg = "لطفا دوباره وارد سایت شوید";
                        else
                            this.msg = "به نظر میاد که یه مشکلی هست ، لطفا دوباره امتحان کن";
                        console.log("err", err, " ", err.response.data);
                    }
                } else {
                    this.msg = "";
                    this.serverErr = true;
                    this.msg = "لطفا اطلاعات مربوط به قسمت های دوره را دوباره بررسی کنید";
                }
            }
        }
    }
}

