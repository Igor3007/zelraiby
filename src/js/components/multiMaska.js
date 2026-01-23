import { MaskInput } from "maska"

export class multiMaska {

    constructor(container) {
        this.container = container || document
        this.mask = {
            'RU': '+7(X##)###-##-##',
            'RU8': '8(X##)###-##-##',
        }
        this.active = 'RU'
        this.init()
    }

    init() {
        this.container.querySelectorAll('[type="tel"]').forEach(input => {

            console.log(input)

            input['maska'] = new MaskInput(input, {
                mask: (value) => {
                    switch (value.substring(0, 2)) {
                        case '7':
                        case '+':
                            this.active = 'RU';
                            break;

                        case '8':
                            this.active = 'RU8';
                            break;
                    }

                    input.setAttribute('data-mask', this.mask[this.active])
                    return this.mask[this.active]
                },

                tokens: {
                    'X': {
                        pattern: /[39]/, // разрешает только 3 или 9
                        multiple: false // позволяет несколько символов
                    }
                }
            })

            input.addEventListener('blur', (e) => {
                if (input.hasAttribute('data-mask')) {
                    const {
                        length
                    } = input.getAttribute('data-mask')
                    if (input.value.length < length)
                        input.value = ''
                }
            })

        })
    }
}
