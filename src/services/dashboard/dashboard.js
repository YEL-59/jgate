"use server"


export const useDashboard = async (token) => {
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/home-dashboard/user", {
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

export const getAdminProfile = async (token) => {
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/admin-profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.error("Error fetching admin profile:", error);
    }
}

export const updateAdminProfile = async (token, formData) => {
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/admin-profile-update", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.error("Error updating admin profile:", error);
    }
}
