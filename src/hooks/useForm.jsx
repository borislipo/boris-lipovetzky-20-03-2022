import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = (e, newValue) => {
        setValues({
            ...values,
            [e.target.id.split("-")[0]]: newValue
        });
    }

    return [values, handleInputChange, reset];

}