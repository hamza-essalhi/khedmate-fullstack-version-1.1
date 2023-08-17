import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

// pagination still need som fix but logic is done

const Pagination = (props) => {
  const totalPages = props.totalPages;
  const handleClick = props.handleClick;
  const currentPage = props.currentPage;
  let pageNumbers = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <button onClick={() => handleClick(i)}>{i}</button>
        </li>
      );
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
      pageNumbers.push(
        <li key={-1}>
          <button>...</button>
        </li>
      );
      for (let i = totalPages - 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
    } else if (currentPage >= totalPages - 3) {
      for (let i = 1; i <= 2; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
      pageNumbers.push(
        <li key={-1}>
          <button>...</button>
        </li>
      );
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
    } else {
      pageNumbers.push(
        <li key={1} className={1 === currentPage ? "active" : ""}>
          <button onClick={() => handleClick(1)}>1</button>
        </li>
      );
      pageNumbers.push(
        <li key={-1}>
          <button>...</button>
        </li>
      );
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
      if (currentPage + 2 < totalPages - 1) {
        pageNumbers.push(
          <li key={-2}>
            <button>...</button>
          </li>
        );
      }
      for (let i = totalPages - 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={i === currentPage ? "active" : ""}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
    }
  }
  return (
    <ul>
      {currentPage > 1 ? (
        <li>
          <button onClick={() => handleClick(currentPage - 1)}>
            <BsFillCaretLeftFill></BsFillCaretLeftFill>
          </button>
        </li>
      ) : (
        <></>
      )}
      {pageNumbers}
      {currentPage < totalPages ? (
        <li>
          <button onClick={() => handleClick(currentPage + 1)}>
            <BsFillCaretRightFill></BsFillCaretRightFill>
          </button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Pagination;
