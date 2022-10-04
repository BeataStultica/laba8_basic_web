export default function validateInfo(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.username = 'Імя не має бути пусте';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }

    if (!values.email) {
        errors.email = 'Введіть емейл';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Емейл некоректний';
    }
    if (!values.password) {
        errors.password = 'Введіть пароль';
    } else if (values.password.length < 6) {
        errors.password = 'Пароль має бути довший за 6 символів';
    }

    if (!values.password2) {
        errors.password2 = 'Введіть пароль ще раз';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Паролі не співпадають';
    }
    return errors;
}
