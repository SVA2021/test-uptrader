import {createContext} from "react";
import {ProjectsFake} from "../db/database";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {ProjectI, WithChildrenT} from "../types";

interface TodoContextI {
    projects: ProjectI[]
    setProjects: (projects: ProjectI[]) => void
}

export const TodoContext = createContext<TodoContextI>({} as TodoContextI);

export function TodoProvider({children}: WithChildrenT) {

    const [projects, setProjects] = useLocalStorage<ProjectI[]>('projects', [])

    if (projects.length === 0) setProjects(ProjectsFake);

    const value = {projects, setProjects};

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}
