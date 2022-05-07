# Team 02: Empaths

## Charitable
  * Spring 2022

- - - -

# Overview 

The rapid evolution of techonolgy and the internet has connected us 
As new techonolgies evolve, there are always people who will abuse it. From 
advantage 
With the evolution of technology and the internet, scammers 
Our web application
Although search engines can be used to find charities, our web application aims to centralize the search and provide users with 
Instagram charity 
social justice new generation 


Our idea is to construct a charity searching app. There are many search engines that can be used to search for charities (e.g. google) but few of them are specific to only charities. Our site will be specific to charities and therefore have a lot of available information about them immediately available. More specifically, we will provide information regarding how much money the charities take in and spend each year, as well as how long they have existed and other factors to contribute to some sort score regarding how "good" (to be defined) a particular charity is.

The few charity searchers that do exist are not very personalized. Given this, we will include functionality that allows users to favorite charities, creating lists of their prefered charities. We will also add a "for you" type page which based on past searches and favorited charities lists some charities that may appeal to that particular user. We will also try and include local charities (amherst) that may not otherwise get attention.

Important Components:
Since the main function of this website is to search for charities, we will include a seach bar that will use a charity API to retrieve its results. We will also have other features such as: personalized for you page/recommended, likes, favorites, star and written reviews, badges/verification for charities, charity information profiles, share charities (kinda like a retweet and or share to other platforms, themes for events (like eid).

- - - -

# Team Members 
* Mathew Han - @mathewjhan
* Paarth Tandon - @paarthtandon
* Edward Annatone - @Vestur
* Parsua Atoofi - @Parsua 

- - - -

# User Interface 

 ### Login Page 
 - Our application opens up with the Login Page. Here, users are greeted with a background of peaceful blue and hopeful yellow that inspires social justice. From here, a returning user can enter their credentials into the text boxes to log into their existing account. Using the signup button users are redirected to the signup page to create their account. Once logged in, users are redirected to the search page.

### Signup Page
- Accessible from the Login page, new users can create an account by entering their name, username, email, zip code and password into their respective text boxes. After signing up, users can then login. 

 ### Search Page 
 - The Search page is the heart of our application. This is where users can search for target charities by entering keywords into the search bar. Here, users are able to examine resulting charities by viewing their mission statement, location, accountability ratings, the reviews of other users, total likes, etc. Users can like or unlike a charity by pressing the little yellow heart icon. Users can favorite or unfavorite a charity by pressing the little star icon. They are also able submit their own review of the charity on this page. 
 
 ### Profile Page 
 - The Profile page is where a user can personalize and update their account. Users can change their name, username, 
 
 ### Likes Page 
 

 ### favorites Page 
 

 ### Donations Page 

- - - -

# APIs

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

- - - -

# Database 

User Collection:
{
  id: 0,
  username: 'Test Subject 1',
            name: 'Test Subject 1',
  password: 'pass1',
  email: 'test1@charitable.org',
  bio: 'I am test subject one. Commmence with your testing.',
  pfp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih0.redbubble.net%2Fimage.193421889.8165%2Fflat%2C1000x1000%2C075%2Cf.jpg&f=1&nofb=1',
  location: '00000',
  favlist: ['000000030', '000000144'],
  likes: ['000000030', '000000144', '000000147'],
  reviews: [0],
  donations: [
    { charityName: 'Fake 1', amount: '100', date: '00/00/00' },
    { charityName: 'Fake 2', amount: '100', date: '00/00/00' }
  ]
}

User Collection:
{
  id: 0,
  username: 'Test Subject 1',
            name: 'Test Subject 1',
  password: 'pass1',
  email: 'test1@charitable.org',
  bio: 'I am test subject one. Commmence with your testing.',
  pfp: 'image_link',
  location: 'zipcode',
  favlist: [charityIds],
  likes: [charityIds],
  reviews: [0],
  donations: [
    { charityName: 'Fake 1', amount: '100', date: '00/00/00' },
    { charityName: 'Fake 2', amount: '100', date: '00/00/00' }
  ]
}

- - - -

# URL Routes/Mappings

- - - -

# Authentication/Authorization

- - - -

# Division of Labor

Mathew Han:  
- Data Interactions, Likes & Lists HTML, Favorites page frontend/CRUD, Likes page frontend/CRUD, Heroku deployment, Milestone2 formatting, Search page backend, Likes page backend, Favorites page backend, Utilities. 

Paarth Tandon:  
- Sidebar & Search & Signup HTML, Server Creation, faker.js setup, Profile page frontend/CRUD, Database Implementation, Authentication/Login/Signup, Profile page backend, Review endpoints, PFP hosting, Donations page backend. 

Edward Annatone:  
- Profile & Favorites HTML, Search page frontend/CRUD, Search faker setup, Milestone2 writeup, Likes page backend, Favorites page backend, Search Page Likes and Favorites, Reviews backend, Reviews Frontend, Code Cleanup

Parsua Atoofi: 
- Data Interactions, Wireframes, Login & Donations & Sidebar HTML, Milestone1 writeup, Login page frontend/CRUD, Donations page frontend/CRUD, Sidebar frontend, Donations page backend, Charitable Favicon, Milestone3 and Final writeup.

- - - -

# Conclusion
