class RangeSlider {
    constructor(options = {}) {
        this.minInput = document.getElementById('minInput');
        this.maxInput = document.getElementById('maxInput');
        this.thumbLeft = document.getElementById('thumbLeft');
        this.thumbRight = document.getElementById('thumbRight');
        this.rangeTrack = document.getElementById('rangeTrack');
        this.sliderContainer = document.querySelector('.range-slider__container');

        this.min = options.min || 0;
        this.max = options.max || 2000;
        this.step = options.step || 1;
        this.format = options.format || 'ru-RU';

        this.currentMin = this.parseNumber(this.minInput.value) || this.min;
        this.currentMax = this.parseNumber(this.maxInput.value) || this.max;

        this.isDragging = false;
        this.activeThumb = null;

        this.minPos = 0;
        this.maxPos = 0;

        this.init();
    }

    init() {
        this.updateInputs();
        this.updateSliderPosition();
        this.bindEvents();
    }

    bindEvents() {
        this.thumbLeft.addEventListener('mousedown', (e) => this.startDrag(e, 'min'));
        this.thumbRight.addEventListener('mousedown', (e) => this.startDrag(e, 'max'));

        this.thumbLeft.addEventListener('touchstart', (e) => this.startDrag(e, 'min'));
        this.thumbRight.addEventListener('touchstart', (e) => this.startDrag(e, 'max'));

        this.minInput.addEventListener('input', (e) => this.handleInput(e, 'min'));
        this.maxInput.addEventListener('input', (e) => this.handleInput(e, 'max'));

        this.minInput.addEventListener('blur', (e) => this.handleBlur(e, 'min'));
        this.maxInput.addEventListener('blur', (e) => this.handleBlur(e, 'max'));

        this.thumbLeft.addEventListener('keydown', (e) => this.handleKeydown(e, 'min'));
        this.thumbRight.addEventListener('keydown', (e) => this.handleKeydown(e, 'max'));

        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        document.addEventListener('touchend', () => this.stopDrag());

        window.addEventListener('resize', () => {
            this.updateMaxPosition();
        });
    }

    updateMaxPosition() {
        if (this.sliderContainer) {
            const rect = this.sliderContainer.getBoundingClientRect();
            this.minPos = 0;
            this.maxPos = rect.width;
        }
    }

    startDrag(e, type) {
        e.preventDefault();
        this.isDragging = true;
        this.activeThumb = type;
        this.updateMaxPosition();

        if (type === 'min') {
            this.thumbLeft.classList.add('active');
        } else {
            this.thumbRight.classList.add('active');
        }
    }

    drag(e) {
        if (!this.isDragging || !this.activeThumb) return;

        e.preventDefault();

        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const rect = this.sliderContainer.getBoundingClientRect();

        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = x / rect.width;

        let value = this.min + (this.max - this.min) * percentage;
        value = Math.round(value / this.step) * this.step;

        if (this.activeThumb === 'min') {
            value = Math.min(value, this.currentMax - this.step);
            value = Math.max(value, this.min);
            this.currentMin = value;
            this.minInput.value = this.formatNumber(value);
        } else {
            value = Math.max(value, this.currentMin + this.step);
            value = Math.min(value, this.max);
            this.currentMax = value;
            this.maxInput.value = this.formatNumber(value);
        }

        this.updateSliderPosition();
    }

    stopDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.activeThumb = null;
            this.thumbLeft.classList.remove('active');
            this.thumbRight.classList.remove('active');
        }
    }

    handleInput(e, type) {
        const value = this.parseNumber(e.target.value);

        if (!isNaN(value)) {
            if (type === 'min') {
                this.currentMin = Math.max(this.min, Math.min(value, this.currentMax - this.step));
            } else {
                this.currentMax = Math.min(this.max, Math.max(value, this.currentMin + this.step));
            }

            this.updateInputs();
            this.updateSliderPosition();
        }
    }

    handleBlur(e, type) {
        let value = this.parseNumber(e.target.value);

        if (isNaN(value)) {
            value = type === 'min' ? this.currentMin : this.currentMax;
        }

        if (type === 'min') {
            this.currentMin = Math.max(this.min, Math.min(value, this.currentMax - this.step));
            this.currentMin = Math.round(this.currentMin / this.step) * this.step;
        } else {
            this.currentMax = Math.min(this.max, Math.max(value, this.currentMin + this.step));
            this.currentMax = Math.round(this.currentMax / this.step) * this.step;
        }

        this.updateInputs();
        this.updateSliderPosition();
    }

    handleKeydown(e, type) {
        const step = this.step;

        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                if (type === 'min') {
                    this.currentMin = Math.max(this.min, this.currentMin - step);
                } else {
                    this.currentMax = Math.max(this.currentMin + step, this.currentMax - step);
                }
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                if (type === 'min') {
                    this.currentMin = Math.min(this.currentMax - step, this.currentMin + step);
                } else {
                    this.currentMax = Math.min(this.max, this.currentMax + step);
                }
                break;
            case 'Home':
                e.preventDefault();
                if (type === 'min') {
                    this.currentMin = this.min;
                } else {
                    this.currentMax = this.currentMin + step;
                }
                break;
            case 'End':
                e.preventDefault();
                if (type === 'min') {
                    this.currentMin = this.currentMax - step;
                } else {
                    this.currentMax = this.max;
                }
                break;
        }

        this.updateInputs();
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const minPercent = ((this.currentMin - this.min) / (this.max - this.min)) * 100;
        const maxPercent = ((this.currentMax - this.min) / (this.max - this.min)) * 100;

        const boundedMinPercent = Math.max(0, Math.min(minPercent, 100));
        const boundedMaxPercent = Math.max(0, Math.min(maxPercent, 100));

        this.thumbLeft.style.left = boundedMinPercent + '%';
        this.thumbRight.style.left = boundedMaxPercent + '%';

        this.rangeTrack.style.left = boundedMinPercent + '%';
        this.rangeTrack.style.width = (boundedMaxPercent - boundedMinPercent) + '%';

        this.thumbLeft.setAttribute('aria-valuenow', this.currentMin);
        this.thumbRight.setAttribute('aria-valuenow', this.currentMax);
        this.thumbLeft.setAttribute('aria-valuemin', this.min);
        this.thumbLeft.setAttribute('aria-valuemax', this.currentMax);
        this.thumbRight.setAttribute('aria-valuemin', this.currentMin);
        this.thumbRight.setAttribute('aria-valuemax', this.max);
    }

    updateInputs() {
        this.minInput.value = this.formatNumber(this.currentMin);
        this.maxInput.value = this.formatNumber(this.currentMax);
    }

    formatNumber(num) {
        return num.toLocaleString(this.format, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).replace(/,/g, ',');
    }

    parseNumber(str) {
        if (!str) return NaN;
        const cleanStr = str.toString().replace(/[^\d,.-]/g, '');
        const numStr = cleanStr.replace(/,/g, '.');
        const num = parseFloat(numStr);
        return isNaN(num) ? NaN : num;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new RangeSlider({
        min: 0,
        max: 2000,
        step: 1,
        format: 'ru-RU'
    });
});
