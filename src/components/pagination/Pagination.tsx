import type { IPaginationProps } from '../../utils/interfaces';
import styles from './pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, setCurrentPage, currentPage }:IPaginationProps) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
		<div className={styles.pagesGroup}>
			{pages.length && pages.map((page, idx) => (
				<button
					className={currentPage === page ? styles.active :''}
					key={idx}
					onClick={() => setCurrentPage(page)}>
					{page}
				</button>
			))}
		</div>
	);
};
export default Pagination;
