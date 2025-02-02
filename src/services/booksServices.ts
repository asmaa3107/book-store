/* eslint-disable no-debugger */
import axios from "axios";
import { BookType } from "../types/Book";

const API_URL = "https://stephen-king-api.onrender.com/api/";

// Fetch all books
/**
 * Fetch all books
 * @returns {Promise<BookType[]>} - The list of books
 */
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}books`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Fetch a single book by ID
/**
 * Fetch a single book by ID
 * @param {string} id - The ID of the book to be fetched
 * @returns {Promise<BookType>} - The book data
 */
export const getBookById = async (id: string) => {
  try {
        // https://stephen-king-api.onrender.com/api/book/1
      
    const response = await axios.get(`${API_URL}/book/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData: Partial<BookType>) => {
  try {
        // eslint-disable-next-line no-debugger
  
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Update an existing book by ID
export const updateBook = async (id: string, bookData: Partial<BookType>) => {
  try {
        // eslint-disable-next-line no-debugger
  
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// Delete a book by ID
export const deleteBook = async (id: string) => {
  try {
        // eslint-disable-next-line no-debugger
  
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
