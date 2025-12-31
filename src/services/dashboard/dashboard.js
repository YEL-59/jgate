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
