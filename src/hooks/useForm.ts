import { useState } from "react";

const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues);
    const setValue = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const setAllValues = (allValues: any) => {
        setValues(allValues);
    };

    return {
        values,
        setValue,
        setAllValues
    };
};

export default useForm;
