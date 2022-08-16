import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}



function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        console.log(e.target.value);
        //  khi input thay đổi, cập nhật lại state value
        setValue(e.target.value); 
    }

    // CHẶN reload khi ấn enter
    function handleSubmit(e) {
        e.preventDefault();
        if (!onSubmit) return;

        // giá trị hiên tại để báo lên cha
        const formValue = {
            title: value,
        };

        onSubmit(formValue); // gọi lại hàm báo lên thằng cha

        // reset form
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={handleValueChange}
            />
        </form>
    );
}

export default TodoForm;