import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { data, Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(( )=> {
        getAllMovies()
        .then((data)=> setMovies(data.movies))
        .catch(err=> console.log(err));
    },[]);
    return (
    <Box width={'100%'} height={'100%'} margin ="auto" marginTop= {2}>
            <Box margin={'auto'} width={"80%"} height={"40vh"} padding={2}>
                <img src="https://wallpaperswide.com/download/horizon_zero_dawn_2017_video_game-wallpaper-2880x1200.jpg" alt="Schedule 1"
                width={"100%"}
                height={"100%"}
                />
            </Box>
            <Box padding={5} margin={"auto"}>
                <Typography variant="h4" textAlign={"center"}>Latest Releases</Typography>
            </Box>
            <Box margin={"auto"} display={"flex"} width={"80%"} justifyContent={"center"} flexWrap={"wrap"}>
                { movies && movies.slice(0,4).map((movie,index)=>(<MovieItem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}/>))}
            </Box>
            <Box display={"flex"} padding={5} margin="auto">
                <Button LinkComponent={Link} to="/movies" variant="outline" sx={{margin:'auto', color:"#2b2d42"}}> 
                    View All Movies
                </Button>
            </Box>
    </Box>
    )
};

export default HomePage;