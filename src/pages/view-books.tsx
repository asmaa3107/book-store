/* eslint-disable no-debugger */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/booksServices";
import { BookType } from "../types/Book";

const ViewBooks = () => {
  const [book, setBook] = useState<BookType>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getBookData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getBookById(id);
        setBook(response);
      } catch (error) {
        if (error) {
          const localBook = localStorage.getItem(`book`);
          if (localBook) {
            setBook(JSON.parse(localBook));
          }
        }
        console.error("Error fetching book by id:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookData();
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      {/* Book Image */}
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img
          className="w-full"
          alt={book.Title}
          src={
            book.CoverPhoto ||
            "https://upload.wikimedia.org/wikipedia/en/0/06/The_Code_Book.jpg"
          }
        />
      </div>

      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-2xl leading-none text-gray-600">
            Book Name: {book.Title || ""}
          </h3>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
            Author: {book.Author || ""}
          </h1>
        </div>

        <div>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Pages: {book.Category}
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600">
            Published: {book.Edition || ""}
          </p>
          <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
            ISBN: {book.ISBN || ""}
          </p>
        </div>

        {/* Toggleable Extra Details */}
        <div className="border-t border-b py-4 mt-7 border-gray-200">
          <div className="flex justify-between items-center cursor-pointer">
            <p className="text-lg font-semibold">Notes: {book.Notes}</p>
            <p className="text-lg font-semibold">Notes: {book.brief || ""}</p>
          </div>

          <div className="pt-4 text-base leading-normal pr-12 mt-4 text-gray-600">
            {book.OlderVersion || "No additional details available."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
