import {FC, useContext} from 'react';
import {Link} from 'react-router-dom';
import {TodoContext} from '../../providers/todo.context';
import s from './Home.module.scss';

export const Home: FC = () => {

	const {projects, setProjects} = useContext(TodoContext);

	return (
		<div className={s.body} >
			<h1 className={s.title}>HomePage for UpTrader test task</h1>
			<h2 className={s.subtitle}>Choose project</h2>
			<div className={s.links}>
				{projects.map((project) =>
					<Link className={s.link} key={project.id} to={`todo/${project.id}`}>{project.name}</Link>)}
			</div>
		</div>
	)
};