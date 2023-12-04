import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {ActiveContext} from "./contexts/ActiveContext";
import {MessageContext} from "./contexts/MessageContext";
import {useTheme} from "./hooks/useTheme";
import AppContent from "./layout/AppContent";
import './App.css';

function App() {
    // 상태 초기화: 메뉴 활성화 상태 및 페이지 설명 텍스트 상태
    const [active, setActive] = useState(false); // 메뉴 활성화 상태
    const [explanation, setExplanation] = useState(""); // 페이지 설명 텍스트 상태

    // 헤더와 사이드 메뉴를 숨기기 원하는 페이지 경로들
    const hideOnPages = ["/signIn", "/signUp", "/forgot"];

    // 테마 관련 상태 및 함수 가져오기
    const {themeMode, setThemeMode, themeColor, setThemeColor} = useTheme();

    return (
        <div className="App">
            <BrowserRouter>
                {/* 전역 상태 제공: 메뉴 활성화, 테마 설정 */}
                <ActiveContext.Provider
                    value={{
                        active,
                        setActive,
                        themeMode,
                        setThemeMode,
                        themeColor,
                        setThemeColor,
                    }}
                >
                    {/* 전역 상태 제공: 페이지 설명 텍스트 */}
                    <MessageContext.Provider value={{explanation, setExplanation}}>
                        {/* 메인 애플리케이션 콘텐츠 렌더링 */}
                        <AppContent
                            hideOnPages={hideOnPages}
                            active={active}
                            setActive={setActive}
                            themeColor={themeColor}
                        />
                    </MessageContext.Provider>
                </ActiveContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;