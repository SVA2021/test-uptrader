import {FC, useEffect, useRef, useState} from "react";
import {CommentI} from "../../types";
import s from './Comment.module.scss';

interface CommentPropsI {
    comment: CommentI
    setSubComments: (id: number, subComments: CommentI[]) => void
    isEditMode: boolean
}

export const Comment: FC<CommentPropsI> = ({comment, isEditMode, setSubComments}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [subCommentsLocal, setSubCommentsLocal] = useState<CommentI[]>(comment.subComments);

    function addComment() {
        if (!inputRef.current?.value) return false
        const newComment = {
            id: (new Date()).getTime(),
            name: inputRef.current?.value ?? '',
            subComments: [],
        };

        setSubCommentsLocal((v) => [...v, newComment]);
        inputRef.current.value = '';
    }

    function addSubComment(id: number, subComments: CommentI[]) {
        setSubCommentsLocal((v) => {
            return (
                v.map((comment) => comment.id !== id
                    ? comment
                    : {...comment, subComments})
            )
        }
        );
    }

    useEffect(() => {
        setSubComments(comment.id, subCommentsLocal)
    }, [subCommentsLocal])

    return (
        <div className={s.comment} >
            <h5 className={s.title} title={`click to ${isVisible ? 'hide' : 'show'}`} onClick={() => setIsVisible(!isVisible)}  >{comment.name}</h5>
            {(isVisible && subCommentsLocal.length !== 0) &&
                <div className={s.body} >
                    {subCommentsLocal.map((item) =>
                        <Comment
                            key={item.id}
                            comment={item}
                            isEditMode={isEditMode}
                            setSubComments={addSubComment}
                        />)}
                </div>
            }
            {
                isEditMode &&
                <div className={s.form} >
                    <input className={s.form__input} type="text" ref={inputRef} />
                    <button className={s.form__btn} onClick={() => addComment()} >add comment</button>
                </div>
            }

        </div>
    )
}