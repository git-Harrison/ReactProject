import MemberListTable from "../../../components/table/MemberListTable";
import React, {useEffect, useState} from "react";
import BasicModal from "../../../components/modal/BasicModal";
import NoDataMsg from "../../../components/NoDataMsg";
import {MemberConfirm, MemberListRequest} from "../../../services/MemberService";
import {DeCrypt} from "../../../services/crypto/CryptoService";

export const SignupApprovalForm = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [modalClick, setModalClick] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [pageMode, setPageMode] = useState("");
    const userInfoId = DeCrypt(localStorage.getItem('userInfoId'));
    const userInfoDepartment = DeCrypt(localStorage.getItem('userInfoDepartment'));
    const userInfoGrant= localStorage.getItem('userInfoGrant');

    const fetchData = async () => {
        try {
            let params = {
                userId: null,
                status: 3,
                name: null,
                branch: null,
                department: userInfoGrant === '1' ? null : userInfoDepartment,
                position: null
            };

            // MemberListRequest 함수에 params 객체를 분해하여 전달합니다.
            const responseData = await MemberListRequest(
                params.userId,
                params.status,
                params.name,
                params.branch,
                params.department,
                params.position
            );

            setData(responseData.data);
        } catch (error) {
            console.log(error);
        }
    };

    const processApprovalOrRejection = async (selectedId, status) => {
        try {
            const responseData = await MemberConfirm(selectedId, status, userInfoId, 3);

            if (responseData.status === 200) {
                setModalClick(false);
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprovalBtnClick = (id) => {
        setSelectedId(id);
        setModalTitle("Approve");
        setModalMessage(
            <>
                Sure to approve <strong>{id}</strong>?
            </>
        );
        setModalClick(true);
    }

    const handleRejectBtnClick = (id) => {
        setSelectedId(id);
        setModalTitle("Reject");
        setModalMessage(
            <>
                Sure to reject <strong>{id}</strong>?
            </>
        );
        setModalClick(true);
    }

    const modalClose = () => {
        setModalClick(false);
    }

    const handleApprovalClick = () => {
        if (selectedId !== null) {
            processApprovalOrRejection(selectedId, 1);
        }
    }

    const handleRejectClick = () => {
        if (selectedId !== null) {
            processApprovalOrRejection(selectedId, 4);
        }
    }

    return (
        <>
            {data && data.length > 0 ? (
                <>
                    <BasicModal
                        modalTitle={modalTitle}
                        isOpen={modalClick}
                        close={modalClose}
                        modalText={modalMessage}
                        approveBtn={handleApprovalClick}
                        rejectBtn={handleRejectClick}
                    />
                    <MemberListTable
                        data={data}
                        handleApprovalBtnClick={handleApprovalBtnClick}
                        handleRejectBtnClick={handleRejectBtnClick}
                        pageMode="list"
                    />
                </>
            ) : (
                <div className="signup_approval_no_data">
                    <NoDataMsg msg={"No members awaiting approval"}/>
                </div>
            )}
        </>
    );
};

export default SignupApprovalForm;