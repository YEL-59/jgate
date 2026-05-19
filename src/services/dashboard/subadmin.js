"use server"

const BASE_URL = "https://jgate2000.thesyndicates.team/api";

export const getSubAdmins = async (token) => {
    try {
        const res = await fetch(`${BASE_URL}/sub-admin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("getSubAdmins error:", error)
        return { success: false, message: error.message }
    }
}

export const createSubAdmin = async (token, data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation || data.password);
        formData.append("role_name", data.role_name);

        if (data.permissions && Array.isArray(data.permissions)) {
            data.permissions.forEach((permissionId, index) => {
                formData.append(`permissions[${index}]`, permissionId);
            });
        }

        const res = await fetch(`${BASE_URL}/sub-admin/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("createSubAdmin error:", error)
        return { success: false, message: error.message }
    }
}

export const updateSubAdminStatus = async (token, adminId) => {
    try {
        const res = await fetch(`${BASE_URL}/sub-admin/staus-update/${adminId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("updateSubAdminStatus error:", error)
        return { success: false, message: error.message }
    }
}

export const updateSubAdminPermissions = async (token, roleId, permissions) => {
    try {
        const formData = new FormData();
        if (permissions && Array.isArray(permissions)) {
            permissions.forEach((permission, index) => {
                formData.append(`permissions[${index}]`, permission);
            });
        }

        const res = await fetch(`${BASE_URL}/sub-admin/permission-update/${roleId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("updateSubAdminPermissions error:", error)
        return { success: false, message: error.message }
    }
}

export const updateSubAdminRoles = async (token, adminId, roles) => {
    try {
        const formData = new FormData();
        if (roles && Array.isArray(roles)) {
            roles.forEach((role, index) => {
                formData.append(`role[${index}]`, role);
            });
        }

        const res = await fetch(`${BASE_URL}/sub-admin/role-update/${adminId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("updateSubAdminRoles error:", error)
        return { success: false, message: error.message }
    }
}

export const deleteSubAdmin = async (token, adminId) => {
    try {
        const res = await fetch(`${BASE_URL}/sub-admin/delete/${adminId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("deleteSubAdmin error:", error)
        return { success: false, message: error.message }
    }
}

export const getSubAdminDetails = async (token, adminId) => {
    try {
        const res = await fetch(`${BASE_URL}/sub-admin/show/${adminId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("getSubAdminDetails error:", error)
        return { success: false, message: error.message }
    }
}

export const getAvailablePermissions = async (token) => {
    try {
        const res = await fetch(`${BASE_URL}/sub-admin/permissions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("getAvailablePermissions error:", error)
        return { success: false, message: error.message }
    }
}

export const updateSubAdmin = async (token, adminId, data) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("status", data.status); // "1" or "0"

        if (data.permissions && Array.isArray(data.permissions)) {
            data.permissions.forEach((permissionId, index) => {
                formData.append(`permissions[${index}]`, permissionId);
            });
        }

        const res = await fetch(`${BASE_URL}/sub-admin/update/${adminId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        const result = await res.json()
        return result
    } catch (error) {
        console.log("updateSubAdmin error:", error)
        return { success: false, message: error.message }
    }
}
