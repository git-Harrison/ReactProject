import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import Select from "../../components/select/BasicSelect";
import {Brands} from "../../services/ComponentService";

function StoreSelect(props) {
    const {onSelectChange, pageMode, selectedChannel} = props;
    const [store, setstore] = useState([]); // 브랜드 데이터를 저장할 상태 변수

    const fetchBrands = async () => {
        try {
            const responseData = await Brands(selectedChannel);
            const processedData = responseData.map(brandName => ({
                key: brandName,
                value: brandName,
            }));

            if (pageMode === "excel") {
                processedData.unshift({
                    key: "Summary",
                    value: "summary",
                });
            }
            
            processedData.unshift({
                key: "Store Total",
                value: "all",
            });
            if (pageMode !== "excel" && pageMode !== "monthlySeller") {
                processedData.unshift({
                    key: "Channel Total",
                    value: "null",
                });
            }
            setstore(processedData);
        } catch (error) {
            console.error('API 에러 :', error);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, [selectedChannel]);

    const handleStoreChange = (selectedId, selectedValue) => {
        onSelectChange(selectedId, selectedValue); // 브랜드 선택이 변경되었을 때 선택된 값 전달
    };

    return (
        <Select option={store} title="Store" className="store_select" onSelectChange={handleStoreChange}/>
    );
}

StoreSelect.propTypes = {
    onSelectChange: PropTypes.func.isRequired,
    pageMode: PropTypes.string
};

export default StoreSelect;