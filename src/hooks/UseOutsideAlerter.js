import { useRef, useEffect } from 'react';

function useOutsideAlerter(initialRef, ignoredRef, onOutsideClick) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ignoredRef.current && ignoredRef.current.contains(event.target)) {
                return;
            }

            if (initialRef.current && !initialRef.current.contains(event.target)) {
                onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [initialRef, ignoredRef, onOutsideClick]);
}

export default useOutsideAlerter;