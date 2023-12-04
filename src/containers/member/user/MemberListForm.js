import MemberListTable from "../../../components/table/MemberListTable";
import React, {useEffect, useState} from "react";
import NoDataMsg from "../../../components/NoDataMsg";
import {MemberListRequest} from "../../../services/MemberService";
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

    const fetchData = async (page = 1) => {
        try {
            const responseData = await MemberListRequest(null, 1, null, null, null, null, 20, page);
            setData(responseData.data);
            setLastPage(responseData.last_page);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const updateAdditionalOptions = (filter) => {
        const optionsMapping = {
            branch: [
                { key: 'KR', value: 'KR' },
                { key: 'US', value: 'US' },
            ],
            department: [
                {key: "경영지원 본부", value: "경영지원 본부"},
                {key: "신사업 본부", value: "신사업 본부"},
                {key: "마케팅 본부", value: "마케팅 본부"},
                {key: "BM 본부", value: "BM 본부"},
                {key: "PA 사업 본부", value: "PA 사업 본부"},
                {key: "데이터 본부", value: "데이터 본부"},
                {key: "CA 사업 본부", value: "CA 사업 본부"},
                {key: "National Retail 본부", value: "National Retail 본부"},
                {key: "IT 사업 본부", value: "IT 사업 본부"},
                {key: "물류 사업 본부", value: "물류 사업 본부"},
                {key: "글로벌 매니지먼트 본부", value: "글로벌 매니지먼트 본부"},
            ],
            position: [
                {key: "대표", value: "대표"},
                {key: "부대표", value: "부대표"},
                {key: "이사", value: "이사"},
                {key: "부장", value: "부장"},
                {key: "차장", value: "차장"},
                {key: "과장", value: "과장"},
                {key: "대리", value: "대리"},
                {key: "사원", value: "사원"},
                {key: "인턴", value: "인턴"}
            ],
            default: [],
        };
        setOption2(optionsMapping[filter] || []);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchData(newPage);
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
        setAdditionalFilter("");
        setMemberSearchFilter(value);
        updateAdditionalOptions(value);
        setSearch("");
        if (value === 'all') {
            fetchData(1);
        } else {
            handleMemberSearch(value, additionalFilter);
        }
    };

    const handleAdditionalFilterChange = (key, value) => {
        setAdditionalFilter(value);
        handleMemberSearch(memberSearchFilter, value);
    };

    useEffect(() => {
        if (additionalFilter) {
            handleMemberSearch(memberSearchFilter, additionalFilter);
        }
    }, [additionalFilter, memberSearchFilter]);

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