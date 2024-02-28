export interface User {
    id: number | null,
    username: string,
    fullName: string,
    phoneNumber: string,
    email: string,
    password: string,
}


export interface AuthRequest {
    username: string,
    password: string
}