import {FC, useContext, useEffect, useRef, useState} from "react";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useParams} from "react-router-dom";
import {TodoForm, TodoItem} from "../../components";
import {DropContainer} from "../../components/DropContainer/DropContainer";
import {TodoContext} from "../../providers/todo.context";
import {ProjectI, TodoStatusT, TodoTaskI} from "../../types";
import s from './Todo.module.scss';

const STATUS: TodoStatusT[] = ['Queue', 'Development', 'Done',];

export const Todo: FC = () => {

    const {projects, setProjects} = useContext(TodoContext);
    const params = useParams<{id: string}>();

    const [project, setProject] = useState<ProjectI | undefined>(projects.find((project) => project.id === params.id));
    const NonActiveProject = projects.filter((project) => project.id !== params.id);
    const [searchValue, setSearchValue] = useState<string>('');
    const RawTodoList = project?.todos ?? [];
    const TodoList = searchValue
        ? RawTodoList.filter((item) => item.title.includes(searchValue) || item.description.includes(searchValue))
        : RawTodoList;

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [todoTask, setTodoTask] = useState<TodoTaskI | null>(null);

    function moveTodo(id: number, status: TodoStatusT) {
        setProject((v) => {
            return (
                v === undefined
                    ? undefined
                    : {...v, todos: v?.todos.map((todo) => todo.id === id ? ({...todo, status}) : todo)}
            )
        }
        )
    }

    function addTask() {
        setIsFormOpen(true);
    }

    function addNewTask(task: TodoTaskI) {
        setProject((v) => ({...v!, todos: [...v?.todos!, task]}))
    }

    function updateTask(task: TodoTaskI) {
        setProject((v) => ({
            ...v!,
            todos: v?.todos.map((item) => item.id === task?.id ? task : item)!
        }))
    }

    function editTask(id: number) {
        const task = TodoList.find((todo) => todo.id === id) ?? null;
        setTodoTask(task);
        setIsFormOpen(true);
    }

    function closeForm() {
        setTodoTask(null);
        setIsFormOpen(false);
    }

    useEffect(() => setProjects([...NonActiveProject, project!]), [project]);

    return (
        <div className={s.wrapper}>
            <header className={s.header} >
                <h2 className={s.title}>Project: {project?.name ?? 'none'}</h2>
            </header>
            <div className={s.form} >
                <input className={s.form__input}
                    type="text"
                    placeholder={'search task'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className={s.form__btn} onClick={addTask} >add task</button>
            </div>
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
                                                    editTask={editTask}
                                                />
                                            )
                                    }
                                </DropContainer>
                            </div>
                        )
                    }
                </div>
            </DndProvider>
            {
                isFormOpen &&
                <TodoForm
                    todoTask={todoTask}
                    updateTask={updateTask}
                    addTask={addNewTask}
                    closeForm={closeForm}
                />
            }
        </div>
    )
};