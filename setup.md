# Project Setup

## Initialization
1. `pnpm create react-app . --template typescript`

## Installing Packages (after git clone)
- `pnpm install`

## Added Packages
- `pnpm add react-router-dom`
(development dependancies)
- `pnpm add @types/react-router-dom -D`
- `pnpm add tailwindcss postcss autoprefixer -D`
  - `pnpm dlx tailwindcss init -p`


## Planning

### Server REST API
  --- Available endpoints for all traffic ---
  auth/users/ - to create a new user profile
  auth/jwt/create/ - to create jwt token given a username and password
  auth/jwt/refresh/ - to create a jwt given a refresh token
  auth/jwt/verify/ - to verify a jwt is valid
  --- Available endpoints for traffic with Authorization header with JWT <jwt> value ---
  auth/users/me/ - to get profile information (with a valid jwt)
  lists/ - to get lists a user has access to or post a new one
  lists/join/ - to gain access to another user's list by posting a share code they provided
  lists/<list_id> - to get or delete a specific list with it's items depending on request method
  lists/<list_id>/share - to get a share code by posting another user's username
  lists/<list_id>/items - to post a new item to the list
  lists/<list_id>/items/<item_id> - to patch (update) or delete a specific list item depending on the request method

### App Pages
  - TempList - a landing page for unknown users to make a list with localStorage
  - Register - a page for creating an account
  - Login - a page for users to log in
  - Lists - a page for viewing all the lists a user has access to (the landing page with a valid JWT)
    - includes a "join list" button which opens a modal with a share code input and submit button
  - List - page for viewing a specific list
    - includes a "generate share code" button which opens a modal with a username input and submit button
