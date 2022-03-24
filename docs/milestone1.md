# Data Interactions

   Although search engines such as Google can be used to find charities, our web app aims to centralize the search for charities. Since milestone 0, we have weeded out some features and clarified our vision for the Charitable app. We have our features list and then a separate “stretch goals” list (features that are beyond the requirements of this project but we want to explore if we have time). 
   
  Features: 
  * A search engine for charities 
    - We will be using a charity API (or database) for this. 
  * Search filters to narrow down a user’s search 
    - Fields (based on the API) may include: charity name, street address, state, zip code, rating, IRS information, etc
  * Information profiles about charities
    - Our search result will return multiple information profiles?
    - Profiles include information such as location, rating (if available), financial information, etc 
  * User Accounts 
    - Username and password 
    - First and last name 
    - Age, gender, profile picture, contact information, location 
  * Favoriting 
  * Likes 
   - Users can like posts of other users 
  * Written reviews 
    - “upvote” written reviews of other users??
  * User Posts: users can create curated lists of charities (ex: a list of cat-related charities)
    
  Stretch goals: 
  * verification for charities
  * recommended charities
  * Visual themes (Eid, Ukraine, etc)

# Wireframes
To construct our wireframes, we primarily used Whimsical. The background for our web app was drawn digitally using a generic, ipad drawing app. Whimsical was quite limited with its formatting options, colors, fonts, etc and thus restricted wireframes somewhat. These wireframes are more like a guideline for our actual User Interface and we mostly used them as a reference for the placement of text boxes, buttons, etc. It is a rough draft of our vision for our application and many things are sure to be different in the final product.
Since our application is charity centered, we chose colors that are often (psychologically) associated with good faith and giving for our background. The blue and yellow color combination is commonly used for social justice. Also, Blue represents peace, reliability, and wisdom while yellow represents optimism and hope. Our background is an abstract rising sun, which is another symbol of hope. 
First, we have the login page. It is pretty standard. We have the user's profile picture displayed, input text boxes for the user's username and password (with a submit mechanism embedded), a sign up button and a link to reset your username or password if forgotten.

<img width="836" alt="Screen Shot 2022-03-23 at 1 57 56 PM" src="https://user-images.githubusercontent.com/77020125/159766040-1d332064-c81b-4f38-9677-41d09b9aac30.png">

Once the user has logged in, they will be redirected to the page below. This is our search page, where the user can search for charities and sift through the results. We have a typical search bar at the top-middle of the page. Below are placeholders for charity results. In our actual application the charity name will be displayed with more information such as a mission statement, photo, location etc so they will be bigger preview boxes. There is a little plus sign on the side where a user can click and add the charity to their favorites. After the charity is added to favorites, the plus sign becomes a check mark. Also, all of our pages (except login and profile) have a sidebar. This side bar displays the user's profile picture and two dropdown menus. The first leading to the profile page, where the account's settings can be edited. Then there is a Manage dropdown menu with options to access their liked posts, favorite charities, charity lists and donation-tracker. Lastly, there is a sign out button at the bottom. 

<img width="669" alt="Screen Shot 2022-03-23 at 1 59 15 PM" src="https://user-images.githubusercontent.com/77020125/159766057-318bba06-e496-4e20-9843-83736578500c.png">

Next, we have the profile/account settings page. This page is accessed by clicking the Settings option under the Account dropdown menu in the sidebar. Again, we have the user's profile picture displayed in the upper left-hand corner. We have a small pencil button that will allow the user to edit and change their profile picture. Under that, we have text input boxes where a user can edit their full name and username, change the email associated with their account, reset their password and add or edit their location. We also have a text box for the user to add a bio if they'd like. Then, we have a manage my reviews section where the user can review reviews (lol) that they've written for charities. They can alos edit them hence the pencile symbol again. Whimsical didn't have the option, but we'd like to have a vertical scroll bar for the reviews section as well (separate from the webpage one). 

<img width="675" alt="Screen Shot 2022-03-23 at 2 00 18 PM" src="https://user-images.githubusercontent.com/77020125/159766083-04cf74e0-baad-477c-a607-eefe8f3b7a39.png">

All the following pages can be accessed from the Manage dropdown menu. 
First

<img width="674" alt="Screen Shot 2022-03-23 at 1 59 41 PM" src="https://user-images.githubusercontent.com/77020125/159766124-1c0cb2eb-ee4c-41af-8e2e-abb8a1b3eed5.png">

<img width="676" alt="Screen Shot 2022-03-23 at 1 59 53 PM" src="https://user-images.githubusercontent.com/77020125/159766146-2318338f-2adc-4c96-abe6-3195d65bd470.png">

<img width="677" alt="Screen Shot 2022-03-23 at 2 01 10 PM" src="https://user-images.githubusercontent.com/77020125/159766272-2db9bc44-cb12-4fbe-8b24-758fdb16263e.png">

<img width="670" alt="Screen Shot 2022-03-23 at 2 00 50 PM" src="https://user-images.githubusercontent.com/77020125/159766290-2acc94a3-55c3-42b1-b9f0-d07fd68bc2a2.png">


# HTML and CSS


## Milestone 1 Release (Message)
* Outlined interactions between users and data.
* Designed and drew wireframes for proposed website.
* Created a polished web interface with HTML and CSS code. 

