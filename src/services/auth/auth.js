"use server"




export const useLogin = async (data) => {
    console.log(data)
    const formData = new FormData();

    formData.append("email", data.email)
    formData.append("password", data.password)
    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/login", {
            method: "POST",
            body: formData
        })
        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
        return error
    }
}


export const useLogout = async (token) => {

    try {
        const res = await fetch("https://jgate2000.thesyndicates.team/api/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()

        return result
    } catch (error) {
        console.log(error)
        return error
    }
}