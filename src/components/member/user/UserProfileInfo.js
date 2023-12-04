import React, {useEffect, useState} from 'react';
import Select from "../../select/BasicSelect";
import FormTextInput from "../../input/FormTextInput";
import {
    fetchBranchOptions,
    fetchHeadOfficeOptions,
    fetchTeamOptions,
    fetchPositionOptions
} from "../../../services/SignService";

function UserProfileInfo({
                             apiIntentions,
                             selectedBranch,
                             setSelectedBranch,
                             selectedTeam,
                             setSelectedTeam,
                             selectedHeadOffice,
                             setSelectedHeadOffice,
                             selectedPosition,
                             setSelectedPosition,
                             birth,
                             setBirth,
                             fullName,
                             setFullName,
                             defaultUserInfo
                         }) {
    const [branchOptions, setBranchOptions] = useState([]);
    const [headOfficeOptions, setHeadOfficeOptions] = useState([]);
    const [teamOptions, setTeamOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);

    // 지사 옵션 가져오기
    useEffect(() => {
        const getBranchOptions = async () => {
            try {
                const options = await fetchBranchOptions();
                setBranchOptions(options);
            } catch (error) {
                console.error('Error fetching branch options:', error);
            }
        };

        getBranchOptions();
    }, []);

    // 본부 옵션 가져오기
    useEffect(() => {
        const getHeadOfficeOptions = async () => {
            setSelectedHeadOffice('');
            if (selectedBranch) {
                try {
                    const options = await fetchHeadOfficeOptions(selectedBranch);
                    setHeadOfficeOptions(options);
                } catch (error) {
                    console.error('Error fetching head office options:', error);
                }
            } else {
                setHeadOfficeOptions([]);
            }
        };

        getHeadOfficeOptions();
    }, [selectedBranch]);

    // 팀 옵션 가져오기
    useEffect(() => {
        const getTeamOptions = async () => {
            setSelectedTeam('');
            if (selectedBranch && selectedHeadOffice) {
                try {
                    const options = await fetchTeamOptions(selectedBranch, selectedHeadOffice);
                    setTeamOptions(options);
                } catch (error) {
                    console.error('Error fetching team options:', error);
                }
            } else {
                setTeamOptions([]);
            }
        };

        getTeamOptions();
    }, [selectedBranch, selectedHeadOffice]);

    // 직급 옵션 가져오기
    useEffect(() => {
        const getPositionOptions = async () => {
            setSelectedPosition('');
            if (selectedBranch) {
                try {
                    const options = await fetchPositionOptions(selectedBranch);
                    setPositionOptions(options);
                } catch (error) {
                    console.error('Error fetching position options:', error);
                }
            } else {
                setPositionOptions([]);
            }
        };

        getPositionOptions();
    }, [selectedBranch]);

    useEffect(() => {
        if (defaultUserInfo) {
            setSelectedBranch(defaultUserInfo.branch);
            setSelectedHeadOffice(defaultUserInfo.department);
            setSelectedTeam(defaultUserInfo.team);
            setSelectedPosition(defaultUserInfo.position);
            setBirth(defaultUserInfo.birth);
            setFullName(defaultUserInfo.name);
        }
    }, [defaultUserInfo]);

    return (
        <>
            {apiIntentions !== "viewProfileinfo" && (
                <>
                    <Select
                        option={branchOptions}
                        title="Affiliation"
                        onSelectChange={setSelectedBranch}
                        className="sign_info_select"
                        value={selectedBranch}
                    />
                    <Select
                        option={headOfficeOptions}
                        title="Head Office"
                        onSelectChange={setSelectedHeadOffice}
                        className="sign_info_select"
                        value={selectedHeadOffice}
                    />
                    <Select
                        option={teamOptions}
                        title="Team"
                        onSelectChange={setSelectedTeam}
                        className="sign_info_select"
                        value={selectedTeam}
                    />
                    <Select
                        option={positionOptions}
                        title="Position"
                        onSelectChange={setSelectedPosition}
                        className="sign_info_select"
                        value={selectedPosition}
                    />
                </>
            )}
            <FormTextInput
                type="text"
                tagId="signup_birth"
                wrapperClassName="birthdayChange"
                className="form_text_input id_input"
                placeholder="ex) 19941228"
                label="Birth Date"
                maxLength={8}
                onChange={(e) => setBirth(e.target.value)}
                value={birth}
            />
            <FormTextInput
                type="text"
                tagId="signup_full_name"
                wrapperClassName={selectedBranch === "KR" ? "fullNameChangeKR" : "fullNameChangeUS"}
                className="form_text_input id_input"
                placeholder="First and Last Name"
                label="Full NAME"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
            />
        </>
    );
}

export default UserProfileInfo;