document.addEventListener('DOMContentLoaded', function() {
    // Функция для получения числового значения
    function getNumberValue(input) {
        const value = parseInt(input.value);
        return isNaN(value) ? 0 : Math.max(0, value);
    }

    // Функция для обновления значения
    function updateInputValue(input, newValue) {
        input.value = Math.max(0, newValue); // Не меньше 0
        // Триггерим события
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Кнопка увеличения
    document.querySelectorAll('.count__up').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const currentValue = getNumberValue(input);
            updateInputValue(input, currentValue + 1);
        });
    });

    // Кнопка уменьшения
    document.querySelectorAll('.count__down').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const currentValue = getNumberValue(input);
            updateInputValue(input, currentValue - 1);
        });
    });

    // Обработка ручного ввода
    document.querySelectorAll('.form__counts input[type="number"]').forEach(input => {
        // При потере фокуса нормализуем значение
        input.addEventListener('blur', function() {
            const value = getNumberValue(this);
            this.value = value;
        });

        // При загрузке страницы нормализуем начальные значения
        const initialValue = getNumberValue(input);
        input.value = initialValue;
    });
});
