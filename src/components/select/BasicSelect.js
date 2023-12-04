import React, {useState, useEffect, useRef} from 'react';

function Select(props) {
    const [isClicked, setIsClicked] = useState(false); // select box 활성화 여부
    const [selectedItem, setSelectedItem] = useState(props.value); // 선택된 항목의 키 값
    const [selectedValue, setSelectedValue] = useState(props.title); // 선택된 항목의 텍스트 값
    const selectRef = useRef(null);

    const className = isClicked ? 'active' : ''; // select box의 클래스 결정 변수

    const handleSelectClick = () => {
        setIsClicked(prevState => !prevState); // select box의 활성화 여부
    };

    const handleSelectItemClick = (key, value) => { // 선택된 항목을 업데이트 하고, 선택 변경을 알림
        setSelectedItem(key);
        const updatedValue = key;
        setSelectedValue(updatedValue);
        props.onSelectChange(key, value, updatedValue);
    };

    const handleClickOutside = (event) => { // select box 요소가 존재하고, 클릭된 요소가 select box 외부에 속해있는지 확인
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsClicked(false);
        }
    };

    useEffect(() => {
        setSelectedItem(props.value);
        setSelectedValue(props.title);
    }, [props.value]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`form_select ${className} ${props.className}`} onClick={handleSelectClick} ref={selectRef}>
            {selectedValue}
            <div className="form_select_box">
                {props.option.map((item) => (
                    <div
                        key={item.key}
                        className={`select_item ${selectedItem === item.key && 'selected'}`}
                        onClick={() => handleSelectItemClick(item.key, item.value)}
                    >
                        {item.key}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Select;