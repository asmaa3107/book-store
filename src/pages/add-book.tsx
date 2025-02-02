/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { BookType } from "../types/Book";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  id: yup.string().required("ID is required"),
  Title: yup.string().required("Book t is required"),
  Publisher: yup.string().required("Publisher is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .max(9999, "Price is too high")
    .test("decimal", "Price must have at most 2 decimal places", (value) =>
      /^\d+(\.\d{1,2})?$/.test(value?.toString() || "")
    )
    .required("Price is required"),
  isbn: yup.string().required("ISBN is required"),
  Year: yup.date().nullable().optional(),
  brief: yup
    .string()
    .max(800, "Brief must be at most 800 characters")
    .required("Book Brief is required"),
});

const AddBook = () => {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData: { label: string; value: string }[] = [
          { label: "Fantasy", value: "Fantasy" },
          { label: "Science Fiction", value: "Science Fiction" },
          { label: "Mystery", value: "Mystery" },
          { label: "Horror", value: "Horror" },
          { label: "Romance", value: "Romance" },
        ];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const { user } = useAuth();

  const onSubmit = (data: BookType) => {
    try {
      // use it if I had areal API
      // await addBook(data);
      localStorage.setItem("book", JSON.stringify(data));
      toast.success("Book added successfully", { position: "top-center" });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Book</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <input
          type="hidden"
          {...register("id", { value: Math.floor(Math.random() * 900) })}
          onChange={(e) => localStorage.setItem("id", e.target.value)}
        />
        <div className="mb-4">
          <label className="block font-semibold">Book Title</label>
          <InputText
            {...register("Title", { required: "Book Title is required" })}
            className={`w-full p-2 border ${
              errors.Title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.Title?.message && (
            <p className="text-red-500">{errors.Title.message.toString()}</p>
          )}
        </div>

        {/* Book Publisher */}
        <div className="mb-4">
          <label className="block font-semibold">Publisher</label>
          <InputText
            {...register("Publisher", {
              required: "Publisher name is required",
            })}
            className={`w-full p-2 border ${
              errors.Publisher ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.Publisher?.message && (
            <p className="text-red-500">
              {errors.Publisher.message.toString()}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Category</label>

          <Dropdown
            onChange={(e) => console.log(e.value)}
            options={categories}
            placeholder="Select a category"
            {...register("category", { required: "Category is required" })}
            className={`w-full ${errors.category ? "p-invalid" : ""}`}
          />
          {errors.category?.message && (
            <p className="text-red-500">{errors.category.message.toString()}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Price ($)</label>
          <InputText
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be at least $0.01" },
            })}
            className={`w-full p-2 border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {errors.price?.message && (
            <p className="text-red-500">{errors.price.message.toString()}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Release Date</label>
          <Calendar
            {...register("Year")}
            className={`w-full ${errors.Year ? "p-invalid" : ""}`}
          />
          {errors.Year?.message && (
            <p className="text-red-500">{errors.Year.message.toString()}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-semibold">ISBN</label>
          <InputText
            className="w-full"
            {...register("isbn", {
              required: "ISBN is required",
              pattern: {
                value:
                  /^(97[89]-\d{1,5}-\d{1,7}-\d{1,7}-\d{1})$|^(\d{1,5}-\d{1,7}-\d{1,7}-\d{1})$/,
                message: "Invalid ISBN format (Expected: 978-3-16-148410-0)",
              },
            })}
            placeholder="ex: 978-3-16-148410-0"
          />
          <p className="text-red-500">
            {errors.isbn?.message && (
              <p className="text-red-500">{errors.isbn.message.toString()}</p>
            )}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Book Brief</label>
          <InputTextarea rows={4} {...register("brief")} className="w-full" />
          <p className="text-red-500">{errors.brief?.message.toString()}</p>
        </div>

        <div className="flex justify-between mt-6">
          <Button label="Cancel" className="p-button-secondary" />
          <Button type="submit" label="Save" className="p-button-primary" />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
