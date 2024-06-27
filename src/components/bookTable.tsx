// import { ClipLoader } from "react-spinners";
import { BookTableProps } from "../types/types";
import { useState, useCallback } from "react";

export const BookTable = ({ books, onDelete, onEdit }: BookTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleNext = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <table className="min-w-full rounded-md bg-blue-100 transition transform hover:shadow-lg hover:translate-x-2 divide-y divide-gray-400 mt-4">
        <thead>
          <tr>
            <th className="py-3">Title</th>
            <th className="py-3">Author</th>
            <th className="py-3">Year</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="py-4">{book.title}</td>
              <td className="py-4">{book.author}</td>
              <td className="py-4">{book.year}</td>
              <td className="py-4">
                {book.id !== undefined && (
                  <>
                    <button
                      onClick={() => onEdit(book)}
                      className="bg-blue-900 hover:bg-blue-400 text-white p-2 w-20 rounded-md mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(book.id!)}
                      className="bg-red-600 hover:bg-red-400 w-20 text-white p-2 rounded-md mx-1"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-black hover:bg-blue-400 text-white w-40 rounded-md p-2"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-black hover:bg-blue-400 text-white rounded-md w-40 p-2"
        >
          Next
        </button>
      </div>
      <div className="text-center mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default BookTable;
