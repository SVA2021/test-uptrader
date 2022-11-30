import {FC, useContext} from "react";
import {useParams} from "react-router-dom";
import {TodoItem} from "../../components";
import {TodoContext} from "../../providers/todo.context";
import s from './Todo.module.scss';

export const Todo: FC = () => {

    const {projects, setProjects} = useContext(TodoContext);
    const params = useParams<{id: string}>();
    const NonActiveProject = projects.filter((project) => project.id !== params.id);
    const ActiveProject = projects.find((project) => project.id === params.id);
    const TodoList = ActiveProject?.todos ?? [];
    const GreenTodo = TodoList.filter((todo) => todo.status === 'Done');
    const YellowTodo = TodoList.filter((todo) => todo.status === 'Development');
    const RedTodo = TodoList.filter((todo) => todo.status === 'Queue');

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Project: {ActiveProject?.name ?? 'none'}</h2>
            <div className={s.body} >
                <div className={s.body__red} >
                    {
                        RedTodo.map((todo) =>
                            <TodoItem key={todo.id} item={todo} editTask={() => console.log(todo.id)} />
                        )
                    }
                </div>
                <div className={s.body__yellow} >
                    {
                        YellowTodo.map((todo) =>
                            <TodoItem key={todo.id} item={todo} editTask={() => console.log(todo.id)} />
                        )
                    }
                </div>
                <div className={s.body__green} >
                    {
                        GreenTodo.map((todo) =>
                            <TodoItem key={todo.id} item={todo} editTask={() => console.log(todo.id)} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}