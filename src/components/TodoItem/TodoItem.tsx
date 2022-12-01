import {formatDistance} from 'date-fns'
import {FC} from "react"
import {TodoStatusT, TodoTaskI} from "../../types"
import {Comment} from '../index'
import s from './TodoItem.module.scss'
import {useDrag} from 'react-dnd'

export interface TodoItemI {
    item: TodoTaskI
    editTask: (id: number) => void
    moveTodo: (id: number, status: TodoStatusT) => void
}

interface DropResult {
    allowedDropEffect: TodoStatusT
    dropEffect: string
    item: TodoTaskI
}

export const TodoItem: FC<TodoItemI> = ({item, editTask, moveTodo}) => {

    const [{opacity}, drag] = useDrag(
        () => ({
            type: 'box',
            item,
            end(item, monitor) {
                const dropResult = monitor.getDropResult() as DropResult
                if (item && dropResult) {
                    let alertMessage = 'You cannot move it'
                    const isDropAllowed = dropResult.allowedDropEffect !== item.status
                    if (isDropAllowed) {
                        moveTodo(item.id, dropResult.allowedDropEffect);
                        alertMessage = `Drop Allowed id: ${item.id} container: ${dropResult.allowedDropEffect}`
                    }
                    console.log(alertMessage)
                }
            },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.2 : 1,
            }),
        }),
        [],
    )

    return (
        <div className={s.body} ref={drag} style={{opacity}} >
            <p className={s.id} >task ID: {item.id}</p>
            <p className={s.id} >status: {item.status}</p>
            <p className={s.id} >priority: {item.priority}</p>
            <h3 className={s.title} >{item.title}</h3>
            <p className={s.description} >{item.description}</p>
            <div className={s.dates} >
                <p className={s.date} >Initial date: {item.initialDate}</p>
                <p className={s.date} >Time left: {formatDistance(new Date(), new Date(item.initialDate))}</p>
                <p className={s.date} >Expiration date: {item.expirationDate}</p>
            </div>
            <div className={s.comments} >
                <h4 className={s.comments__title} >Files</h4>
                <div className={s.comments__body} >
                    {item.files.map((file, index) =>
                        <a target={'_blank'} rel={'noopener noreferrer'}
                            className={s.comments__link}
                            key={index}
                            href={file}
                        >
                            {file}
                        </a>
                    )}
                </div>
            </div>
            <div className={s.comments} >
                <h4 className={s.comments__title} >sub tasks</h4>
                <div className={s.comments__body} >
                    {item.subTask.map((subTask, index) =>
                        <p key={index} style={{textDecoration: subTask.isFinished ? 'line-through' : 'none'}} >
                            {subTask.description}
                        </p>
                    )}
                </div>
            </div>
            <div className={s.comments} >
                <h4 className={s.comments__title} >Comments</h4>
                <div className={s.comments__body} >
                    {item.comments.map((comment) =>
                        <Comment key={comment.id} isEditMode={false} comment={comment} setSubComments={console.log} />
                    )}
                </div>
            </div>
            <button className={s.editBtn} onClick={() => editTask(item.id)} >edit</button>
        </div>
    )
}