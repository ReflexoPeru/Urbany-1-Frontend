import React from 'react';
import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react';
import styles from './Pagination.module.css';

const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange,
    showInfo = true,
    showPageNumbers = true,
    maxVisiblePages = 5,
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Ajustar si estamos cerca del inicio o final
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange?.(page);
        }
    };

    // Siempre mostrar la paginación, incluso con una sola página

    return (
        <div className={styles.pagination}>
            {showInfo && (
                <div className={styles.paginationInfo}>
                    <span className={styles.infoText}>
                        Mostrando {startItem} - {endItem} de {totalItems} elementos
                    </span>
                </div>
            )}

            <div className={styles.paginationControls}>
                {/* Primera página */}
                <button
                    className={`${styles.paginationButton} ${styles.navButton}`}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || totalPages <= 1}
                    title="Primera página"
                >
                    <CaretDoubleLeft size={20} weight="bold" />
                </button>

                {/* Página anterior */}
                <button
                    className={`${styles.paginationButton} ${styles.navButton}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || totalPages <= 1}
                    title="Página anterior"
                >
                    <CaretLeft size={20} weight="bold" />
                </button>

                {/* Números de página */}
                {showPageNumbers && (
                    <>
                        {/* Mostrar "..." al inicio si es necesario */}
                        {visiblePages[0] > 1 && (
                            <>
                                <button
                                    className={`${styles.paginationButton} ${styles.pageButton}`}
                                    onClick={() => handlePageChange(1)}
                                >
                                    1
                                </button>
                                {visiblePages[0] > 2 && (
                                    <span className={styles.ellipsis}>...</span>
                                )}
                            </>
                        )}

                        {/* Páginas visibles */}
                        {visiblePages.map(page => (
                            <button
                                key={page}
                                className={`${styles.paginationButton} ${styles.pageButton} ${page === currentPage ? styles.active : ''
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Mostrar "..." al final si es necesario */}
                        {visiblePages[visiblePages.length - 1] < totalPages && (
                            <>
                                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                    <span className={styles.ellipsis}>...</span>
                                )}
                                <button
                                    className={`${styles.paginationButton} ${styles.pageButton}`}
                                    onClick={() => handlePageChange(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* Página siguiente */}
                <button
                    className={`${styles.paginationButton} ${styles.navButton}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages <= 1}
                    title="Página siguiente"
                >
                    <CaretRight size={20} weight="bold" />
                </button>

                {/* Última página */}
                <button
                    className={`${styles.paginationButton} ${styles.navButton}`}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || totalPages <= 1}
                    title="Última página"
                >
                    <CaretDoubleRight size={20} weight="bold" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
