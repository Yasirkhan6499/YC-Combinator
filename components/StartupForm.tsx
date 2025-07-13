"use client";

import React, {use, useActionState, useState} from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { form } from 'sanity/structure';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';



const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,
    string>>({});
    const [pitch, setPitch] = React.useState("");
    const router = useRouter();

    
  // Handle form submission
    const handleFormSubmit =async (prevState:any, formData: FormData)=>{
      try {
        setErrors({}); 

        const formValues = {
          title: formData.get("title") as string,
          description : formData.get("description") as string,
          category: formData.get("category") as string,
          link: formData.get("link") as string,
          pitch,
        }

        await formSchema.parseAsync(formValues);

        const result = await createPitch(prevState, formData, pitch);
        // If validation passes, you can proceed with form submission logic
        if(result.status === "SUCCESS"){
          toast.success("Startup submitted successfully!");
        }
        router.push(`/startup/${result._id}`);
        return result; 

      }catch(error){
        //set errors
        if(error instanceof z.ZodError){
          const fieldErrors = error.flatten().fieldErrors;

          setErrors(fieldErrors as unknown as Record<string, string>)
          // show a toast msg
          toast('Please fix the errors in the form');

          return {...prevState, error: "Validation failed", status: "ERROR"};
        }
        // if error is not a ZodError, handle it accordingly
        return {...prevState, error: "An unexpected error occurred", status: "ERROR"};

      }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit,{
      error: "",
      status:"INITIAL",
    })


  return (
    <form action={formAction} className='startup-form'>
      {/* Title field */}
        <div>
         <label htmlFor='title' className='startup-form_label'>
            Title
         </label>
         <Input
         id="title"
         name="title"
         className='startup-form_input'
         required
         placeholder="Startup Title"
         />
        </div> 
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}

         {/* Description field */}
        <div>
         <label htmlFor='description' className='startup-form_label'>
            Description
         </label>
         <Textarea
         id="description"
         name="description"
         className='startup-form_textarea'
         required
         placeholder="Startup Description"
         />
        </div> 
        {errors.descirption && <p className='startup-form_error'>{errors.description}</p>}

         {/* Category field */}
        <div>
         <label htmlFor='Category' className='startup-form_label'>
            Category
         </label>
         <Input
         id="category"
         name="category"
         className='startup-form_input'
         required
         placeholder="Startup Category (Tech, Health, Education etc"
         />
        </div> 
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}

        {/* Image field */}
        <div>
         <label htmlFor='link' className='startup-form_label'>
            Image URL
         </label>
         <Input
         id="link"
         name="link"
         className='startup-form_input'
         required
         placeholder="Startup Image URL"
         />
        </div> 
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}

          {/* Pitch field */}
        <div data-color-mode="light">
         <label htmlFor='ptich' className='startup-form_label'>
            Pitch
         </label>
          <MDEditor
           value={pitch}
           onChange={(value)=>setPitch(value as string)}
           id="pitch"
           preview="edit"
           height={300}
           style={{borderRadius: 20, overflow: "hidden"}}
           textareaProps={{
            placeholder:"Briefly describe your startup idea, what problem it solves, and how it stands out from the competition."
           }}
           previewOptions={{
            disallowedElements: ["style"],
           }}
           />
        </div> 
        {errors.pitch && <p className='startup-form_error'>{errors.link}</p>}

           {/* button */}
          <Button type="submit" className="startup-form_btn"
          disabled={isPending}>
            {isPending ? 'Submitting...' : "Submit Your Startup"}
            <Send className="size-6 ml-2" />
          </Button>
    </form>
  )
}

export default StartupForm;