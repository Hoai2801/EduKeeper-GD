import { useMemo } from "react";

const usePagination = (totalPage, currentPage, slibingCout = 1) => {
  const generateArr = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  };

  const pagination = useMemo(() => {
    const minPagination = 6;

    if (totalPage <= minPagination) return generateArr(1, totalPage);

    const isShowLeft = currentPage - slibingCout > 2;
    const isShowRight = currentPage + slibingCout < totalPage - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = totalPage - 3;
      const rightArr = generateArr(rightStart, totalPage);
      return [1, "...", ...rightArr];
    }

    if (!isShowLeft && isShowRight) {
      const leftArr = generateArr(1, 4);
      return [...leftArr, "...", totalPage - 1, totalPage];
    }

    const siblingLeft = Math.max(currentPage - slibingCout, 1);
    const singlingRight = Math.min(currentPage + slibingCout, totalPage);

    if (isShowLeft && isShowRight) {
      const middArr = generateArr(siblingLeft, singlingRight);
      const leftArr = generateArr(1, 2);
      return [...leftArr, "...", ...middArr, "...", totalPage];
    }
  }, [totalPage, currentPage, slibingCout]);

  return pagination;
};

export default usePagination;
