# Team 02: Empaths

## Charitable
  * Spring 2022

- - - -

# Overview 

Charities are an incredibly important aspect of society and means for social justice. As techonolgy rapidly evolves, the way we interact with charities changes immensely. Now, anyone can donate to charities near or across thr globe. From a store's checkout line to social media, donating has never been more accessible. Unfortunately, along with this powerful technology comes more scammers and system abuse. In the midst of news about problematic charities and Instagram charity scams, people can no longer keep track of which charities are safe and those that have been exposed. People are becoming distrustful and deterred from donating. Finding and vetting charities consumes too much effort and time in this day and age. Using Google is overwhelming and makes the individual do all the research. This is where our web application, Charitable, comes in! Charitable provides users with a centralized hub to search for charities and assesss their reliability. With accountability ratings, reviews and like counts, users can discern whether a charity is trustworthy or not. Our site allows users to have a personalized interaction experience with charities. They can like, favorite and review charities themsleves and keep track of their donations for personal book-keeping or tax season. Our app demystifies the charity searching process and allows users to find good charities to donate to with peace of mind. Charitable makes searching for a charity truly easy and restores people's trust in the process.

- - - -

# Team Members 
* Mathew Han - @mathewjhan
* Paarth Tandon - @paarthtandon
* Edward Annatone - @Vestur
* Parsua Atoofi - @Parsua 

- - - -

# User Interface 

 ### Login Page 
 - Our application opens up with the Login Page. Here, users are greeted with a background of peaceful blue and hopeful yellow that inspires social justice. From here, a returning user can enter their credentials into the text boxes to log into their existing account. Using the signup button users are redirected to the signup page to create their account. Once logged in, users are redirected to their profile/settings page.

 ![](https://i.imgur.com/ewFoUOp.jpg)


### Signup Page
- Accessible from the Login page, new users can create an account by entering their name, username, email, zip code and password into their respective text boxes. After signing up, users can then login. 

![](https://i.imgur.com/O4ZL10k.jpg)


 ### Search Page 
 - The Search page is the heart of our application. This is where users can search for target charities by entering keywords into the search bar. Here, users are able to examine resulting charities by viewing their mission statement, location, accountability ratings, the reviews of other users, total likes, etc. Users can like or unlike a charity by pressing the little yellow heart icon. Users can favorite or unfavorite a charity by pressing the little star icon. They are also able submit their own review of the charity on this page. 

![](https://i.imgur.com/yye2idG.jpg)

![](https://i.imgur.com/i3UWQDm.jpg)

 
 ### Profile Page 
 - The Profile page is where a user can personalize and update their account. Users can make changes to their profile picture, name, username, password, email, and location and save these changes. They can also edit a bio and view all the reviews they have written. From here, users can access the search page.
 
 ![](https://i.imgur.com/Df2womb.jpg)

 ### Likes Page 
 
 - The Likes page is where a user's liked charities are localized. Here, users can easily sift through their liked charities to revisit and re-evaluate them, review them, or remove them from their likes. 

![](https://i.imgur.com/M2plQ5q.jpg)

 
 ### Favorites Page 
 - The favorites page is where a user's favorite charities are held. Favoriting acts as a book-marking mechanism for charity results. Here, users can easily access their top charities to check up on mission statements, accountability rating, reviews, etc. They are also able to remove charities from their favorites here. 
 
 ![](https://i.imgur.com/rn3gAbj.jpg)


 ### Donations Page 
 - The Donations page is where a user's donations are recorded and displayed. It has an embedded table that a user can edit and manually keep track of their donations for tax purposes. The user can add or remove rows and scroll through their donations. 

![](https://i.imgur.com/ZClCiQT.jpg)


### The Sidebar
- The sidebar, which is present on plenty of our pages, connects all of the pages together and allows users to seamlessly navigate between them. from here, users can also sign out of their accounts.

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
- Profile & Favorites HTML, Search page frontend/CRUD, Search faker setup, Milestone2 writeup, Likes page backend, Favorites page backend, Search page & Likes & Favorites, Reviews backend, Reviews Frontend, Code Cleanup, Final writeup.

Parsua Atoofi: 
- Data Interactions, Wireframes & Background Image, Login & Donations & Sidebar HTML, Milestone1 writeup, Login page frontend/CRUD, Donations page frontend/CRUD, Sidebar frontend, Donations page backend, Charitable Favicon, Milestone3 and Final writeup.

- - - -

# Conclusion
