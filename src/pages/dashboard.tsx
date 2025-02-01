/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useAuth } from "../hooks/useAuth";
import { getBooks } from "../services/booksServices";
import { Button } from "primereact/button";
const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }
  const handleSearch = (book: string) => {
    console.log(book);
    // const filteredClassrooms = fetchedClassrooms.filter((classroom) =>
    //   classroom.name.toLowerCase().includes(term.toLowerCase())
    // );
    // setClassrooms(filteredClassrooms);
  };
  const [createBook, setCreateBook] = useState<boolean>(false);
  //bind table and pagination functions
  const [booksList, setBooksList] = useState([]);
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  const [loading, setLoading] = useState<boolean>(true);

  //getBooks(0, 10);
  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  // Fetch all books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooksList(data);
      } catch (error) {
        console.error("Error loading books", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <>
      <div className="container px-6 mx-auto grid">
        {/* main content */}
        <h2 className="my-6 text-2xl font-semibold">Books Store Dashboard</h2>
        <div className="flex h-screen w-full  items-start justify-center ">
          <div className="w-full">
            <div className="p-4 md:px-8 md:py-7 xl:px-10">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:flex-wrap">
                <div className="flex w-full justify-between  flex-wrap gap-4 lg:w-auto">
                  <h1 className="lg:hidden text-xl">Books</h1>

                  <div className="flex flex-wrap gap-4">
                    <button
                      className="
                      bg-indigo-400  py-7 px-4 text-white h-16 w-full md:w-[229px]  items-center rounded-xl border border-gray-200 
                      !hidden lg:!flex"
                      onClick={() => setCreateBook(true)}
                    >
                      <div className="w-full font-arabicFont text-xl font-medium leading-none text-white ltr:text-left rtl:text-right">
                        Add New Book
                      </div>
                      <div className="w-6 grow">
                        <span className="text-3xl text-white ">+</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className=" flex w-full items-center md:mt-0 xl:w-4/12">
                  <div className="relative w-full">
                    {/* onChange={handleSearch} */}
                    <input
                      type="text"
                      className="h-16 w-full rounded-xl border border-gray-200 px-4 py-2 text-start font-['Hacen-Algeria'] text-xl font-normal"
                      placeholder="Search for books"
                    />
                    <div className="pointer-events-none absolute inset-y-0 flex items-center p-3 ltr:right-0 rtl:left-0">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-4.35-4.35M15 9a6 6 0 11-12 0 6 6 0 0112 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-8  xl:px-10">
              <div className=" overflow-x-auto">
                <div className="card">
                  {JSON.stringify(booksList)}
                  {/* <ul>
                    {booksList.map((book) => (
                      <li key={book.id}>
                        {book.title} - {book.author}
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
