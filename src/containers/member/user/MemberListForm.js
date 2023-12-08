import MemberListTable from "../../../components/table/MemberListTable";
import React, {useEffect, useState} from "react";
import NoDataMsg from "../../../components/NoDataMsg";
import {
    fetchMemberListBranchOptions,
    fetchMemberListHeadOfficeOptions, fetchMemberListPositionOptions,
    MemberListRequest
} from "../../../services/MemberService";
import Select from "../../../components/select/BasicSelect";
import Button from "../../../components/button/Button";
import FormSearchInput from "../../../components/input/FormSearchInput";

export const MemberListForm = () => {
    const [data, setData] = useState([]);
    const [memberSearchFilter, setMemberSearchFilter] = useState('');
    const [additionalFilter, setAdditionalFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [option2, setOption2] = useState([]);
    const [search, setSearch] = useState("");
    const [searchLabel, setSearchLabel] = useState("");
    const [searchPlaceholder, setSearchPlaceholder] = useState("");
    const [branchOptions, setBranchOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);

    const option = [
        { key: 'ALL', value: 'all' },
        { key: 'Id', value: 'userId' },
        { key: 'Name', value: 'name' },
        { key: 'Branch', value: 'branch' },
        { key: 'Department', value: 'department' },
        { key: 'Position', value: 'position' },
    ];

    useEffect(() => {
        setAdditionalFilter('');
        if (memberSearchFilter) {
            updateAdditionalOptions(memberSearchFilter);
        } else {
            setOption2([]);
        }
    }, [memberSearchFilter]);

    useEffect(() => {
        const loadOptions = async () => {
            setBranchOptions(await fetchMemberListBranchOptions());
            setDepartmentOptions(await fetchMemberListHeadOfficeOptions());
            setPositionOptions(await fetchMemberListPositionOptions());
        };
        loadOptions();
    }, []);

    const updateAdditionalOptions = (filter) => {
        switch (filter) {
            case 'branch':
                setOption2(branchOptions.map(option => ({ key: option.key, value: option.value })));
                break;
            case 'department':
                setOption2(departmentOptions.map(option => ({ key: option.key, value: option.value })));
                break;
            case 'position':
                setOption2(positionOptions.map(option => ({ key: option.key, value: option.value })));
                break;
            default:
                setOption2([]);
                break;
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const shouldRenderTextInput = () => ['userId', 'name'].includes(memberSearchFilter);
    const shouldRenderAdditionalSelect = () => ['branch', 'department', 'position'].includes(memberSearchFilter);

    const handleMemberSearch = async (filterType, filterValue) => {
        try {
            let params = {
                userId: null,
                status: 1,
                name: null,
                branch: null,
                department: null,
                position: null,
                pagination: 30,
                page: 1,
            };

            if (filterType && filterValue) {
                params[filterType] = filterValue;
            }

            const responseData = await MemberListRequest(
                params.userId,
                params.status,
                params.name,
                params.branch,
                params.department,
                params.position,
                params.pagination,
                params.page,
            );

            setData(responseData.data);
            setLastPage(responseData.last_page);
        } catch (error) {
            console.error("Failed to fetch data with filters:", error);
        }
    };

    const handleSelectChange = async (key, value) => {
        setMemberSearchFilter(value);
        setAdditionalFilter('');
        handleMemberSearch();
    };

    const handleAdditionalFilterChange = (key, value) => {
        setAdditionalFilter(value);
        handleMemberSearch(memberSearchFilter, value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchFilterChange = (key, value) => {
        handleMemberSearch(memberSearchFilter, search);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchFilterChange();
        }
    };

    useEffect(() => {
        handleMemberSearch();
    }, []);

    useEffect(() => {
        switch (memberSearchFilter) {
            case 'userId':
                setSearchLabel('Search by ID');
                setSearchPlaceholder('ID');
                break;
            case 'name':
                setSearchLabel('Search by Name');
                setSearchPlaceholder('Name');
                break;
            default:
                setSearchLabel('');
                setSearchPlaceholder('');
                break;
        }
        setSearch('');
    }, [memberSearchFilter]);

    return (
        <>
            <div className="top_nav">
                <Select option={option} onSelectChange={handleSelectChange} title="All"/>

                {shouldRenderTextInput() && (
                    <div className="search_form_box">
                        <FormSearchInput
                            type="text"
                            wrapClassName="member"
                            className="search_input member"
                            placeholder={searchPlaceholder}
                            onChange={handleSearch}
                            onKeyPress={handleKeyPress}
                            id="search"
                            name="search"
                            label={searchLabel}
                            value={search}
                        />
                        <Button
                            type="button"
                            className="fetch_btn"
                            label="Request"
                            onClick={handleSearchFilterChange}>
                        </Button>
                    </div>
                )}
                {shouldRenderAdditionalSelect() && (
                    <Select
                        option={option2}
                        onSelectChange={handleAdditionalFilterChange}
                        value={additionalFilter}
                        title={additionalFilter || "Additional Filter"}
                        className="typeSelect"
                    />
                )}
            </div>
            {data && data.length > 0 ? (
                <>
                    <MemberListTable
                        data={data}
                        pageMode="memberList"
                        currentPage={currentPage}
                        lastPage={lastPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="signup_approval_no_data">
                    <NoDataMsg msg={"Member does not exist"}/>
                </div>
            )}
        </>
    );
};

export default MemberListForm;