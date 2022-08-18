import React, { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {    //current Color ở đây là colorRef.current: là màu hiện tại
    const colorList = ['orange', 'red', 'green', 'yellow']

    // lấy index màu hiện tại
    const currentIndex = colorList.indexOf(currentColor);
    let newIndex = currentIndex;

    while (currentIndex === newIndex) {
        newIndex = Math.floor(Math.random() * colorList.length);   //nếu còn bằng thì cho nó khác
    }
    
    return colorList[newIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');


    // Change color every 1 seconds
    useEffect(() => {
       const colorInterval = setInterval(() => {
        //    console.log('First color: ', color);
           console.log('Change color: ', colorRef.current);
           
           const newColor = randomColor(colorRef.current);   // truyền cái current color vào hàm random để tránh trùng
           setColor(newColor);

           colorRef.current = newColor;
       }, 1000);
        
        return () => {
            clearInterval(colorInterval);
        }
    }, [])

    return color;  //return dữ liệu
}

export default useMagicColor;