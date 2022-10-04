import a from './Account.module.css';
import React, { useEffect, useState } from 'react';

function Account(params) {
    const [user, setUser] = useState({
        name:'',
        password:'',
        group:'',
        tel:'',
        username:'',
        status:'',
        variant:'',
    });
    const [isLogin, setData] = useState([]);
    const [nameValue, setnameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [groupValue, setGroup] = useState('');
    const [variantValue, setVariant] = useState('');
    const [statusValue, setStatus] = useState('');
    const [telValue, setTel] = useState('');
    const [emailValue, setEmail] = useState('');
    const handleNameInputChanges = (e) => {
        setnameValue(e.target.value);
    };
    const handlePasswordInputChanges = (e) => {
        setPasswordValue(e.target.value);
    };
    const handleGroupInputChanges = (e) => {
        setGroup(e.target.value);
    };
    const handleVariantInputChanges = (e) => {
        setVariant(e.target.value);
    };
    const handleTelInputChanges = (e) => {
        setTel(e.target.value);
    };
    const handleStatusInputChanges = (e) => {
        setStatus(e.target.value);
    };
    const handleEmailInputChanges = (e) => {
        setEmail(e.target.value);
    };
    const updateProfile = () => {

        fetch('http://192.168.56.1:3001/change', {
            method: 'post',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                name: document.getElementById('name').value,
                group: document.getElementById('group').value,
                variant: document.getElementById('variant').value,
                tel: document.getElementById('tel').value,
                status: document.getElementById('status').value,
                photo: '',
                login: isLogin,
            }),
        });
    };
    useEffect(() => {
        fetch('http://192.168.56.1:3001/', {
            withCredentials: true,
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res.user.name);
            });

        fetch('http://192.168.56.1:3001/profile', {
            withCredentials: true,
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, [params.user, isLogin]);

    return (
        <div className={a.Account}>
            <div className={a.profile}>
                <div className={a['profile-main']}>
                    <div className={a['profile-avatar']}>
                        <img
                            className={a['profile-avatar__img']}
                            alt={user.photo}
                        />
                    </div>
                    <div className={a['profile-name']}>
                        <span className={a.username}>{user.email}</span>
                    </div>
                </div>

                <div className={a['profile-description']}>
                    <div className={a['user-description']}>
                        <span>Про себе:</span>
                        <ul>
                            <li>
                                    <label>
                                        Логін:{' '}
                                        <input
                                            onChange={handleEmailInputChanges}
                                            id="email"
                                            value={emailValue || user.username}
                                        ></input>
                                    </label>
             
                            </li>
                            <li>
                                    <label>
                                        Імя:{' '}
                                        <input
                                            onChange={handleNameInputChanges}
                                            id="name"
                                            value={nameValue || user.name}
                                        ></input>
                                    </label>
             
                            </li>
                            <li>
                                    <label>
                                        Група:{' '}
                                        <input
                                            onChange={handleGroupInputChanges}
                                            id="group"
                                            value={
                                                groupValue || user.group
                                            }
                                        ></input>
                                    </label>
                            </li>
                            <li>
                                    <label>
                                        Пароль:{' '}
                                        <input
                                            onChange={handlePasswordInputChanges}
                                            id="password"
                                            value={
                                                passwordValue || user.password
                                            }
                                        ></input>
                                    </label>
                            </li>
                            <li>
                                    <label>
                                        Варіант:{' '}
                                        <input
                                            onChange={handleVariantInputChanges}
                                            id="variant"
                                            value={
                                                variantValue || user.variant
                                            }
                                        ></input>
                                    </label>
                            </li>
                            <li>
                                    <label>
                                        Телефон:{' '}
                                        <input
                                            onChange={handleTelInputChanges}
                                            id="tel"
                                            value={
                                                telValue || user.tel
                                            }
                                        ></input>
                                    </label>
                            </li>
                            <li>
                                    <label>
                                        Статус:{' '}
                                        <input
                                            onChange={handleStatusInputChanges}
                                            id="status"
                                            value={
                                                statusValue || user.status
                                            }
                                        ></input>
                                    </label>
                            </li>
                            
                        </ul>
                        <button className={a['changebtn']} onClick={updateProfile}>
                                Редагувати профіль
                            </button>
                    </div>
                            

                </div>
            </div>
        </div>
    );
}

export default Account;
