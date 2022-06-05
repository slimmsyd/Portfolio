import React, {ChangeEvent, ChangeEventHandler, FormEvent, useState} from 'react';
import axios from 'axios'
import '../styles/Contact.scss'

type FormState = {
    email: string,
    name: string;
    message: string;
};

type ServiceMessage = { 
    class: string;
    text: string;
};

export default function Contact() { 

    const formId = "ucTSWJ9b";
    const formSparkURL = `https://submit-form.com/${formId}`;
    

    const initialFormState ={
        email: '',
        name: '',
        message: '',
    };
    //Typescript FormState
    const [formState, setFormState] = useState<FormState>(initialFormState);
    //submit State
    const [submitting, setSubmitting] = useState(false);
    //Set if form submission was successful
    //Type ServiceMessage
    const [message, setMessage] = useState<ServiceMessage>();

    //submits form
    const submitForm = async(event: FormEvent) => { 
        event.preventDefault();
        setSubmitting(true);
        await postSubmission();
        setSubmitting(false);
    }

    const postSubmission = async() => { 
        const payload = {
           ...formState
        };

        try { 
            const result = await axios.post(formSparkURL, payload)
            console.log(result)
            setMessage( { 
                class: "blueText",
                text: "Thanks For Reaching Out"
            })
        }catch(err) {
            console.log(err);
            setMessage({
                class: "redText",
                text: "Sorry, The Message Was Not Sent"
            })
        }
    };

    //Update form controls function
    const updateFormControl = (event: ChangeEvent  <HTMLInputElement |HTMLTextAreaElement>) => {
        const {id, value} = event.target;
        const formKey = id as keyof FormState;
        //shallow copy of original state
        const updatedFormState = {...formState};
        //[formKey] == Id {value} == what user Types
        updatedFormState[formKey] = value;
        setFormState(updatedFormState);       


    };


    return ( 
        <footer className = "contactSection">
            <div className = "whatIDo">
                    <h2> Get In Touch ^_^ </h2>
                    </div>
                    {/* You'll Want To Dipslay The Subit Message */}
                    {message && (    <div className = {`${message.class} `}> {message.text}</div>)}
                    
                
                    <div className = "contactDiv"> 
                        <form onSubmit =  {submitForm} className = "formDiv">
                        <label htmlFor='name'>Name</label>
                            <input value = {formState.name} className='name' type = "string" id = "name"   onChange={updateFormControl} required></input>
                        <label htmlFor='email'>Email</label>
                            <input value ={formState.email} onChange={updateFormControl} className='email' type = "string" id = "email"  required></input>
                            <label htmlFor='message'>Message</label>

                           
                            <textarea value = {formState.message} onChange={updateFormControl} id = "message" ></textarea>
                            <button disabled = {submitting} className='text' type = "submit" id = "text" > {submitting ? "Submitting" : 'Submit'} </button>
                        </form>
                           
                        </div>

            </footer>


    )

}