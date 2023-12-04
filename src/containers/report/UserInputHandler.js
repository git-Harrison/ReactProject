import Select from "../../components/select/BasicSelect";
import DateRangePicker from "../../components/select/DateSelect";
import FetchButton from "../../components/button/FetchBtn";
import userInputNavbar from "../order/UserInputNavbar";

function UserInputHandler(props) {
    const {
        pageMode,
        selectChannel,
        channelOptions,
        storeSelect,
        typeOptions,
        monthOptions,
        timeZoneOptions,
        handleChannelChange,
        handleTypeChange,
        handleDateChange,
        handleMonthChange,
        handleTimeZoneChange,
        fetchData,
        initialSelect
    } = props;

    return (
        <div className="top_nav">
            {pageMode !== "monthlySeller" && pageMode !== "dailySeller" ? (
                <Select
                    option={channelOptions}
                    title="Channel"
                    onSelectChange={handleChannelChange}
                />
            ) : null}
            {storeSelect}
            {pageMode === "excel" ? (
                <>
                    <Select
                        option={typeOptions}
                        title="Type"
                        onSelectChange={handleTypeChange}
                        className="typeSelect"
                    />
                    <Select
                        option={monthOptions}
                        title="Month"
                        onSelectChange={handleMonthChange}
                    />
                    {selectChannel === "Amazon" && (
                        <Select
                            option={timeZoneOptions}
                            title="Data Type"
                            onSelectChange={handleTimeZoneChange}
                        />
                    )}
                </>
            ) : null}
            {pageMode === "daily" || pageMode === "dailySeller" || pageMode === "dailyAmount" ? (
                <DateRangePicker onDateChange={handleDateChange} initialSelect={initialSelect}/>
            ) : null}
            <FetchButton fetchData={fetchData}/>
        </div>
    );
}

export default UserInputHandler;