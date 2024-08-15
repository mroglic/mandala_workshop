class SliderControl {

    constructor(min, max, defaultValue, x, y, width, DA) {
        this.DA = DA;
        // Retrieve the saved value from local storage or use the default value
        this.sliderName = 'sliderValue_' + DA.sketchAddress;
        this.currentValue = localStorage.getItem(this.sliderName) ? parseInt(localStorage.getItem(this.sliderName)) : defaultValue;
        this.slider = createSlider(min, max, this.currentValue);
        this.slider.position(x, y);
        this.slider.style('width', width);
        this.slider.input(() => this.sliderChanged());

        // add label
        this.label = createDiv('Placeholders');
        this.label.position(x, y + 30);
        // set font type to mono
        this.label.style('font-family', 'monospace');
        this.label.html('Patterns around 1 circle: ' + this.currentValue);
    }

    sliderChanged() {
        // Redraw everything when the slider changes
        this.currentValue = this.slider.value();
        localStorage.setItem(this.sliderName, this.currentValue); // Save to local storage
        this.DA.sendNumberOfPlaceholders(this.currentValue);

        // update label
        this.label.html('Placeholders: ' + this.currentValue);
    }

    getValue() {
        return this.currentValue;
    }


}
