import React, { useState, useEffect } from 'react';

const OfficeHours = ({ country, offset }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
            const localTime = new Date(utc + (3600000 * offset)).toLocaleTimeString();
            setTime(localTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [offset]);

    return (
        <li>
            {country}: {time}
        </li>
    );
};

export default OfficeHours;