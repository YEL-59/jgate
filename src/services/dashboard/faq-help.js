"use server";

export const getFaqOrHelpData = async (token, type) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        return { success: false, message: error.message };
    }
};

export const getFaqOrHelpDataById = async (token, type, id) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch ${type} details:`, error);
        return { success: false, message: error.message };
    }
};

export const createFaqOrHelpData = async (token, type, data) => {
    try {
        const formData = new FormData();
        formData.append("question", data.question);
        formData.append("answer", data.answer);
        formData.append("status", data.status);
        // Include 'ststus' due to possible typo in api based on user screenshot
        if (type === 'faq') {
            formData.append("ststus", data.status);
        }

        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to create ${type}:`, error);
        return { success: false, message: error.message };
    }
};

export const updateFaqOrHelpData = async (token, type, id, data) => {
    try {
        const formData = new FormData();
        formData.append("question", data.question);
        formData.append("answer", data.answer);
        formData.append("status", data.status);
        if (type === 'faq') {
            formData.append("ststus", data.status);
        }

        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to update ${type}:`, error);
        return { success: false, message: error.message };
    }
};

export const toggleFaqOrHelpStatus = async (token, type, id) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}/status/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to toggle status ${type}:`, error);
        return { success: false, message: error.message };
    }
};

export const deleteFaqOrHelpData = async (token, type, id) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/admin/${type}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error(`Failed to delete ${type}:`, error);
        return { success: false, message: error.message };
    }
};
