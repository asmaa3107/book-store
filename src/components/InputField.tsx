/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from 'react-hook-form';
import ErrorText from './ErrorText';


export type InputFieldProps = {
  labelText: string;
  type: string;
  placeholder: string;
  register: ReturnType<UseFormRegister<any>>; 
  errorMessage?: string;
};
export default function InputField({
  labelText,
  type,
  placeholder,
  register,
  errorMessage,
}: InputFieldProps) {
  return (
    <div className="relative mb-4 block" style={{display:'flex',flexDirection:'column'}}>

     <label className="" htmlFor={labelText}>{labelText}</label>
   
      <input
        type={type}
        id={labelText}
        placeholder={placeholder}
        required={true}
       {...register}
      />
    
      {errorMessage && <ErrorText errorMessage={errorMessage} />}
    </div>
  );
}
