import React, { useEffect, useState } from "react"; 
import { AppBar, Box, Toolbar, Autocomplete, TextField, Tab, Tabs, IconButton} from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { getAllMovies } from "../api-helpers/api-helpers.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminAction, userActions } from "../store/index.js";
const Header = () => { 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
        const [value, setValue] = useState();
        const [movies,setMovies] = useState([]);
        useEffect(() => {
           getAllMovies()
           .then((data) => setMovies(data.movies))
           .catch((err)=> console.log(err));
            
        }, []);
        const logout = (isAdmin) => {
            dispatch(isAdmin?adminAction.logout(): userActions.logout())
        }
        const handleChange = (e,val) => {
            const movie = movies.find((m)=> m.title === val);
            if(isUserLoggedIn) {
                navigate(`/booking/${movie._id}`);
            }

        }
    return  <AppBar position ="sticky" sx={{bgcolor:"#2b2d42"}}>
        <Toolbar>
            <Box width={ '20%'}>
                <IconButton LinkComponent={Link} to="/">
                <MovieFilterIcon/>
                </IconButton>
            </Box>
            <Box width={"30%"} margin={"auto"}>
            <Autocomplete
                onChange={handleChange}      
                freeSolo
                options={movies && movies.map((option) => option.title)}
                renderInput={(params) => <TextField sx={{input: {color:"white"}}}variant="standard" {...params} placeholder ="Search Across Movies" />}
            />
            </Box>
            <Box display={"flex"}>
                <Tabs textColor="white" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/movies" label="Movies"/>
                    {!isAdminLoggedIn && !isUserLoggedIn &&<>
                        <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                        <Tab LinkComponent={Link} to="/auth" label="Auth" /></>}
                    {isUserLoggedIn &&  (
                        <>
                        <Tab LinkComponent={Link} to="/user" label="Profile"/>
                        <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" />
                        </>
                    )}
                    {isAdminLoggedIn &&  (
                        <>
                        <Tab LinkComponent={Link} to="/add" label="Add Movie"/>
                        <Tab LinkComponent={Link} to="/user-admin" label="Profile"/>
                        <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" />
                        </>
                    )}
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>;
};
export default Header;