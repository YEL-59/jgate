"use server"


export const useUser = async (token) => {
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/user-management", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const updateUserStatus = async (token, id, status) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/user-management/updateStatus/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getPendingDirectors = async (token) => {
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/user-management/pending-directors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const approveDirector = async (token, id) => {
    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/user-management/approve-director/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const rejectDirector = async (token, id) => { // id is likely needed for rejection too, although user didn't specify URL param for rejection clearly, assuming similar pattern or body. 
    // Wait, user request said: "api:/user-management/reject-director" without ID in URL in the example "resonce post api".
    // "this will have the id so when user click approve athen call a api:/user-management/approve-director/4"
    // For reject: "call api:/user-management/reject-director". It might need body or query param. 
    // Given the pattern, let's assume it might also take an ID or the user description was slightly incomplete. 
    // Actually, usually rejection needs an ID. 
    // Let's look closely at user request: "resonce post api:{...}". 
    // Just "call api:/user-management/reject-director". 
    // I will assume it follows the approve pattern /reject-director/{id} OR it takes body. 
    // To be safe I will use /reject-director/{id} as it is most standard for REST, but if the user literally meant without ID in URL, it might be body.
    // However, looking at "approve-director/4", it implies ID in URL.
    // A standard reject would be `reject-director/${id}` too. 
    // Let's try `reject-director/${id}`. If it fails I will ask or try body. 
    // Actually, looking at the user prompt again: "when user click reject the call api:/user-management/reject-director". 
    // It doesn't explicitly say /4 like approve. 
    // But it MUST identify the user. I'll include ID in url as safe bet for typical Laravel resource routes, or body. 
    // I will try URL parameter first matching approve-director pattern.

    try {
        const res = await fetch(`https://jgate2000.thesyndicates.team/api/user-management/reject-director/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};
