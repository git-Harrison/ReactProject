import React, {useState, useEffect} from 'react';
import {Outlet, useLocation, Navigate} from 'react-router-dom';

// 인증된 사용자만 접근 가능한 라우트를 처리하는 컴포넌트
export function AuthenticatedRoute() {
    const userInfoToken = localStorage.getItem('access_token');
    const tokenExpiredAt = localStorage.getItem('token_expired_at');
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const hideOnPages = ["/signIn", "/signUp", "/forgot"];
    const shouldSkip = hideOnPages.includes(location.pathname);

    useEffect(() => {
        if (shouldSkip) return;

        const checkTokenExpiration = () => {
            const currentTime = new Date();
            const expirationTime = new Date(tokenExpiredAt);

            if (currentTime >= expirationTime) {
                localStorage.clear();
                setShouldRedirect(true);
            }
        };

        checkTokenExpiration();

        const intervalId = setInterval(checkTokenExpiration, 600000);

        return () => clearInterval(intervalId);

    }, [tokenExpiredAt, userInfoToken, location.pathname, shouldSkip]);

    if (shouldRedirect) {
        return <Navigate to="/signIn" />;
    }

    if (shouldSkip) {
        return <Outlet />;
    }

    if (!userInfoToken) {
        return <Navigate to="/signIn"/>;
    }

    return <Outlet/>;
}

// 이미 인증된 사용자가 접근하면 리디렉션하는 컴포넌트
export function RedirectIfAuthenticated({children}) {
    const userInfoToken = localStorage.getItem('access_token');

    if (userInfoToken) {
        return <Navigate to="/"/>;
    }

    return children;
}