import { useState, useEffect } from 'react';
const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        group: '',
        variant: '',
        tel: '',
        password: '',
        password2: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        console.log('--------');
        e.preventDefault();
        if (window.location.pathname !== '/registration') {
            fetch('http://192.168.56.1:3001/login', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'include',
                body: JSON.stringify({
                    email: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then(function (response, request) {
                    console.log(response);
                    console.log('-=')
                    if (response.user.name === false) {
                        alert('Неправильний логін або пароль');
                    } else {
                        console.log('ok')
                        window.location.pathname = '/'
                    }
                });
        } else {
            fetch('http://192.168.56.1:3001/register', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'include',
                body: JSON.stringify({
                    email: e.target.email.value,
                    name: e.target.name.value,
                    tel: e.target.tel.value,
                    group: e.target.group.value,
                    variant: e.target.variant.value,
                    password: e.target.password.value,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    if (response.user.name === false) {
                        alert('Користувач вже існує');
                    } else {
                        setIsSubmitting(true);
                        e.preventDefault();
                        setErrors(validate(values));
                        window.location.pathname = '/'
                    }
                });
        }

        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [callback, errors, isSubmitting]);

    return { handleChange, handleSubmit, values, errors };
};

export default useForm;
