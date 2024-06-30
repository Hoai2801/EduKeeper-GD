export default function generatePageLinks(totalPage, activePage) {
    const pageLinks = [];
    if (totalPage >= 10) {
        for (let i = 0; i < totalPage; i++) {
            if (i >= 3 && i <= 6) {
                pageLinks.push(
                    <li key={i + 1}>
                        <div
                            href={`http://localhost:3000/dashboard/document/${i + 1}`}
                            className={`flex items-center ${
                                activePage === i + 1 ? "active-check" : ""
                            } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                        >
                            ...
                        </div>
                    </li>
                );
            } else {
                pageLinks.push(
                    <li key={i + 1}>
                        <div
                            href={`http://localhost:3000/dashboard/document/${i + 1}`}
                            className={`flex items-center ${
                                activePage === i + 1 ? "active-check" : ""
                            } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                        >
                            {i + 1}
                        </div>
                    </li>
                );
            }
        }
    } else {
        for (let i = 0; i < totalPage; i++) {
            pageLinks.push(
                <li key={i + 1}>
                    <div
                        href={`http://localhost:3000/dashboard/document/${i + 1}`}
                        className={`flex items-center ${
                            activePage === i + 1 ? "active-check" : ""
                        } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                    >
                        {i + 1}
                    </div>
                </li>
            );
        }
    }
    return pageLinks;
}