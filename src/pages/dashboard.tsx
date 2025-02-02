/* eslint-disable no-debugger */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom"; // for navigation
import { useAuth } from "../hooks/useAuth";
import { deleteBook, getBooks } from "../services/booksServices";
import { Button } from "primereact/button";
import { BookType } from "../types/Book";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (!user) {
    return <p>Loading...</p>;
  }
  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm);
    let filteredBooks: BookType[] = [];
    if (searchTerm !== "") {
      filteredBooks = booksList.filter((book) =>
        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filteredBooks = [...booksList];
    }
    if (filteredBooks.length === 0) {
      toast.info("No books found with the search term");
    }
    setBooksList(filteredBooks);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        const newBook = localStorage.getItem("book");
        if (newBook) {
          const newBookObj: BookType = JSON.parse(newBook);
          setBooksList([newBookObj, ...(Array.isArray(data) ? data : [])]);
        }
      } catch (error) {
        console.error("Error loading books", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  //delete Confirmation modle
  const confirmDelete = (bookId: string) => {
    confirmDialog({
      message: "Are you sure you want to delete this book?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setBooksList(booksList.filter((book: BookType) => book.id !== bookId));
        toast.success(`delete successful`);
      },
      reject: () => console.log("Delete canceled"),
    });
  };

  const actionTemplate = (rowData: BookType) => {
    return (
      <div className="flex gap-2">
        {/* View (Details) Button */}
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm"
          onClick={() => navigate(`/view/${rowData.id}`)}
        />

        {/* Edit Button */}
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-button-sm"
          onClick={() => navigate(`/edit-book/${rowData.id}`)}
        />

        {/* Delete Button */}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => confirmDelete(rowData.id)}
        />
      </div>
    );
  };
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
                      cursor-pointer
                      bg-indigo-400  py-7 px-4 text-white 
                      h-16 w-full md:w-[229px]  items-center rounded-xl border border-gray-200 
                       lg:!flex"
                      onClick={() => navigate("/add-book")}
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
                    <input
                      onChange={(e) => handleSearch(e.target.value)}
                      type="text"
                      className="h-16 w-full rounded-xl border border-gray-200 px-4 py-2 text-start font-['Hacen-Algeria'] text-xl font-normal"
                      placeholder="Search by book title..."
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
                  <DataTable
                    value={booksList || []}
                    paginator
                    loading={loading}
                    scrollable={false}
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rows={10}
                    rowsPerPageOptions={[10, 20, 50]}
                  >
                    <Column
                      field="Title"
                      header="Title"
                      style={{ width: "25%" }}
                    ></Column>
                    <Column field="Publisher" header="Publisher"></Column>
                    <Column field="Year" header="Year"></Column>
                    {/* <Column field="Pages" header="Pages"></Column> */}
                    <Column field="ISBN" header="ISBN"></Column>
                    <Column
                      body={actionTemplate}
                      header="Actions"
                      style={{ width: "20%" }}
                    />
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog />
    </>
  );
};

export default Dashboard;
