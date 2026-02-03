document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.count__up').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.count__down').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            if (value > 0) {
                input.value = value - 1;
            }
        });
    });
});
