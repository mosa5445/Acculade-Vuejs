import axios from 'axios'
export const created = {
    async created() {
        try {
            const res = await axios({
                method: "get",
                url: `http://localhost:4000/course/${this.$route.params.slug}`
            });
            if (this.$route.params.id != res.data._id) throw err;
            else {
                this.slug = res.data.slug;
                this.title = res.data.title;
                this.content = res.data.content;
                this.type = res.data.type;
                this.thumbnail = "http://localhost:4000/" + res.data.images[480];
                this.price = res.data.price;
                this.tag = res.data.tag;
                this.episodes = res.data.episodes;
            }
        } catch (err) {
            this.$router.push("/404");
        }
    }
}