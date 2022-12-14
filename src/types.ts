import {ReactNode} from "react";

export type WithChildrenT = {
    children: ReactNode
}

export type TodoStatusT = 'Queue' | 'Development' | 'Done';
export type TodoPriorityT = 'low' | 'normal' | 'high';

export interface SubTaskI {
    id: number
    isFinished: boolean
    description: string
}

export interface CommentI {
    id: number
    name: string
    subComments: CommentI[]
}

export interface TodoTaskI {
    id: number
    title: string
    description: string
    initialDate: string
    expirationDate: string
    files: string[]
    status: TodoStatusT
    priority: TodoPriorityT
    subTask: SubTaskI[]
    comments: CommentI[]
}

export interface ProjectI {
    id: string
    name: string
    todos: TodoTaskI[]
}