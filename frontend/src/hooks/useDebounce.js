import { useState, useEffect } from "react";

const useDebounce = (value, delay = 500) => {
    
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler); // Cleanup timeout on value change
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
