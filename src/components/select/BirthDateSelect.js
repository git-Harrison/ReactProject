// BirthDateSelect.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BirthDateSelect = ({ onDateChange }) => {
    const [birthDate, setBirthDate] = useState(null);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

    const handleBirthDateChange = (date) => {
        if (date) {
            setBirthDate(date);
            onDateChange(date);
        }
    };

    const maxDate = new Date();

    return (
        <div className="date_picker_wrap">
            <DatePicker
                selected={birthDate}
                onChange={handleBirthDateChange}
                maxDate={maxDate}
                renderCustomHeader={({
                                         date,
                                         changeYear,
                                         changeMonth,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled
                                     }) => (
                    <div className="react-datepicker_header">
                        {showYearPicker ? (
                            <div className="year-selection">
                                {years.map((year) => (
                                    <div key={year} onClick={() => {
                                        changeYear(year);
                                        setShowYearPicker(false);
                                    }}>
                                        {year}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div className="year_head" onClick={() => setShowYearPicker(!showYearPicker)}>
                            {date.getFullYear()}
                        </div>
                        <div className="date_month">{date.toLocaleString('en', {month: 'long'})}</div>
                        <div className="datepicker_arrow_wrap">
                            <button type="button" className="datepicker_arrow datepicker_prev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}></button>
                            <button type="button" className="datepicker_arrow datepicker_next" onClick={increaseMonth} disabled={nextMonthButtonDisabled}></button>
                        </div>
                    </div>
                )}
                placeholderText="Select your birth date"
                showYearDropdown
                dropdownMode="select"
            />
        </div>
    );
};

export default BirthDateSelect;