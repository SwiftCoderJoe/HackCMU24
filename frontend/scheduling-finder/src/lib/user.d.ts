export interface User {
    username: string
    contact: string
    uploaded: boolean
    classes: class[]
    groups: string[]
    times: boolean[][]
}

export interface Course {
    courseName: string
    courseNum: string
}