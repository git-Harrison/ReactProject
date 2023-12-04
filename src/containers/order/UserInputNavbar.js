import StoreSelect from "../../components/select/StoreSelect";
import Select from "../../components/select/BasicSelect";
import DateRangePicker from "../../components/select/DateSelect";
import Button from "../../components/button/Button";

const UserInputNavbar = (props) => {
    const {selectedState, loading, handleFetchClick} = props;
    const sellerOptions = [
        {key: "ALL", value: "all"},
        {key: "FBA", value: "fba"},
        {key: "FBM", value: "fbm"},
    ];

    return (
        <div className="top_nav">
            <StoreSelect onSelectChange={selectedState.handleStoreChange} pageMode="orderList" apiUrl={selectedState.apiUrl}/>
            <Select
                option={sellerOptions}
                title="Seller"
                onSelectChange={selectedState.handleSellerChange}
            />
            <DateRangePicker onDateChange={selectedState.handleDateChange}/>
            <Button
                type="button"
                className="fetch_btn"
                label="Request"
                onClick={handleFetchClick}
                disabled={loading}>
            </Button>
        </div>
    );
}

export default UserInputNavbar;