export const episode = {
    methods: {
        newEpisode() {
            this.episodes.push({
              title: "",
              url: "",
              time: "",
              sec: "",
              min: "",
              hour: ""
            });
          },
          removeEpisode(index) {
            this.episodes.splice(index, 1);
          },
    }
}