import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthenticatedRoute, RedirectIfAuthenticated} from "./AuthRoutes";

// 메인 페이지
import MainPage from "../page/Main";

// 오더 페이지
import OrderList from "../page/order/OrderList";

// 리포트 페이지
import ExcelList from "../page/report/ExcelList";
// import MonthlyAmount from "../page/report/MonthlyAmount";
import MonthlyAmountSeller from "../page/report/MonthlyAmountSeller";

// 맴버(회원) 페이지
import SignInPage from "../page/member/sign/SignIn";
import SignUpPage from "../page/member/sign/SignUp";
import List from "../page/member/user/MemberApproval";
import Forgot from "../page/member/sign/Forgot";
import MyPage from "../page/member/user/ViewProfile";
import MemberList from "../page/member/user/MemberList";

// 인벤토리 페이지
import FbaStock from "../page/inventory/FbaStock";

// 데이터팀용 쇼피파이 엑셀 업로드 페이지
import ShopifyExcelUpload from "../hidden/ShopifyExcelUpload";
import ShopifyExcelSummaryUpload from "../hidden/ShopifyExcelSummaryUpload";

// 임시
import MonthlyReport from "../page/report/monthly/MonthlyReport";
import DailyReport from "../page/report/daily/DailyReport";
import AdminNotice from "../page/admin/AdminNotice";

// 테스트 페이지
import TestPage from "../hidden/TestPage";


function Router() {
    return (
        <Routes>
            {/* 인증이 필요하지 않은 라우트 */}

            {/* 로그인 페이지 */}
            <Route path="/signIn" element={<RedirectIfAuthenticated><SignInPage/></RedirectIfAuthenticated>}/>

            {/* 회원가입 페이지 */}
            <Route path="/signUp" element={<RedirectIfAuthenticated><SignUpPage/></RedirectIfAuthenticated>}/>

            {/* 비밀번호 찾기 페이지 */}
            <Route path="/forgot" element={<RedirectIfAuthenticated><Forgot/></RedirectIfAuthenticated>}/>

            {/* 인증이 필요한 라우트 */}
            <Route path="/" element={<AuthenticatedRoute/>}>
                {/* 메인 페이지 */}
                <Route index element={<MainPage/>}/>

                {/* 주문 리스트 페이지 */}
                <Route path="order_list/:status" element={<OrderList/>}/>

                {/* 월별 리포트 페이지 */}
                {/*<Route path="report/monthly_amount" element={<MonthlyAmount/>}/>*/}
                <Route path="report/monthly_amount" element={<MonthlyReport/>}/>


                {/* 일별 리포트 페이지 */}
                <Route path="report/daily_amount" element={<DailyReport/>}/>

                {/* 판매자 별 월별 리포트 페이지 */}
                <Route path="report/monthly_seller" element={<MonthlyAmountSeller/>}/>

                {/* 엑셀 다운로드 페이지 */}
                <Route path="report/excel_down" element={<ExcelList/>}/>

                {/* 재고 페이지 */}
                <Route path="inventory/fba_stock" element={<FbaStock/>}/>

                {/* 프로필 보기 페이지 */}
                <Route path="viewProfile" element={<MyPage/>}/>

                {/* 데이터팀용 쇼피파이 엑셀 업로드 페이지 */}
                <Route path="/hidden/shopifyExcelUpload" element={<ShopifyExcelUpload/>}/>
                <Route path="/hidden/shopifyExcelSummaryUpload" element={<ShopifyExcelSummaryUpload/>}/>

                {/* 회원 목록 페이지 */}
                <Route path="/member/memberList" element={<MemberList/>}/>

                {/* 회원 승인 페이지 */}
                <Route path="/member/approval" element={<List/>}/>

                {/* 테스트 페이지 */}
                <Route path="test" element={<TestPage/>}/>
                <Route path="monthlyTest" element={<MonthlyReport/>}/>
                <Route path="/admin/notice" element={<AdminNotice/>}/>
            </Route>
        </Routes>
    );
}

export default Router;