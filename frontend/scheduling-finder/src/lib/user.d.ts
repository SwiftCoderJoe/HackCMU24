export interface User {
    username: string
    contact: string
    uploaded: boolean
    classes: class[]
    groups: string[]
    times: boolean[][]
}

export interface Class {
    courseName: string
    courseNum: string
    frequency: string
}