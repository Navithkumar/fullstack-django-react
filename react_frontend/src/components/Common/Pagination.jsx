import './pagination.css';

export default function CommonPagination({
    pagination,
    currentPage,
    onPageChange,
    pageSize = 5,
}) {
    const totalPages = Math.ceil(pagination.count / pageSize);

    if (totalPages <= 1) return null;

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (start > 1) pages.push(1, '...');
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages) pages.push('...', totalPages);

        return pages;
    };

    return (
        <div className="pagination-container">
            <button
                className={`pagination-btn ${
                    !pagination.previous ? 'disabled' : ''
                }`}
                disabled={!pagination.previous}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ⬅ Prev
            </button>

            {generatePageNumbers().map((page, idx) =>
                page === '...' ? (
                    <span key={idx} className="pagination-ellipsis">
                        ...
                    </span>
                ) : (
                    <button
                        key={idx}
                        className={`pagination-page-btn ${
                            page === currentPage ? 'active' : ''
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                className={`pagination-btn ${
                    !pagination.next ? 'disabled' : ''
                }`}
                disabled={!pagination.next}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next ➡
            </button>
        </div>
    );
}
