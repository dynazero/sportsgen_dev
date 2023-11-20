import{ useState } from 'react';
import styles from './rec.module.css'

const EventCategoriesComponent = ({ events }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    if (!events) {
        return <p>No events available</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Object.values(events).slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Object.values(events).length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li className="page-item" key={number}>
                <a className="page-link" onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(number)
                }
                } href="!#">
                    {number}
                </a>
            </li >
        );
    });

    return (
        <>
            <ul>
                {currentItems.map((category, index) => (
                    <li className={`text-nowrap ${styles.categoryItem}`} key={index}>
                        <span className={`${styles.categoryTitle}`}>{category.title}</span>
                        <strong className={`${styles.categoryFee}`}><small>{category.entryFee}php</small></strong>
                    </li>
                ))}
            </ul>
            <nav>
                {pageNumbers.length > 1 && (
                    <ul className="pagination pagination-sm justify-content-end">
                        {renderPageNumbers}
                    </ul>
                )}
            </nav>
        </>
    );
};

export default EventCategoriesComponent;
