import express from 'express';
import { addMovie, deleteMovie, getAllMovies, getMovieById } from '../controllers/movie-controller.js';
const movieRouter = express.Router();
movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieById);
movieRouter.post("/",addMovie);
movieRouter.delete("/:id",deleteMovie);


export default movieRouter;