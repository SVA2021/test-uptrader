import {FC, useRef, useState} from "react"
import {CommentI, SubTaskI, TodoPriorityT, TodoTaskI} from "../../types"
import s from './TodoForm.module.scss';
import {Comment} from '../index';

interface TodoFormI {
    todoTask: TodoTaskI | null
    updateTask: (task: TodoTaskI) => void
    addTask: (task: TodoTaskI) => void
    closeForm: () => void
}

export const TodoForm: FC<TodoFormI> = ({todoTask, addTask, updateTask, closeForm}) => {

    const subTaskRef = useRef<HTMLInputElement | null>(null);
    const commentRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState<string>(todoTask?.title ?? '');
    const [description, setDescription] = useState<string>(todoTask?.description ?? '');
    const [initialDate, setInitialDate] = useState<string>(todoTask?.initialDate ?? '');
    const [expirationDate, setExpirationDate] = useState<string>(todoTask?.expirationDate ?? '');
    const [files, setFiles] = useState<string[]>(todoTask?.files ?? []);
    const [comments, setComment] = useState<CommentI[]>(todoTask?.comments ?? []);
    const [subTask, setSubTask] = useState<SubTaskI[]>(todoTask?.subTask ?? []);
    const [priority, setPriority] = useState<TodoPriorityT>(todoTask?.priority ?? 'normal');
    const [error, setError] = useState<string | null>(null);

    function handleClose() {
        setTitle('');
        setDescription('');
        setInitialDate('');
        setExpirationDate('');
        setFiles([]);
        setComment([]);
        setSubTask([]);
        setPriority('normal');
        setError(null);
        closeForm();
    }

    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return false;
        const newFiles = Array.from(event.target.files).map((file) => file.name);
        setFiles(newFiles);
    }

    function onFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title || !description || !initialDate || !expirationDate) setError('something went wrong...');

        if (todoTask === null) {
            addTask({
                id: (new Date()).getTime(),
                title,
                description,
                initialDate,
                expirationDate,
                files,
                comments,
                subTask,
                priority,
                status: 'Queue',
            })
        } else {
            updateTask({
                ...todoTask,
                title,
                description,
                initialDate,
                expirationDate,
                files,
                comments,
                subTask,
                priority,
            })
        };
        handleClose();
    }

    function handlePriority(v: string): TodoPriorityT {
        switch (v) {
            case '0':
                return 'low'
            case '1':
                return 'normal'
            case '2':
                return 'high'
            default:
                return 'normal'
        }
    }

    function addSubComment(id: number, subComments: CommentI[]) {
        setComment((v) => {
            return (
                v.map((comment) => comment.id !== id
                    ? comment
                    : {...comment, subComments})
            )
        }
        );
    }

    function addSubTask(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setSubTask((v) => [...v,
        {
            id: (new Date()).getTime(),
            isFinished: false,
            description: subTaskRef.current?.value ?? '',
        }
        ]
        );
        subTaskRef.current!.value = '';
    }

    function addComment() {
        setComment((v) => [...v,
        {
            id: (new Date()).getTime(),
            subComments: [],
            name: commentRef.current?.value ?? '',
        }
        ]
        );
        commentRef.current!.value = '';
    }

    function checkSubTask(id: number) {
        setSubTask((v) => v.map((task) => task.id === id ? {...task, isFinished: !task.isFinished} : task));
    }

    return (
        <div className={s.TodoForm}>
            <form onSubmit={onFormSubmit} className={s.TodoForm__body} >
                <label className={s.TodoForm__field}>
                    Title
                    <input type="text" name="title" value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </label>
                <label className={s.TodoForm__field}>
                    Description
                    <textarea name="description" value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                </label>
                <label className={s.TodoForm__file}>
                    {files ?? 'Upload Files'}
                    <input className={s.TodoForm__fileInput} type="file" name="file" multiple onChange={handleFileUpload} />
                    <button onClick={() => setFiles([])}>clear file</button>
                </label>
                <label className={s.TodoForm__field}>
                    Initial date
                    <input type="date" name="initialDate" value={initialDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialDate(e.target.value)} />
                </label>
                <label className={s.TodoForm__field}>
                    Expired date
                    <input type="date" name="expirationDate" value={expirationDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value)} />
                </label>
                <label className={s.TodoForm__field}>
                    priority level
                    <input type="range" name="priority" min={0} max={2} step={1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(handlePriority(e.target.value))} />
                </label>
                <div className={s.comments} >
                    <h4 className={s.comments__title} >Sub tasks</h4>
                    <div className={s.comments__body} >
                        {subTask.map((task) =>
                            <p
                                key={task.id}
                                onClick={() => checkSubTask(task.id)}
                                style={{textDecoration: task.isFinished ? 'line-through' : 'none'}}
                            >
                                {task.description}
                            </p>
                        )}
                        <div className={s.form} >
                            <input className={s.form__input} type="text" ref={subTaskRef} />
                            <button className={s.form__btn} onClick={addSubTask} >add subtask</button>
                        </div>
                    </div>
                </div>
                <div className={s.comments} >
                    <h4 className={s.comments__title} >Comments</h4>
                    <div className={s.comments__body} >
                        {comments.map((comment) =>
                            <Comment key={comment.id} isEditMode={true} comment={comment} setSubComments={addSubComment} />
                        )}
                        <div className={s.form} >
                            <input className={s.form__input} type="text" ref={commentRef} />
                            <button className={s.form__btn} onClick={addComment} >add comment</button>
                        </div>
                    </div>
                </div>
                {!error && <p>{error}</p>}
                <input type="submit" value="Submit" className={s.TodoForm__submit} />
            </form>
            <button className={s.TodoForm__close} onClick={handleClose}>close</button>
        </div>
    )
}