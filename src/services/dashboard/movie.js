"use server"

const BASE_URL = "https://jgate2000.thesyndicates.team/api";

export const getAdminAllMovies = async (token) => {
    try {
        const res = await fetch(`${BASE_URL}/get-admin-all-movie`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("getAdminAllMovies error:", error)
        return { success: false, message: error.message }
    }
}

export const createMovie = async (token, data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("video", data.video);
        formData.append("cat_id", data.cat_id);
        if (data.rating) {
            formData.append("rating", data.rating);
        }

        const res = await fetch(`${BASE_URL}/movie-library-store`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("createMovie error:", error)
        return { success: false, message: error.message }
    }
}

export const updateMovie = async (token, id, data) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("video", data.video);
        formData.append("cat_id", data.cat_id);
        if (data.rating) {
            formData.append("rating", data.rating);
        }

        const res = await fetch(`${BASE_URL}/movie-library-update/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("updateMovie error:", error)
        return { success: false, message: error.message }
    }
}

export const deleteMovie = async (token, id) => {
    try {
        const res = await fetch(`${BASE_URL}/movie-library-delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("deleteMovie error:", error)
        return { success: false, message: error.message }
    }
}
