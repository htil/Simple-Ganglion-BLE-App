var Physio = function (update, vis) {
  channels = {};
  this.channels = {};
  this.channelFilters = {};
  this.vis = vis;
  this.update = update;
  this.SECONDS = 2;
  this.sampleRate = 256;
  this.BUFFER_SIZE = this.SECONDS * this.sampleRate;
  this.sensor = null;
  this.filterOrder = 128;
  this.sampleRate = 250;
  this.lowFreq = 7;
  this.highFreq = 30;
  this.firCalculator = new Fili.FirCoeffs();
  this.coeffs = this.firCalculator.bandpass({
    order: this.filterOrder,
    Fs: this.sampleRate,
    F1: this.lowFreq,
    F2: this.highFreq,
  });
  //this.filter = new Fili.FirFilter(this.coeffs);

  this.addData = (sample, channel) => {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
      this.channelFilters[channel] = new Fili.FirFilter(this.coeffs);
    }

    if (this.channels[channel].length > this.BUFFER_SIZE - 1) {
      this.channels[channel].shift();
    }

    this.channels[channel].push(sample);
    return this.channelFilters[channel].singleStep(sample); // return filtered data
  };

  this.disconnect = async () => {
    this.sensor.disconnect();
    /*
    let temp = {};
    let out = 0;
    for (var cnt = 0; cnt < 10; cnt++) {
      out = this.filter.singleStep(cnt);
      console.log(out);
      temp[0] = out;
      window.rawSignalGraph.series.addData(temp);
      window.rawSignalGraph.render();
    }*/
  };

  this.connect = async () => {
    this.sensor = new Ganglion.Ganglion();
    await this.sensor.connect();
    await this.sensor.start();
    this.sensor.stream.subscribe((samples) => {
      let { data } = samples;
      let temp = {};
      let filteredData = 0;
      for (let sample in data) {
        filteredData = this.addData(data[sample], sample);
        temp[sample] = filteredData;
      }
      vis.rawSignalGraph.series.addData(temp);
      vis.rawSignalGraph.render();
      //this.update(sample);
    });
  };
};
