export class StoriesViewer {
    constructor (params) {
        this.el = ''
        this.isMount = false
        this.init()
    }

    init() {
        this.open()
    }

    open() {
        if(!this.isMount) {
            this.mount()
        }
    }

    getMainTemplate() {
        return `
            <div class="stories-viewer__overlay">
                <div class="stories-viewer__wrap">
                    <div class="stories-viewer__slider" data-items="">
                    slide <br>
                    slide <br>
                    slide <br>
                    slide <br>
                    slide <br>
                    slide <br>
                    slide <br>
                    </div>
                </div>
            </div>
        `;
    }

    mount() {
        let el = document.createElement('div')
        el.classList.add('stories-viewer')
        el.innerHTML = this.getMainTemplate()
        document.body.append(el)
        this.isMount = true;
    }
}