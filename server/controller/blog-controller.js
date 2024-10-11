const mongoose = require('mongoose');
const Blog = require('../model/Blog');

// fetch list of blogs

// add a new blog
// delete a blog
// update a blog

const fetchListOfBlogs = async(req, res) =>{
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
    
  }
  if (!blogList) {
    return res.status(404).json({message: 'No Blogs Found'})
  }
  return res.status(200).json({blogList})
};

// const addNewBlog = async (req, res) => {
//   const { title, description } = req.body;
//   const currentDate = new Date();

//   const newlyCreateBlog = new Blog({
//     title,
//     description,
//     date: currentDate,
//   });

//   // Utilisation d'une session pour la sauvegarde
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     await newlyCreateBlog.save({ session });
//     await session.commitTransaction(); // Commit de la transaction
//     return res.status(201).json({ newlyCreateBlog }); // Réponse après succès
//   } catch (e) {
//     await session.abortTransaction(); // Annulation en cas d'erreur
//     console.error(e);
//     return res.status(500).json({ message: 'Erreur lors de l\'ajout du blog' }); // Réponse en cas d'erreur
//   } finally {
//     session.endSession(); // Fin de la session
//   }
// };


const addNewBlog = async(req, res)=>{
  const {title, description} = req.body;
  const currentDate = new Date();

  const newlyCreateBlog = new Blog({
    title, 
    description, 
    date: currentDate,
  })

  try {
    await newlyCreateBlog.save()

  } catch (e) {
    console.log(e);
    
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newlyCreateBlog.save({session});
    session.commitTransaction()

  } catch (e) {
    return res.send(500).json({message: e})
  }

  return res.status(200).json({newlyCreateBlog});
}

const deleteABlog = async(req, res)=>{
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrentBlog) {
      return res.status(404).json({message: 'Blog not found'})
    }
    return res.status(200).json({message: 'successfully Deleted'})

  } catch (e) {
    console.log(e);
    return res.status(500).json({message: 'Unable to delete ! Please try again'})
    
  }
}

const updateABlog = async(req, res)=>{
  const id = req.params.id;

  const {title, description} = req.body;
  let currentBlogToUpdate;

  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title, description
    })


  } catch (e) {
    console.log(e);

    return res.status(500).json({message: 'something went wrong while updating! please try again'})
    
  }

  if (!currentBlogToUpdate) {
    return res.status(500).json({message: 'unable to update'})
  }

  return res.status(200).json({currentBlogToUpdate})
};

module.exports = { fetchListOfBlogs, deleteABlog,updateABlog, addNewBlog}