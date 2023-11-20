import { useState, useEffect } from 'react';
import styles from './clp.module.css'; // Adjust the path according to your file structure


const CartListPagination = ({ cartItems, handleRemoveItem }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Updated to show 5 items per page

    useEffect(() => {
        const totalPages = Math.ceil(cartItems.length / itemsPerPage);
        setCurrentPage(totalPages);
      }, [cartItems, itemsPerPage]);

    if (!cartItems || cartItems.length === 0) {
        return <p>No items in the cart</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <>
            <nav>
                {pageNumbers.length > 1 && (
                    <ul className="pagination pagination-sm justify-content-end">
                        {pageNumbers.map(number => (
                            <li className="page-item" key={number}>
                                <a className="page-link" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(number);
                                }}>
                                    {number}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
                {currentItems.map((cartList, index) => (
                    <li key={index} className={`list-group-item d-flex justify-content-between lh-sm ${styles.liList} ${styles.anchorTrigger}`}>
                        <div className={`${styles.mycontainer}  ${styles.cartItem} p-2 bd-highlight`}>
                            <div className={`${styles.myanchor} ${styles.mydivelement}`} onDoubleClick={() => handleRemoveItem(index)}>
                                <h6 className="my-0 anchorHighlight text-nowrap">{cartList.categoryName}</h6>
                                <small className="text-muted anchorHighlight">{cartList.athleteName}</small>
                                <span className={`text-muted ${styles.remove}`}><span className={styles.doubleTap}>double-tap</span>Remove</span>
                            </div>
                        </div>
                        <div className='p-2 bd-highlight'>
                            <span className={`text-muted ${styles.sidePrice}`}>{cartList.entryFee}</span>
                        </div>
                    </li>
                ))}
        </>
    );
};

export default CartListPagination;
