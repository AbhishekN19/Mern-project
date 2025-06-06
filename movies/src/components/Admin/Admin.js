import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminAction } from "../../store";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onResReceived = (data) => {
        console.log(data);
        dispatch(adminAction.login());
        localStorage.setItem("adminId",data.id);
        localStorage.setItem("token", data.token);
        navigate("/");
    }
    const getData = (data) => {
        console.log("Admin",data);
        sendAdminAuthRequest(data.inputs)
        .then(onResReceived)
        .catch((err) => console.log(err));
    };
    return (
    <div>
        <AuthForm onSubmit={getData} isAdmin={true}/>
        </div>
    );
};

export default Admin;