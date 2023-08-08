import React from "react";


interface PaginationProps {
    pageNumber: number;
    hasPrevious?: boolean;
    hasNext?: boolean;
    fetchData: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    pageNumber, hasPrevious, hasNext, fetchData,
}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="btn btn-group">
                {hasPrevious && (
                    <button className="btn" onClick={() => { fetchData(Number(pageNumber) - 1); }}>
                        «
                    </button>
                )}
                <button className="btn">Page{pageNumber}</button>
                {hasNext && (
                    <button className="btn" onClick={() => { fetchData(Number(pageNumber) + 1); }}>
                        »
                    </button>
                )}
            </div>
        </div>
    )
}
export default Pagination