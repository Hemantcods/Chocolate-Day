import  { useState } from 'react'
import { encryptData } from '../utils/security'
import heartImg from '../assets/heart.png'
import Snackbar from '@mui/material/Snackbar';
import { Slide } from '@mui/material';
const  CreateLink= () => {
  const [form, setForm] = useState({ name: '', message: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [snackbar,opensnackbar]=useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const encrypted = encryptData(form);
    if (encrypted) {
      // Generate the link with the encrypted data as a query parameter
      const link = `${window.location.origin}/link?data=${encodeURIComponent(encrypted)}`;
      setGeneratedLink(link);
      setSnackbarMessage('Link generated successfully!');
      opensnackbar(true);
    }
  }

  if (generatedLink) {
    return (
      <div className='h-screen w-full flex justify-center items-center relative bg-pink-100'>
        <div className="absolute w-full h-full z-0 opacity-10" style={{ backgroundImage: `url(${heartImg})`, backgroundSize: '40px', backgroundRepeat: 'space' }}>     
        </div>
      <div className='h-screen w-full flex justify-center items-center px-4 absolute z-10'>
        <div className='bg-pink-400 p-10 rounded-2xl flex flex-col justify-center items-center gap-5 w-full max-w-2xl'>
          <h3 className='text-2xl text-white text-center'>Here is your Link:</h3>
          <div className='bg-white p-3 rounded w-full break-all text-center'>
            {generatedLink}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(generatedLink).then(()=>{
              setSnackbarMessage('Link copied to clipboard');
              opensnackbar(true);
            })} 
            className='bg-white px-6 py-2 rounded-2xl font-bold text-pink-500 hover:bg-gray-100'
            >
            Copy Link
          </button>
          <button onClick={() => setGeneratedLink('')} className='text-white underline mt-2'>Create Another</button>
        </div>
        <Snackbar open={snackbar} message={snackbarMessage} autoHideDuration={5000} onClose={() => opensnackbar(false)} slots={{ transition: Slide }} />
      </div>
     </div>  
    )
  }

  return (
    <>
    <div className='h-screen w-full flex justify-center items-center relative bg-pink-100'>
        <div className="absolute w-full h-full z-0 opacity-10" style={{ backgroundImage: `url(${heartImg})`, backgroundSize: '40px', backgroundRepeat: 'space' }}>     
        </div>
        <div className='absolute w-full h-full z-10 flex justify-center items-center px-4'>
 <form onSubmit={handleSubmit} className='w-full flex justify-center'>
      <div className='bg-pink-400 w-full max-w-2xl rounded-2xl flex flex-col justify-center items-center p-8 gap-4'>
        <h3 className='text-2xl text-white pb-4 text-center'>Send Your Chocolate</h3>
        <div className="name w-full max-w-xl">
            <h4 className='text-white mb-2'>Enter Your Name:</h4>
            <textarea name="name" value={form.name} onChange={handleChange} className='bg-white border-0 w-full h-12 resize-none rounded-3xl p-3 pl-3 outline-none' required></textarea>
        </div>
        <div className="message w-full max-w-xl">
          <h4 className='text-white mb-2'>Message:</h4>
          <textarea name='message' value={form.message} onChange={handleChange} className='bg-white border-0 w-full h-32 rounded-3xl resize-none p-5 outline-none' required>
          </textarea>
        </div>
        <button  type='submit'  className='bg-white w-40 h-10 rounded-2xl mt-4 font-bold text-pink-500'>Generate Link</button>
      </div>  
      </form>
        </div>
     
    </div>
    </>
)}

export default CreateLink