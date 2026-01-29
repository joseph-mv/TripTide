import { useState, useEffect } from "react";

const useDebounce = <T>(value: T, delay: number = 500): T => {

    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler); // Cleanup timeout on value change
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
