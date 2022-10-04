import React from 'react';
import validate from './Signup/validateInfo';
import useForm from './Signup/useForm';
import a from './Authorization.module.css';

const Authorization = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    return (
        <div className={a.Authorization}>
            <div className={a['form-container']}>
                <div className={a['form-content']}>
                    <form onSubmit={handleSubmit} className={a.form} noValidate>
                        <div className={a['form-inputs']}>
                            <label className={a['form-label']}>Email</label>
                            <input
                                className={a['form-input']}
                                type="text"
                                name="username"
                                placeholder="Введіть email"
                                value={values.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p>{errors.username}</p>}
                        </div>
                        <div className={a['form-inputs']}>
                            <label className={a['form-label']}>Пароль</label>
                            <input
                                className={a['form-input']}
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        <button className={a['form-input-btn']} type="submit">
                            Увійти
                        </button>
                        <span className={a['form-input-login']}>
                            Немає аккаунту? Реєстрація{' '}
                            <a href="/registration">тут</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Authorization;
