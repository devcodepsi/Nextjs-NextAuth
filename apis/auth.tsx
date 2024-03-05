// post auth
export async function postAuthLogin(email: string, password: string) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}api/v1/auth/login`;
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
    };
    const response = await fetch(fetchUrl, fetchOptions);
    return response;
}


// get profile
export async function getAuthProfile(accessToken: string) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}api/v1/auth/profile`;
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    }
    const response = await fetch(fetchUrl, fetchOptions);
    return response;
}


// post refresh token
export async function postAuthRefreshToken(refreshToken: string) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}api/v1/auth/refresh-token`;
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
            refreshToken
        }),
    }
    const response = await fetch(fetchUrl, fetchOptions);
    return response;
}


// post write detail profile
export async function postDetailProfile(email: string, name: string, nickname: string, gender: string) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}[added api]`;
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
            email, name, nickname, gender
        }),
    }
    const response = await fetch(fetchUrl, fetchOptions);
    return response;
}


// get detail profile
export async function getDetailProfile() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_ESCUELAS_URL}[added api]`;
    const fetchOptions = {
        method: "GET",
    }
    const response = await fetch(fetchUrl, fetchOptions);
    return response;
}