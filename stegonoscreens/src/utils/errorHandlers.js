import errors from '../static/errors.js';

export function handleRestError(e, errorHandler) {
    let errorKey;
    
    if(e.response.status === 500 || e.response.status === 401) { 
        errorKey = e.response.data.error_codename;
    }
    else{
        errorKey = "unknown";
    }

    errorHandler(errors[errorKey]);
};