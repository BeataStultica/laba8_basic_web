import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import r from '../Registration.module.css';

const Signup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );

    return (
        <div className={r['form-content']}>
            <form onSubmit={handleSubmit} className={r.form} noValidate>
                <h1>
                    Реєстрація нового користувача
                </h1>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Email(логін)</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="email"
                        placeholder="askja@aaa.com"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Імя</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="name"
                        placeholder="Введіть імя"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Група</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="group"
                        placeholder="ІІ-00"
                        value={values.group}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Варіант</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="variant"
                        placeholder="варіант"
                        value={values.variant}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Телефон</label>
                    <input
                        className={r['form-input']}
                        type="text"
                        name="tel"
                        placeholder="+380000000"
                        value={values.tel}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Введіть пароль</label>
                    <input
                        className={r['form-input']}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className={r['form-inputs']}>
                    <label className={r['form-label']}>Повторіть пароль</label>
                    <input
                        className={r['form-input']}
                        type="password"
                        name="password2"
                        placeholder="Confirm your password"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <button className={r['form-input-btn']} type="submit">
                    Зареєструватися
                </button>
                <span className={r['form-input-login']}>
                    Вже є аккаунт? Увійти <a href="/">тут</a>
                </span>
            </form>
        </div>
    );
};

export default Signup;
