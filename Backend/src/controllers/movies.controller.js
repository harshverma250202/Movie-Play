import { Movie } from "../models/movies.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

export const Get_All_Movies = asyncHandler(async (req, res) => {
    try {
      const movies = await Movie.find({}).limit(21);
      res.send(movies);
    } catch (error) {
      res.status(500).send(error);
    }
  });  

export const Get_Movie_ById = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    if (!movies) {
      res.status(404).send();
    } else {
      res.send(movies);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


export const Create_Movie = asyncHandler(async (req,res) => {
  try {

    if (req.body.released && req.body.released.$date && req.body.released.$date.$numberLong) {
      req.body.released = new Date(parseInt(req.body.released.$date.$numberLong));
    }
      const movies = new Movie(req.body);
      await movies.save();
      res.status(201).send(movies);
  } catch (error) {
      res.status(400).send(error);
  }
}) ;

export const Update_Movie = asyncHandler(async (req, res) => {
  try {
    if (req.body.released && req.body.released.$date && req.body.released.$date.$numberLong) {
      req.body.released = new Date(parseInt(req.body.released.$date.$numberLong));
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});


export const Delete_Movie= asyncHandler(async (req,res) => {
  try {
      const movies = await Movie.findByIdAndDelete(req.params.id);
      if (!movies) {
          return res.status(404).send();
      }
      res.send(movies);
  } catch (error) {
      res.status(500).send(error);
  }
}) ;