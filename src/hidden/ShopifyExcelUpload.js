import React, {useState, useEffect} from "react";
import Button from "../components/button/Button";
import Select from "../components/select/BasicSelect";
import {ShopifyExcelList, ShopifyExcelUploadRequest} from "../services/ReportService";
import button from "../components/button/Button";

export const ShopifyExcelUpload = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(`${new Date().getFullYear()}`);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [modalErrorType, setModalErrorType] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [uploadedFileNames, setUploadedFileNames] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");

    const option = [
        {key: '2023', value: '2023'},
        {key: '2024', value: '2024'},
    ];


    const handleSelectChange = (value) => {
        setYear(value);
    }

    const fetchData = async (yearMonth) => {
        try {
            const responseData = await ShopifyExcelList(yearMonth);

            if (!responseData) throw new Error("Request error");

            setData(responseData);
            setUploadedFileNames(new Array(responseData.length).fill(""));
        } catch (error) {
            console.error(error);
        }
    };

    const handleMonthBtnClick = (month) => {
        setSelectedMonth(month);
        setUploadedFileNames([]);
        setModalErrorType(null);
    }

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            // 파일 확장자 검사
            const fileName = file.name.toLowerCase();
            const fileExtension = fileName.split('.').pop();
            if (fileExtension !== 'csv') {
                setIsOpen(true);
                setModalErrorType('invalidExtension');
                setModalTitle("잘못된 파일 형식입니다.");
                setModalText("파일 확장자가 .csv인 파일만 업로드 가능합니다.");
                return;
            }

            // 파일명 검사
            const validPattern = /^(blooming-koco|heimish|betheskin|Hola|Kpop|Jumiso|Mary&May|Pyunkangyul|RomN|Skinfood|Tocobo)_(\d+)_(\d+)$/i;
            if (!validPattern.test(fileName.split('.')[0])) {
                setIsOpen(true);
                setModalErrorType('invalidExtension');
                setModalTitle("잘못된 파일명입니다.");
                setModalText("파일명은 '브랜드명_년도_월' 형식을 따라야 합니다.");
                console.log(fileName.split('.')[0]);
                return;
            }

            const newFileNames = [...uploadedFileNames];
            newFileNames[index] = file.name;
            setUploadedFileNames(newFileNames);
        }
    };

    const handleSendFile = (index) => {
        setIsOpen(true);
        setModalTitle("파일 전송");
        setModalText("한번 전송하면 끝임");
        setSelectedIndex(index);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        setModalErrorType(null);
    }

    const sendFileToServer = async (index) => {
        try {
            const file = document.getElementById(`fileUpload-${index}`).files[0];
            if (!file) {
                setIsOpen(true);
                setModalTitle("전송 파일이 없습니다");
                setModalText("파일 등록을 먼저 해주세요");
                return;
            }

            const storeId = data.data[index].store_id;

            const responseData = await ShopifyExcelUploadRequest(file, year, selectedMonth, storeId);

            if (!responseData) throw new Error("File upload error");

            if (responseData && responseData.status === 200) {
                setFetchTrigger(prev => prev + 1);
                setIsOpen(false);
            } else if (responseData.status === 400 || responseData.status === 413 || responseData.status === 500) {
                setModalErrorType('invalidExtension');
                setIsOpen(true);
                setModalTitle("파일 전송 실패");
                setModalText("파일 용량이 너무 크거나 서버에 문제가 있습니다");
                setFetchTrigger(prev => prev + 1);
            }
        } catch (error) {
            setModalErrorType('invalidExtension');
            setIsOpen(true);
            setModalTitle("파일 전송 실패");
            setModalText("파일 용량이 너무 크거나 서버에 문제가 있습니다");
            setFetchTrigger(prev => prev + 1);
            console.log(error);
        }
    };


    useEffect(() => {
        if (selectedMonth && year) {
            const formattedMonth = selectedMonth < 10 ? `0${selectedMonth}` : `${selectedMonth}`;
            const yearMonth = `${year}-${formattedMonth}`;

            fetchData(yearMonth);
        }
    }, [fetchTrigger, selectedMonth, year]);

    return (
        <>
            {isOpen && (
                <div className="modal_wrap">
                    <div className="modal">
                        <h2 className="modal_title">{modalTitle}</h2>
                        <div className="modal_text">{modalText}</div>
                        <div className="modal_button_area">
                            {modalErrorType !== 'invalidExtension' && (
                                <button type="button" className="approve_button"
                                        onClick={() => sendFileToServer(selectedIndex)}>진짜 전송</button>
                            )}
                            <button type="button" className="close_button" onClick={handleCloseModal}>닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="shopify_excel_upload_top">
                <Select option={option} value={year} onSelectChange={handleSelectChange} title="년도 선택 (필수)" className="test_select"/>
                <div className="pagename_text">PayOut</div>
                <span
                    className="temporary_text">- 년도 선택 후 월 선택 해주세요<br/> - 파일용량 10MB 이하만 가능합니다<br/> - 파일명은 브랜드명_년도_월 형식 입니다</span>
            </div>
            <div className="shopify_excel_month_request">
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                    <Button
                        type="button"
                        key={month}
                        className={`shopify_excel_month_request_btn ${parseInt(month) === selectedMonth ? 'click_month_btn' : ''}`}
                        onClick={() => handleMonthBtnClick(month)}
                        label={`${month}월`}
                    />
                ))}
            </div>
            <div className="content_container">
                <div className="table_responsive table_content">
                    <table className="shopify_excel_upload_table">
                        <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Path</th>
                            <th>Upload At</th>
                            <th>Status</th>
                            <th>File Name</th>
                            <th>File Request</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data && data.data.map((item, index) => (
                            <tr
                                key={index}
                                className={
                                    (item.file_path === null && item.upload_at !== null)
                                        ? 'highlighted_row'
                                        : (item.file_path !== null && item.upload_at !== null)
                                            ? 'another_class'
                                            : ''
                                }
                            >
                                <td>{item.brand_name}</td>
                                <td>{(item.file_path === null && item.upload_at !== null) ? "브랜드 매출이 없습니다" : item.file_path}</td>
                                <td>{item.upload_at}</td>
                                <td>
                                    {item.file_path === null && item.upload_at === null ? (
                                        <label
                                            htmlFor={`fileUpload-${index}`}
                                            className="file_upload_btn"
                                        >
                                            파일 등록
                                            <input
                                                type="file"
                                                id={`fileUpload-${index}`}
                                                style={{display: 'none'}}
                                                onChange={(e) => handleFileChange(e, index)}
                                                accept=".csv"
                                            />
                                        </label>
                                    ) : (
                                        <span>업로드 완료</span>
                                    )}
                                </td>
                                <td>{uploadedFileNames[index] || ""}</td>
                                <td>
                                    {item.file_path === null && item.upload_at === null && uploadedFileNames[index] ? (
                                        <button className="file_request_btn" onClick={() => handleSendFile(index)}>파일
                                            전송</button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ShopifyExcelUpload;