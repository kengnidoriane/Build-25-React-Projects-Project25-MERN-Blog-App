import { useContext, useEffect } from 'react'
import './styles.modules.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AddNewBlog() {

  const {formData, setFormData, isEdit, setIsEdit} = useContext(GlobalContext);
  const navigate = useNavigate()
  const location = useLocation()

  // console.log(formData);

  async function handleSaveBlogToDatabase() {
    
    try {
      const response = isEdit ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`, {
        title: formData.title,
        description: formData.description
      }) : await axios.post('http://localhost:5000/api/blogs/add', {
        title: formData.title,
        description: formData.description
      })
  
      const result = await response.data;
      console.log(result);
      // pour vider le formulaire apres clique sur le bouton d'envoi
      if (result) {
        setIsEdit(false)
        setFormData({
          title: '',
          description: '',
        })
        navigate('/')
      }
      
    } catch (error) {
      console.error("Erreur lors de l'ajout du blog :", error);
    }
    
  }
  

  useEffect(() =>{
    console.log(location);
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true)
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description
      })
    }
  }, [location])


  return (
    <div className={'wrapper'}>
      <h1>{isEdit ? 'Edit a Blog' : 'Add A Blog'}</h1>
      <div className='formWrapper'>
        <input 
          type="text" 
          name='title'
          placeholder='Enter Blog Title'
          id='title'
          value={formData.title}
          onChange={(e) =>setFormData({
            ...formData,
            title: e.target.value
          })}
        />
        <textarea 
          name="description" 
          id="description"
          placeholder='Enter name description'
          value={formData.description}
          onChange={(event) =>setFormData({
            ...formData,
            description: event.target.value
          })}
        />
        <button onClick={handleSaveBlogToDatabase}>{isEdit ? 'Edit a Blog' : 'Add A Blog'}</button>
      </div>
    </div>
  )
}
