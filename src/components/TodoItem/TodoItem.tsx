import {formatDistance} from 'date-fns'
import {FC} from "react"
import {TodoTaskI} from "../../types"
import {Comment} from '../index'
import s from './TodoItem.module.scss'

interface TodoItemI {
    item: TodoTaskI
    editTask: (id: number) => void
}

export const TodoItem: FC<TodoItemI> = ({item, editTask}) => {
    return (
        <div className={s.body} >
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