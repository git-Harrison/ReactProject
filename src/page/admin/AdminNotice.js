import React from 'react';
import FormSearchInput from "../../components/input/FormSearchInput";


const AdminNotice = () => {

    const handleSearch = (e) => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className="contents_box">
                공지사항
                <FormSearchInput
                    type="text"
                    className="search_input"
                    placeholder="공지사항 입력"
                    onChange={handleSearch}
                    id="search"
                    name="search"
                    label="공지사항 입력"
                />
            </div>


            <input type="text" id="od_last_name_1"/>
        </>
    );
}

export default AdminNotice;