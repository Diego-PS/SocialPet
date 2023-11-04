import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from './Page1';
import Feed from "./Feed";
import Login from "./Login";
import ImageUploadPage from "./ImageUploadPage";
import Search from "./Search";
import Profile from "./Profile";
import Register from "./Register";
import NewCat from "./NewCat";

export const Router = () => {
   return(
        <BrowserRouter>
            <Routes>
                <Route element = { <Page1 /> } path="/" />
                <Route element = { <Feed /> } path="/Feed" />
                <Route element = { <Login /> } path="/Login" />
                <Route element = { <ImageUploadPage /> } path="/UploadPage" />
                <Route element = { <Search /> } path="/Search" />
                <Route element = { <Profile /> } path="/Profile" />
                <Route element = { <Register /> } path="/Register" />
                <Route element = { <NewCat /> } path="/NewCat" />
            </Routes>
       </BrowserRouter>
   )
}