import React, { useState } from 'react';

import r from './Registration.module.css';
import Signup from './Signup/Signup';

const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }

    return (
        <>
            <div className={r['form-container']}>
                {!isSubmitted ? (
                    <Signup submitForm={submitForm} />
                ) : (
                    <h1>Регістрація успішна</h1>
                )}
            </div>
        </>
    );
};
export default Registration;
