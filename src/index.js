import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import MyProfile from "./pages/profile";
import MyHome from "./pages/home";

//login page
const user = {
  "First Name": "abc",
  "Last Name": "dfena",
  Username: "aabidraina5",
  Email: "a@b.c",
  Age: 111,
  "Contact Number": 434324324234324,
};
const followingList = ["Kaydence Adams",
"Erika Wilcox",
"Yareli Werner",
"Sylvia Khan",
"Cash Larson",
"Kendall Day",
"Raegan Oneill",
"Nigel Hall",
"Jalen Marquez",
"Naomi Mueller",
"Katelynn Key",
"Jayda Mcdowell",
"Roberto Caldwell",
"Leticia Park",
"Carter Price",
"Josiah Henson",
"Lilah Schneider",
"Kenley Hancock",
"Miley Gilmore",
"Joy Clements",
"Jamari Small",
"Eliana Curry",
"Pierce Guzman",
"Helen Chambers",
"Enzo Swanson",
"Anabella Armstrong",
"Reed Cain",
"Reilly Joseph",
"Jefferson Holloway",
"Bruno Jarvis",
"Harrison Flores",
"Leandro Lozano",
"Leandro Terry",
"George Garrison",
"Marie Gay",
"Marley Owen",
"Shannon Boyd",
"Karma Willis",
"Braiden Osborn",
"Reagan Bryant",
"Raegan Mcdonald",
"Juliana Long",
"Mina Weiss",
"Sharon Fry",
"Kristina Russell",
"Kaiya Cummings",
"Abril Eaton",
"Broderick Rasmussen",
"Solomon Bradshaw",
"Ramiro Hooper",
"Adison Kelley",
"Braiden Murphy",
"Lina York",
"Joseph Davidson",
"Ireland Fletcher",
"Lindsey Brady",
"Ashlee Bean",
"Abigayle Durham",
"Kaden Leach",
"Tatum Stark",
"Royce Gentry",
"Jordyn Holmes",
"Enrique Ray",
"Zack Blackwell",
"Rhett Shepard",
"Makayla Levine",
"Paula Flynn",
"Cristopher Mcclain",
"Lia Pugh",
"Rosemary Erickson",
"Jaydan Blackburn",
"Carl Schultz",
"Ciara Greer",
"Royce Cooke",
"Evelyn Mcconnell",
"Rodolfo Haley",
"Gemma Stephens",
"Iyana Adams",
"Troy Mclaughlin",
"Isaac Archer",
"Rocco Rodgers",
"Amiyah Woodward",
"Christine Hebert",
"Nyasia Hodge",
"Laura Ferrell",
"Devin Olsen",
"Kennedi Bullock",
"Kendrick Gutierrez",
"Bryce Whitaker",
"Jordan Romero",
"Jessie Lowe",
"Maia Wallace",
"Weston Rasmussen",
"Perla Ward",
"Heidi Nichols",
"Trevin Pollard",
"Aniyah Brandt",
"Karly Acevedo",
"Emilia Stevenson",]
const followerList = [
  "Josie Lang",
  "Austin Hood",
  "Jordyn Yoder",
  "Ishaan Mann",
  "Lorena Gregory",
  "Jorge Fowler",
  "Meghan Collins",
  "Sariah Hebert",
  "Kasey York",
  "Kaya Rhodes",
  "Kaliyah Mcgrath",
  "Kaya Castillo",
  "Lyric Banks",
  "Cassius Bullock",
  "Aryan Bryant",
  "Arabella Austin",
  "Alicia Lynch",
  "Santiago Cox",
  "Paulina Hickman",
  "Randall Galvan",
  "Cruz Robbins",
  "Madilynn Sweeney",
  "Harold Powers",
  "Brylee Bradshaw",
  "Karly Petersen",
  "Saniya Hutchinson",
  "Lana Duncan",
  "Nia Goodwin",
  "Shyla Klein",
  "Eve Massey",
  "Trenton Mccarthy",
  "Zane Barton",
  "Beckham Williams",
  "Landyn Cain",
  "Ayla Johnson",
  "Josh Macias",
  "Ansley Larson",
  "Jaida Mcknight",
  "Dayami Camacho",
  "Bridget Cannon",
  "Carley Shepherd",
  "Frank Richmond",
  "Kiersten Johnson",
  "Damarion Keller",
  "Wade Morrison",
  "Edith Patel",
  "Tommy Wallace",
  "Jakayla Anderson",
  "Carl Mejia",
  "Liam Norris",
  "Addyson Bowen",
  "Owen Lynch",
  "Finley Mcdaniel",
  "Samuel Patel",
  "Antonio Moon",
  "Preston Vazquez",
  "Liliana Collins",
  "Aaron Whitehead",
  "London Wall",
  "Sidney Odom",
  "Aliyah Moore",
  "Karlie Reese",
  "Josephine Randolph",
  "Guadalupe Raymond",
  "Sophie Schultz",
  "Scarlett Cain",
  "Diego Zimmerman",
  "Kason Berger",
  "Valentin Osborn",
  "Joey Curtis",
  "Brenna Valencia",
  "Blake Keith",
  "Slade Myers",
  "Aubrey Collier",
  "Andy Rodgers",
  "Asa Bass",
  "Jamie Ponce",
  "Elsa Mccann",
  "Nelson Calhoun",
  "Cannon Pitts",
  "Messiah Glenn",
  "Julien Cochran",
  "Kaya Coffey",
  "Brodie Snyder",
  "Quinten Rios",
  "Kasey Blanchard",
  "Jadon Benjamin",
  "Lucy Boone",
  "Gaven Nixon",
  "Ayden Bush",
  "Trystan Bradley",
  "Joy Wilkins",
  "Jacqueline Ramos",
  "Armani Harrell",
  "Marcus Matthews",
  "Maleah Guerra",
  "Haley Hawkins",
  "Bryson Steele",
  "Alivia Love",
  "Stanley Meza",
  "Liliana Peters",
  "Jamiya Andersen",
  "Reagan Gutierrez",
  "Lawrence Velazquez",
  "Kamryn Frost",
  "Luciana Trujillo",
  "Valeria Blanchard",
  "Guadalupe Griffin",
  "Harry Ferguson",
  "Edgar Deleon",
  "Jensen Bradley",
  "Natasha Li",
  "Naima Logan",
  "Alan Cabrera",
  "Emiliano Ford",
  "Jesus Cain",
  "Brittany Grant",
  "Ibrahim Mccarty",
  "Dallas Jimenez",
  "Pranav Martin",
  "Melvin Lynch",
  "Gabrielle Rivera",
  "Madden Simpson",
];

function MyApp() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(isLoggedIn);
  console.log(typeof isLoggedIn);

  //TODO: localStorage.getItem
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoggedIn == "true" ? <MyHome /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            exact
            path="/profile"
            element={
              isLoggedIn == "true" ? (
                <MyProfile user={user} followers = {followerList} following ={followingList} />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route exact path="login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyApp />);
