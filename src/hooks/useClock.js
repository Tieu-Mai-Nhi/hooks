import { useEffect, useState } from 'react';

function formatDate(date) {
    if (!date) return '';
    
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
    const [timeString, setTimeString] = useState('');
    
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();  // khởi tạo và lấy thời gian hiện tại
            const newTimeString = formatDate(now)  // đi format thành h:m:s

            setTimeString(newTimeString); // cập nhận timeString
        }, 1000);
        
        return () => {
            // clean up
            console.log('Clock clean up');
            clearInterval(clockInterval);
        };
    }, [])


    return {timeString};
}

export default useClock;