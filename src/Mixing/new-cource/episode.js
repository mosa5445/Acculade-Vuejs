export const episode = {
    methods: {
        newEpisode() {
            this.episodes.push({
                title: "",
                url: "",
                time: "",
                sec: "",
                min: "",
                hour: "",
                preview: false
            });
        },

        removeEpisode(index) {
            this.episodes.splice(index, 1);
        },
        async next() {
            await this.checkfile();
            await this.hasWhiteSpace();
            await this.contentcheck();
            await this.checktitle();
            await this.checkprice();
            if (
                this.err.price == "" &&
                this.err.title == "" &&
                this.err.slug == "" &&
                this.err.content == "" &&
                this.err.file == ""
            ) {
                this.nextPage = true;
            }
        }
    }
}