import {ReactNode} from "react";

export type WithChildrenT = {
    children: ReactNode
}

export type TodoStatusT = 'Queue' | 'Development' | 'Done';
export type TodoPriorityT = 'low' | 'normal' | 'high';

export interface SubTaskI {
    title: string
    description: string
}

export interface CommentI {
    comment: string | CommentI
}

export interface TodoTaskI {
    id: number
    title: string
    description: string
    initialDate: Date
    expirationDate: Date
    files: string[]
    status: TodoStatusT
    priority: TodoPriorityT
    subTask: SubTaskI[]
    comment: CommentI
}

export interface ProjectI {
    id: number
    name: string
    todos: TodoTaskI[]
}