import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = (tokenType = "user") => {
    if (tokenType === "admin") {
        return localStorage.getItem("adminAccessToken");
    }
    return localStorage.getItem("userAccessToken");
};

const getRefreshToken = (tokenType = "user") => {
    if (tokenType === "admin") {
        return localStorage.getItem("adminRefreshToken");
    }
    return localStorage.getItem("userRefreshToken");
};

const setAccessToken = (tokenType = "user", token) => {
    if (tokenType === "admin") {
        localStorage.setItem("adminAccessToken", token);
    } else {
        localStorage.setItem("userAccessToken", token);
    }
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenType = config?.custom?.tokenType || "user";
        const token = getAccessToken(tokenType); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const tokenType = originalRequest?.custom?.tokenType || "user";

        console.log("token",originalRequest)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const token = getRefreshToken(tokenType);
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}public/auth/refresh-token`,
                    { token }
                );
                const newAccessToken = response.data.accessToken;
                setAccessToken(tokenType, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); 
            } catch (refreshError) {
                // localStorage.removeItem("userAccessToken");
                // localStorage.removeItem("userRefreshToken");
                // window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const fetchAllData = async (endpoint, setData, setLoading, tokenType = "user") => {
    try {
        setLoading(true);
        const response = await axiosInstance.get(
            `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
            {
                custom: { tokenType }
            }
        );
        if (response?.data?.data) {
            setData(response.data.data);
        } else {
            setData([]);
        }
    } catch (error) {
        setData([]);
    } finally {
        setLoading(false);
    }
};

export const fetchPaginatedData = async (
    endpoint,
    setData,
    setLoading,
    setPaginationData,
    { page = 1, limit = 10, body = {}, tokenType = "user", method = "POST" } = {}
) => {
    try {
        setLoading(true);
        const token = getAccessToken(tokenType);
        const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;

        const response = await axiosInstance({
            method,
            url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: { page, limit, ...body },
            custom: { tokenType },
        });

        const resData = await response?.data?.data;
        const paginationData =  await response?.data?.data;
        if (resData && paginationData?.data) {
            setData(resData?.data || []); 
            setPaginationData({
                total: paginationData?.pagination?.total,
                page: paginationData?.pagination?.page,
                limit: paginationData?.pagination?.limit,
                totalPages: paginationData?.pagination?.totalPages,
            });
        } else {
            console.warn("No data found or incorrect structure");
            setData([]);  // Set empty array if no valid data is returned
            setPaginationData({
                total: 0,
                page: 1,
                limit,
                totalPages: 1,
            });
        }
    } catch (error) {
        if (error?.response?.status === 401) {
            toast.error(error?.response?.data?.message || "Unauthorized");
        }
        console.error("Pagination Fetch Error:", error);
        setData([]);  // Ensure the state is cleared on error
    } finally {
        setLoading(false);
    }
};



export const deleteItem = async (endpoint, id, setLoading,  tokenType = "user") => {
    try {
        setLoading(true);
        const token = getAccessToken(tokenType);
        const response = await axiosInstance.delete(`/${endpoint}/${id}`);

        if (response.status === 200) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message || "Failed to delete item.");
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong. Please try again!!");
    } finally {
        setLoading(false);
    }
};


export const toggleUserActiveStatus = async (id, tokenType = "admin", callback = null) => {
    try {
        const response = await axiosInstance.put(
            `admin/user/status/${id}`,
            {},
            {
                custom: { tokenType },
            }
        );

        if (response.data?.isSuccess) {
            toast.success(response.data.message);
            if (typeof callback === "function") {
                callback();
            }

            return true;
        } else {
            toast.error("Status change failed.");
            return false;
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred.");
        return false;
    }
};



export { axiosInstance}