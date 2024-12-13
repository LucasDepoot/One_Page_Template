import { useState } from "preact/hooks";
import emailjs from "@emailjs/browser";
import "../styles/form.css";

const Form =() => {

    const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;

    emailjs.init({
        publicKey:PUBLIC_KEY,
        blockHeadless:true,
        limitRate : {
            throttle:5000
        },
    });
    
    const [formData,setFormData]=useState({
        user_name:"",
        user_phone:"",
        user_email:"",
        mail_object: "",
        message:"",
        mail_control:""
    });
    const [userError,setUserError]=useState(false);
    const [mailIsSend,setMailIsSend]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    
 const handleSendMail= (e)=>{
    e.preventDefault();
    if(
        formData.user_name.trim().length===0 ||
        formData.user_phone.trim().length===0  || 
        formData.mail_object.trim().length===0 ||
        formData.message.trim().length===0 ||
        formData.mail_control.length!=0
    ){
        setUserError(true);
    }else{
        setIsLoading(true);
        setUserError(false);

        const templateParams = {
            user_name:formData.user_name,
            user_phone:formData.user_phone,
            user_email:formData.user_email,
            mail_object:formData.mail_object,
            message:formData.message
        };

        emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
        )
            .then(()=>{ 
                setIsLoading(false);
                setMailIsSend(true);
                setFormData({
                    user_name:"",
                    user_phone:"",
                    user_email:"",
                    mail_object: "",
                    message:""
                })
            })
            .catch((err)=>{
                console.log(err);
                setIsLoading(false);
                setMailIsSend(false);
            });
    };
 };
   
    return (
        <form onSubmit={handleSendMail}>
            <div>
                <label htmlFor="name">Votre nom  : <span>*</span></label>
                <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.user_name} 
                    spellcheck={false}
                    placeholder="Votre nom et prénom"
                    onChange={(e)=>{{setFormData({...formData, user_name:e.target.value})}}}
                    required
                />
            </div>
            <div> 
                <label htmlFor="email">Votre email : <span>*</span></label>
                <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.user_email} 
                    spellcheck={false}
                    placeholder="Votre adresse email"
                    onChange={(e)=>{{setFormData({...formData, user_email:e.target.value})}}}

                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Votre numéro de téléphone  : <span>*</span></label>
                <input
                    type="text"
                    id="phone"
                    name="user_phone"
                    pattern="[0-9]{2}(\s?[0-9]{2}){4}"
                    value={formData.user_phone} 
                    spellcheck={false}
                    placeholder="06 01 02 03 04"
                    onChange={(e)=>{{setFormData({...formData, user_phone:e.target.value})}}}
                    required
                />
            </div>
            <div>
                <label htmlFor="subject"> Objet : <span>*</span></label>
                <input
                    type="text"
                    id="subject"
                    name="mail_object"
                    value={formData.mail_object} 
                    placeholder="Objet de votre message"
                    onChange={(e)=>{{setFormData({...formData, mail_object:e.target.value})}}}
                    required
                />
            </div>
            <div style="visibility:hidden;height:0px">
                <label htmlFor="captcha">Captcha : <span>*</span></label>
                <input
                    type="text"
                    id="captcha"
                    name="mail_control"
                    value={formData.mail_control} 
                    placeholder="1+1= Notez le resultat"
                    onChange={(e)=>{{setFormData({...formData, mail_control:e.target.value})}}}
                />
            </div>
            <div>
                <label htmlFor="message">Votre message : <span>*</span></label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message} 
                    placeholder="Votre message"
                    rows="5"
                    onChange={(e)=>{{setFormData({...formData, message:e.target.value})}}}
                    required
                ></textarea>
            </div>
            {isLoading ? <div class="loader"></div>:""}
            {userError?<p class="error-message">Veuillez remplir tous les champs du formulaire.</p>: ""}
            <div>
                {mailIsSend === null && ''}
                {mailIsSend=== true && <p class="success-message">Votre message a bien été envoyé.</p>}
                {mailIsSend=== false && <p class="error-message">Un probleme est survenue, veuillez me contacter directement par mail ou téléphone.</p>}
            </div>
            <div>
                <button type="submit">Envoyer</button>
            </div>
    </form>
    )
}
export default Form;