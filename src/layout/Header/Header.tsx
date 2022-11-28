import {Link} from 'react-router-dom';
import s from './Header.module.scss';

export const Header = () => {
	return (
		<header className={s.header} >
			<a className={s.link} href="https://sva2021.github.io/MyPortfolio/" target="_blank" rel="noopener noreferrer">SVA</a>
			<Link className={s.link} to={'/'}>projects</Link>
		</header>
	)
};