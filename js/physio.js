var Physio = function (update) {
  channels = {};
  this.channels = {};
  this.update = update;
  this.SECONDS = 2;
  this.sampleRate = 256;
  this.BUFFER_SIZE = this.SECONDS * this.sampleRate;
  this.addData = (sample, channel) => {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }

    if (this.channels[channel].length > this.BUFFER_SIZE - 1) {
      this.channels[channel].shift();
    }

    this.channels[channel].push(sample);
  };

  this.connect = async () => {
    const ganglion = new Ganglion.Ganglion();
    await ganglion.connect();
    await ganglion.start();
    ganglion.stream.subscribe((samples) => {
      let { data } = samples;
      let temp = {};
      for (let sample in data) {
        this.addData(data[sample], sample);
        temp[sample] = data[sample];
      }
      window.rawSignalGraph.series.addData(temp);
      window.rawSignalGraph.render();
      //this.update(sample);
    });
  };
};
