export interface User {
    username: string
    contact: string
    uploaded: boolean
    classes: class[]
    groups: string[]
    times: boolean[][]
}

export interface Course {
    className: string
    classNumber: string
}