import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}
function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');         
     
    const typingTimeoutRef = useRef(null);
    // useRef giúp tạo ra obj không thay đổi giữa các lần render

    function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);      // hàm cập nhật thay đổi state của input

    if (!onSubmit) return;
    
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }

    // Kỹ thuật Deboune
    typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
    }, 500);
}



    return (
        <div>
            <form>
                <input
                    type="text"
                    value={searchTerm}   // giá trị nhận vào là searchTerm, cập nhật thay đổi thì thành setSearchTerms
                    onChange={handleSearchTermChange}
                >
                </input>
            </form>
        </div>
    );
}

export default PostFiltersForm;