# Database Documentation

### User Collection Table

| Column       | Data Type | Description                |
|--------------|-----------|----------------------------|
|      id      |  Integer  | The user's id number       |
|   username   |  String   | user's username for logging in|
|     name     |  String   | user's real, full, government name     |
|   password   |  String   | user's password for logging in           |
|     email    |  String   | user's email (e.g. 'test1@charitable.org') |
|      bio     |  String   | user's personalized biography |
|      pfp     |  String   | profile picture image link         | 
|   location   |  String   | user's zipcode             |
|    favlist   | [String]  | list of favorited charity IDs |
|     likes    | [String]  | list of liked charity IDs     |
|    reviews   | [Integer] | list of review IDs            |
|   donations  | [{ charityName: String, amount: String, date: String }] | list of donation objects that hold charity name, amount donated and date |


### Charity Collection Table 

| Column       | Data Type | Description                |
|--------------|-----------|----------------------------|
|      eid     |  String   | id associated with a charity |
|    reviews   |  [Integer]| list of review IDs (a charity's reviews from users) |
|   totalLikes |  Integer  | total amount of likes a charity has |


### Review Collection Table

| Column       | Data Type | Description                |
|--------------|-----------|----------------------------|
|      rid     |  Integer  | ID of a user's review |
|      uid     |  Integer  | user's ID number  |
|     chid     |  String   | charity's ID number |
|     stars    |  Integer  | number of stars a user gave the charity in the review |
|     text     |  String   | the actual text body of the review written by the user|

- - - -

# Division of Labor
* Mathew Han: Search page backend, Likes page backend, Favorites page backend, Utilities. 
* Paarth Tandon: Database Implementation, Authentication/Login/Signup, Profile page backend, Review endpoints, PFP hosting, Donations page backend. 
* Edward Annatone: Likes page backend, Likes CRUD/Database, Favorites page backend, Search page Likes & Favorites, Reviews backend, Code Cleanup, Final writeup.
* Parsua Atoofi: Sidebar HTML consistent, Donations page backend, Charitable Favicon & HTML, Milestone3 writeup, Final writeup.
