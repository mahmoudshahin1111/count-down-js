class CountDown {
  constructor(lunchingDate) {
    this._days = 0;
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
    this.currentDate = new Date();
    this.lunchingDate = lunchingDate;
    this.elapsesTime = 0;
    this.upperNumberLayerSeconds = $(
      ".seconds__container .number__layer.upper .layer[data-flipper]"
    );
    this.bottomNumberLayerSeconds = $(
      ".seconds__container .number__layer.bottom .layer[data-flipper]"
    );
    this.upperNumberLayerMinutes = $(
      ".minutes__container .number__layer.upper .layer[data-flipper]"
    );
    this.bottomNumberLayerMinutes = $(
      ".minutes__container .number__layer.bottom .layer[data-flipper]"
    );
    this.upperNumberLayerHours = $(
      ".hours__container .number__layer.upper .layer[data-flipper]"
    );
    this.bottomNumberLayerHours = $(
      ".hours__container .number__layer.bottom .layer[data-flipper]"
    );
    this.upperNumberLayerDays = $(
      ".days__container .number__layer.upper .layer[data-flipper]"
    );
    this.bottomNumberLayerDays = $(
      ".days__container .number__layer.bottom .layer[data-flipper]"
    );
  }

  get days() {
    return Math.floor(this._days);
  }
  get hours() {
    return Math.floor(this._hours);
  }
  get minutes() {
    return Math.floor(this._minutes);
  }
  get seconds() {
    return Math.floor(this._seconds);
  }
  start() {
    this.renderTimerContainers();
  }
  renderTimerContainers() {
    // render container
    /*
        1- with every bottom animation ended trigger on second passed so can minutes track if seconds passed so 

      */

    $(this.upperNumberLayerSeconds).find(".time").text(this.seconds);
    $(this.bottomNumberLayerSeconds).find(".time").text(this.seconds);
    this.upperNumberLayerSeconds.on("animationstart", (evt) => {
      this.updateTime();
      $(evt.target).prev("span").find(".time").text(this.seconds);
    });
    this.upperNumberLayerSeconds.on("animationend", (evt) => {
      $(evt.target).find(".time").text(this.seconds);
      evt.target.classList.remove("flipAnimation");
      this.bottomNumberLayerSeconds.addClass("flipAnimation");
    });
    this.bottomNumberLayerSeconds.on("animationstart", (evt) => {
      $(evt.target).find(".time").text(this.seconds);
    });
    this.bottomNumberLayerSeconds.on("animationend", (evt) => {
      // continue to update and reload animation if value changed only
      // here made check every second if any of timer containers changed set animation class then remove it

      evt.target.classList.remove("flipAnimation");
      const timeElement = $(evt.target).prev("span").find(".time")[0];
      if (Number(timeElement.textContent) != this.seconds) {
        timeElement.textContent = this.seconds;
        this.upperNumberLayerSeconds.addClass("flipAnimation");
      }
      const timeMinutesElement = this.upperNumberLayerMinutes
        .prev("span")
        .find(".time")[0];
      if (Number(timeMinutesElement.textContent) != this.minutes) {
        timeMinutesElement.textContent = this.minutes;
        this.upperNumberLayerMinutes.addClass("flipAnimation");
      }
      const timeHoursElement = this.upperNumberLayerHours
        .prev("span")
        .find(".time")[0];
      if (Number(timeHoursElement.textContent) != this.hours) {
        timeHoursElement.textContent = this.hours;
        this.upperNumberLayerHours.addClass("flipAnimation");
      }
      const timeDaysElement = this.upperNumberLayerDays
        .prev("span")
        .find(".time")[0];
      if (Number(timeDaysElement.textContent) != this.days) {
        timeDaysElement.textContent = this.days;
        this.upperNumberLayerDays.addClass("flipAnimation");
      }
    });

    $(this.upperNumberLayerMinutes).find(".time").text(this.minutes);
    $(this.bottomNumberLayerMinutes).find(".time").text(this.minutes);
    this.upperNumberLayerMinutes.on("animationstart", (evt) => {
      this.updateTime();
      $(evt.target).prev("span").find(".time").text(this.minutes);
    });
    this.upperNumberLayerMinutes.on("animationend", (evt) => {
      $(evt.target).find(".time").text(this.minutes);
      evt.target.classList.remove("flipAnimation");
      this.bottomNumberLayerMinutes.addClass("flipAnimation");
    });
    this.bottomNumberLayerMinutes.on("animationstart", (evt) => {
      $(evt.target).find(".time").text(this.minutes);
    });
    this.bottomNumberLayerMinutes.on("animationend", (evt) => {
      evt.target.classList.remove("flipAnimation");
    });

    $(this.upperNumberLayerHours).find(".time").text(this.hours);
    $(this.bottomNumberLayerHours).find(".time").text(this.hours);
    this.upperNumberLayerHours.on("animationstart", (evt) => {
      this.updateTime();
      $(evt.target).prev("span").find(".time").text(this.hours);
    });
    this.upperNumberLayerHours.on("animationend", (evt) => {
      $(evt.target).find(".time").text(this.hours);
      evt.target.classList.remove("flipAnimation");
      this.bottomNumberLayerHours.addClass("flipAnimation");
    });
    this.bottomNumberLayerHours.on("animationstart", (evt) => {
      $(evt.target).find(".time").text(this.hours);
    });
    this.bottomNumberLayerHours.on("animationend", (evt) => {
      evt.target.classList.remove("flipAnimation");
    });

    $(this.upperNumberLayerDays).find(".time").text(this.days);
    $(this.bottomNumberLayerDays).find(".time").text(this.days);
    this.upperNumberLayerDays.on("animationstart", (evt) => {
      this.updateTime();
      $(evt.target).prev("span").find(".time").text(this.days);
    });
    this.upperNumberLayerDays.on("animationend", (evt) => {
      $(evt.target).find(".time").text(this.days);
      evt.target.classList.remove("flipAnimation");
      this.bottomNumberLayerDays.addClass("flipAnimation");
    });
    this.bottomNumberLayerDays.on("animationstart", (evt) => {
      $(evt.target).find(".time").text(this.days);
    });
    this.bottomNumberLayerDays.on("animationend", (evt) => {
      evt.target.classList.remove("flipAnimation");
    });
  }

  stop() {
    clearInterval(this.counter);
  }
  updateTime() {
    this.currentDate = new Date();
    this.elapsesTime = this.lunchingDate.getTime() - this.currentDate.getTime();
    this.updateDays();
    this.updateHours();
    this.updateMinutes();
    this.updateSeconds();
  }

  isTimeFinished() {
    return this.elapsesTime <= 0;
  }
  getFullTime() {
    return `days:${this.days} hours:${this.hours} minuets:${this.minutes} seconds:${this.seconds}`;
  }
  updateDays() {
    this._days = this.elapsesTime / (24 * 60 * 60 * 1000);
  }

  updateHours() {
    this._hours = (this._days % 1) * 24;
  }
  updateMinutes() {
    this._minutes = (this._hours % 1) * 60;
  }
  updateSeconds() {
    this._seconds = (this._minutes % 1) * 60;
  }
}
/*
        Lunching
  */
let countDown = new CountDown(new Date(2022, 10, 1));
countDown.start();
