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

<img width="1165" alt="Screen Shot 2022-03-24 at 12 17 30 AM" src="https://user-images.githubusercontent.com/77020125/159841208-f00fff80-f56e-462c-961b-1e1aadcc94b8.png">

Once the user has logged in, they will be redirected to the page below. This is our search page, where the user can search for charities and sift through the results. We have a typical search bar at the top-middle of the page. Below are placeholders for charity results. In our actual application the charity name will be displayed with more information such as a mission statement, photo, location etc so they will be bigger preview boxes. There is a little plus sign on the side where a user can click and add the charity to their favorites. After the charity is added to favorites, the plus sign becomes a check mark. Also, all of our pages (except login and profile) have a sidebar. This side bar displays the user's profile picture and two dropdown menus. The first leading to the profile page, where the account's settings can be edited. Then there is a Manage dropdown menu with options to access their liked posts, favorite charities, charity lists and donation-tracker. Lastly, there is a sign out button at the bottom. 

<img width="1013" alt="Screen Shot 2022-03-24 at 12 18 56 AM" src="https://user-images.githubusercontent.com/77020125/159841314-9819af22-c556-4238-8a7e-3f663ae3c972.png">

Next, we have the profile/account settings page. This page is accessed by clicking the Settings option under the Account dropdown menu in the sidebar. Again, we have the user's profile picture displayed in the upper left-hand corner. We have a small pencil button that will allow the user to edit and change their profile picture. Under that, we have text input boxes where a user can edit their full name and username, change the email associated with their account, reset their password and add or edit their location. We also have a text box for the user to add a bio if they'd like. Then, we have a manage my reviews section where the user can review reviews (lol) that they've written for charities. They can alos edit them hence the pencile symbol again. Whimsical didn't have the option, but we'd like to have a vertical scroll bar for the reviews section as well (separate from the webpage one). 

<img width="1013" alt="Screen Shot 2022-03-24 at 12 21 34 AM" src="https://user-images.githubusercontent.com/77020125/159841581-b5ade030-64b8-4eb7-b2c5-738940204cb9.png">

All the following pages can be accessed from the Manage dropdown menu:

The favorites page will list all the user's favorited charities. This is where users can access their favorited charities to review charity information or remove a charity from their favorites. Users can unfavorite a charity by clicking the check mark, which will become a minus sign, and it will be gone from their favorites upon refresh. We may add a separate vertical scroll bar so when the user is going through their favorited charities only the charitiy information pages move while the favorites title, icon and sidebar do not.

<img width="1014" alt="Screen Shot 2022-03-24 at 12 22 09 AM" src="https://user-images.githubusercontent.com/77020125/159841635-fb877f64-4c02-4718-ba41-a6266e6965eb.png">

The likes page is similar to the favorites page except it displays the posted charity lists of other users that the user has liked. The posts will be displayed by most recently like and have a little heart icon with the amount of likes the post has received. The user can aloso unlike posts from here. 

<img width="1020" alt="Screen Shot 2022-03-24 at 12 22 32 AM" src="https://user-images.githubusercontent.com/77020125/159841685-f8998ae9-4933-4ef4-b97f-c84fcc9a5202.png">

The lists page is where the user can create and post a new charity list. Lists are posts users can make that list charities by a sepcific category. For example, a user can create a list of animal related charities that they find reliable, close to them in location, agree with their mission, etc. Users can edit or delete their lists. 

<img width="1013" alt="Screen Shot 2022-03-24 at 12 23 09 AM" src="https://user-images.githubusercontent.com/77020125/159841737-47c94df3-0c85-4d51-8d20-398da1bb34cb.png">

Lastly, we have a donations page. This page will have an embedded spreadsheet that the user can edit and manually keep track of their donations for tax return purposes. The user can add more rows and scroll through their donations. 

<img width="1012" alt="Screen Shot 2022-03-24 at 12 23 39 AM" src="https://user-images.githubusercontent.com/77020125/159841801-5149ffc2-f91f-481b-a305-ed035bba6023.png">


# HTML and CSS

Login Page Mockup

<img width="1440" alt="Screen Shot 2022-03-26 at 11 11 05 AM" src="https://user-images.githubusercontent.com/77020125/160245719-a962de5a-bca3-4b02-a49f-f374b1467f77.png">

Search Page Mockup

<img width="1440" alt="Screen Shot 2022-03-26 at 11 11 59 AM" src="https://user-images.githubusercontent.com/77020125/160245749-dfad1e7c-42bc-488b-b80c-3d1aa7c62146.png">

Profile Page Mockup 

<img width="1439" alt="Screen Shot 2022-03-26 at 11 15 16 AM" src="https://user-images.githubusercontent.com/77020125/160245854-7b83a97e-5fd6-488f-aacd-da7bd8498bf8.png">
<img width="1440" alt="Screen Shot 2022-03-26 at 11 15 33 AM" src="https://user-images.githubusercontent.com/77020125/160245865-7fdcaf6f-bfa0-4bff-80ee-5de09bb61802.png">

Favorites Page Mockup 

<img width="1440" alt="Screen Shot 2022-03-26 at 11 15 56 AM" src="https://user-images.githubusercontent.com/77020125/160245873-772b708a-c0bb-4c8d-a78e-55601352afee.png">

Likes Page Mockup

<img width="1440" alt="Screen Shot 2022-03-26 at 11 16 20 AM" src="https://user-images.githubusercontent.com/77020125/160245880-58bf6126-8124-4690-b999-c99824713ff8.png">

Lists Page Mockup

<img width="1440" alt="Screen Shot 2022-03-26 at 11 17 35 AM" src="https://user-images.githubusercontent.com/77020125/160245911-cdb6e149-c859-492d-99de-9d9c0b5524ee.png">
<img width="1440" alt="Screen Shot 2022-03-26 at 11 17 56 AM" src="https://user-images.githubusercontent.com/77020125/160245922-a0ad709b-7638-4583-bf47-d3b50b403e0f.png">

Donations Page Mockup 

<img width="1440" alt="Screen Shot 2022-03-26 at 11 18 24 AM" src="https://user-images.githubusercontent.com/77020125/160245935-4eb3007a-f65e-4c09-bde5-330f3d0e3769.png">

#Division of Labor
Parsua: Data Interactions, Wireframes, Login, Donations
Paarth: Sidebar, Search
Eddie: Profile, Favorites
Mat: Data Interactions, Likes, Lists 

# Milestone 1 Release (Message)
* Outlined interactions between users and data.
* Designed and drew wireframes for proposed website.
* Created a polished web interface with HTML and CSS code. 

