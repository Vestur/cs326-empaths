# 1. API

| Endpoint | Description | Response example |
| -------- | ----------- | --------------- |
| `/createCharity` | Pass in a charity ein (id), add a charity to our database that can be extracted to a charity object |<pre>{ status: "success" }</pre> |
| `/getCharity` | Returns a charity object based on the ein passed in | <pre>{<br>  eid: 123123, <br>  name: "Best Charity", <br>  address: "123 Waldo St. Sunderland, MA 01375", <br>  accountability: 54, <br>  mission: "Destroy the world.", <br>  current_rating: 5, <br>  likes: 1001<br>} </pre> | 
| `/updateCharity` | Update the charity object (may not be necessary) |<pre>{ status: "success" }</pre> |
| `/deleteCharity` | Remove charity from database (pass in charity id) |<pre>{ status: "success" }</pre> |
| `/createLike` | Pass in charity id (add like to charity in database) |<pre>{ status: "success" }</pre> |
| `/deleteLike` | Undo a like (reduce number of likes charity has (add functionality to verify user doing the unliking had actually liked it) |<pre>{ status: "success" }</pre> |
| `/getLikedCharities` | Gives list of charity objects | <pre>[ CharityObject1, CharityObject2, CharityObject3 ]</pre>| 
| `/createReview` | Create a review object (add said review object to user and charity) | <pre>{<br>  rid: 234, <br>  uid: "asd3asda", <br>  chid: 123123, <br>  stars: 4,  <br>  text: "Great service!"<br>}</pre> |
| `/deleteReview` | Remove review from user and charity |<pre>{ status: "success" }</pre> | 
| `/getReviews` | Gives list of review objects for a user | <pre>[ 321, 234, 656 ]</pre> | 
| `/search` | Returns list of charity ids (i.e. the result of the search) | <pre>[ 123123, 423412, 5345 ]</pre> | 
| `/getDonation` | Return list of donations object | <pre>[{charity_name: "Best Charity", amount: 5, date: "4/20/22"}]</pre> | 
| `/createDonation` | Creates a donation object for a particular user and charity |<pre>{ status: "success" }</pre> | 
| `/deleteDonation` | Untrack a donation (you can't undo a donation) |<pre>{ status: "success" }</pre> | 
| `/createAccount` | Creates a user account using username, password, and email at a minimum |<pre>{ status: "success" }</pre> | 
| `/getAccount` | Returns a user object | <pre>{<br>  id: "as3ads9dsa",<br>  name: "John Roberts",<br>  username: "jroberts",<br>  email: "jroberts@hotmail.com",<br>  bio: "Hi, I'm John.", <br>  pfp: "https://google.com/", <br>  location: Massachusetts, <br>  favlist: [ ein1, ein2, ein3 ],<br>  likes: [ ein4, ein5, ein6 ],<br>  reviews: [ rid1, rid2, rid3 ],<br>  donations: []<br>}</pre> | 
| `/updateAccount` | Update fields in account/user object | <pre>{ status: "success" }</pre> | 
| `/deleteAccount` | Delete specified user account |<pre>{ status: "success" }</pre> | 
| `/addFavorite` | Add a charity to a partiular user's favorites list |<pre>{ status: "success" }</pre> | 
| `/removeFavorite` | Remove a charity from a particular user's favorite's list |<pre>{ status: "success" }</pre> | 
| `/getFavoritedCharities` | Get a list of favorited charity objects | <pre> [ CharityObject1, CharityObject2 ]</pre> | 

# Front-end & CRUD

<img width="1440" alt="Screen Shot 2022-04-20 at 2 17 56 PM" src="https://user-images.githubusercontent.com/77020125/164296574-4d3a6978-4ca6-4dad-a0f6-35b0e02b83c8.png">

<img width="947" alt="search_before_delete" src="https://user-images.githubusercontent.com/42352267/164311133-cc7e3921-5971-450a-accb-fe01350943b2.PNG">
Before we add or remove a favorite. Also shows search reading in charities.

<img width="947" alt="search_after_delete_add" src="https://user-images.githubusercontent.com/42352267/164311158-c6f3f97c-bd87-42ce-8e3e-5eef3e826111.PNG">
Decided to add Lubowitz to favorites, removed Crooks, Krajcik and Hackett.

<img width="948" alt="donations_before" src="https://user-images.githubusercontent.com/42352267/164312066-de66be45-6e1b-488b-baf6-af9247981f4f.PNG">
donations before changes

<img width="960" alt="donations_after" src="https://user-images.githubusercontent.com/42352267/164312118-e31ca0f9-1f72-4a90-81eb-6ae25bf8ccf4.PNG">
created a new donation

<img width="947" alt="profile_page" src="https://user-images.githubusercontent.com/42352267/164354655-2460b3d7-2b5d-4126-a700-5cd2418fbfab.PNG">
On profile page, you can update your profile picture, update your bio, read any reviews you've made, edit those reviews, delete parts of your bio, update various profile information points (username, password, location, etc..)

<img width="948" alt="signup" src="https://user-images.githubusercontent.com/42352267/164354908-ba1380f2-c484-4d2d-b530-d693b9d20536.PNG">
From log in page, you can press sign up which will initiate a process to create a user, which is created by entering your information on the profile page.

# Deployment

Our website is at: [https://cs326-charitable.herokuapp.com/](https://cs326-charitable.herokuapp.com/)

# Division of Labor

- **Parsua**: login page frontend/CRUD, donations page frontend/CRUD, sidebar frontend
- **Eddie**: search page frontend/CRUD, milestone2 writeup
- **Mathew**: favorites page frontend/CRUD, likes page frontend/CRUD, Heroku deployment, milestone2 formatting
- **Paarth**: server creation, `faker.js` setup, profile page frontend/CRUD
