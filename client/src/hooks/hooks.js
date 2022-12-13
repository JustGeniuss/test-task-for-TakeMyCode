import { useState, useEffect } from "react";
import { getList } from "../api/index"

function useSearchList(page, limit, text) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError(false);

        getList(page, limit, text).then(res => {
            setList((prevData) => {
                if (page !== 0) {
                    return [...prevData, ...res.data.list]

                }
                return res.data.list
            });
            setHasMore(!res.data.isLastPage);
        })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })




    }, [page, limit, text]);

    return { isLoading, error, list, hasMore, setList };
}

export default useSearchList;
