import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({onDateChange, initialStartDate, initialEndDate}) => {
    const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
    const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = [...Array(3)].map((_, i) => currentYear - i);

    const changeSelectedYear = (year, changeYear) => {
        setShowYearPicker(false);
        changeYear(year);
    };

    const handleStartDateChange = (date) => {
        if (date) {
            setStartDate(date);
            if (endDate) {
                onDateChange(date, endDate);
            }
        }
    };

    const handleEndDateChange = (date) => {
        if (date) {
            setEndDate(date);
            if (startDate) {
                onDateChange(startDate, date);
            }
        }
    };

    const minDate = new Date(2023, 0, 1);
    const maxDate = new Date();

    return (
        <div className="date_picker_wrap">
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
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
                                        changeSelectedYear(year, changeYear);
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
                            <button type="button" className="datepicker_arrow datepicker_prev" onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}></button>
                            <button type="button" className="datepicker_arrow datepicker_next" onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}></button>
                        </div>
                    </div>
                )}
                placeholderText="Start Date"
            />

            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
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
                                        changeSelectedYear(year, changeYear);
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
                            <button type="button" className="datepicker_arrow datepicker_prev" onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}></button>
                            <button type="button" className="datepicker_arrow datepicker_next" onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}></button>
                        </div>
                    </div>
                )}
                placeholderText="End Date"
            />
        </div>
    );
};

export default DateRangePicker;