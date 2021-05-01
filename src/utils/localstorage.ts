export const setBiaUser = (value) => {
    try {
        window.localStorage.setItem("user", JSON.stringify(value));
    } catch (e) {
        console.error(e);
    }
};

export const getBiaUser = () => {
    try {
        const value = window.localStorage.getItem("user");
        return value ? JSON.parse(value) : undefined;
    } catch (e) {
        // if error, return initial value
        return undefined;
    }
};

export const deleteBiaUser = () => {
    try {
        window.localStorage.removeItem("user");
    } catch (e) {
        // if error, return initial value
        console.error(e);
    }
};
