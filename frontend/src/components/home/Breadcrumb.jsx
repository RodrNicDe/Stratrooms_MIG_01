import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";

function Breadcrumb({ items }) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = [""].concat(segments);

  return (
    <nav
      className="flex w-full absolute top-5 left-0 z-10 bg-gray-200 dark:bg-gray-900"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((seg, idx) => {
          const isLast = idx === crumbs.length - 1;
          const item = items
            ? items.find((item) => item.path === seg) || {
                name: seg.charAt(0).toUpperCase() + seg.slice(1),
              }
            : {
                name: seg.charAt(0).toUpperCase() + seg.slice(1),
              };
          const to = idx === 0 ? "/" : "/" + crumbs.slice(1, idx + 1).join("/");

          return (
            <li
              key={seg}
              className={`inline-flex items-center ${idx === 0 ? "pl-10" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {idx > 0 && (
                <Icon
                  name="separador"
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                />
              )}
              {item.link !== false && !isLast ? (
                <Link
                  to={to}
                  className={`inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300 ${
                    idx > 0 ? "ms-1" : ""
                  }`}
                >
                  {idx === 0 && <Icon name="home" className="w-4 h-4 me-2.5" />}
                  {item.name}
                </Link>
              ) : (
                <span
                  className={`inline-flex items-center text-sm font-medium ${
                    isLast
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-700 hover:text-primary-400 dark:text-gray-300 dark:hover:text-primary-400"
                  } ${idx > 0 ? "ms-1" : ""}`}
                >
                  {idx === 0 && <Icon name="home" className="w-4 h-4 me-2.5" />}
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
