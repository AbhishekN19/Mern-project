import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
    const [movies,setMovies] = useState();
    useEffect(()=> {
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch((err) => console.log(err));
    },[]);
    return (
    <Box margin={'auto'} marginTop={4}>
        <Typography variant="h3" padding={2} textAlign={"center"} width={"40%"}  margin={"auto"} textAlign="center"
        bgcolor={"#900C3F"} color="white">All Movies</Typography>
        <Box width={"100%"} margin={"auto"} marginTop={5} display={'flex'} justifyContent={"center"} flexWrap={"wrap"}>
            {
                movies&& movies.map((movie,index) => <MovieItem title={movie.title} key={index} id={movie._id} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate}/>)
            }
        </Box>
    </Box>
    )
};

export default Movies;