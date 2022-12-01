import {FC, useContext, useState} from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useParams} from "react-router-dom";
import {TodoItem} from "../../components";
import {DropContainer} from "../../components/DropContainer/DropContainer";
import {TodoContext} from "../../providers/todo.context";
import {ProjectI, TodoStatusT} from "../../types";
import s from './Todo.module.scss';

const STATUS: TodoStatusT[] = ['Queue', 'Development', 'Done',];

export const Todo: FC = () => {

    const {projects, setProjects} = useContext(TodoContext);
    const params = useParams<{id: string}>();

    const [project, setProject] = useState<ProjectI | undefined>(projects.find((project) => project.id === params.id));
    const NonActiveProject = projects.filter((project) => project.id !== params.id);
    const TodoList = project?.todos ?? [];

    function moveTodo(id: number, status: TodoStatusT) {
        setProject((v) => {
            return (
                v === undefined
                    ? undefined
                    : {
                        ...v,
                        todos: v?.todos.map((todo) => todo.id === id
                            ? ({...todo, status})
                            : todo)
                    })
        }
        )
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Project: {project?.name ?? 'none'}</h2>
            <DndProvider backend={HTML5Backend}>
                <div className={s.body} >
                    {
                        STATUS.map((status) =>
                            <div className={s.body__column} key={status}>
                                <h3 className={s.status}>{status}</h3>
                                <DropContainer allowedDropEffect={status} >
                                    {
                                        TodoList.filter((todo) =>
                                            todo.status === status).map((todo) =>
                                                <TodoItem
                                                    key={todo.id}
                                                    item={todo}
                                                    moveTodo={moveTodo}
                                                    editTask={() => console.log(todo.id)}
                                                />
                                            )
                                    }
                                </DropContainer>
                            </div>
                        )
                    }
                </div>
            </DndProvider>
        </div>
    )
};