<h3>Demo Login:</h2>

    Currently not available

<h4>Setup:</h4>
    
    install homebrew
    install npm with $brew install npm

<h4>To run:</h4>

    1. Clone the frontend repository
    2. Run npm install
    3. Run npm start
    4. Repeat for the backend repository

<h3>NORM RULES:</h3>



Style rules: Use prettier with the rules defined in the package.json file.

<h4>Project Structure</h4>

Every page or view has their own folder,
Every component used only by that view should be a child directory of that folder.
If a component is used in multiple Directories it should be in ./src/Components

Each folder should have a index.js/ts/tsx file and a Styles.js file if necessary.

This way style rules are easy to find. If a style is used in several component, it should be defined in
.Styles/sharedStyles.js

Every view should have one Types folder with a index.ts file that holds all the types used by that view.

Example:

    | Resources
    |
    |--| ResourcePage
    |  |
    |  |-- index.tsx
    |  |-- Styles.js
    |
    |--| SubmitResource
    |  |
    |  |-- index.tsx
    |  |-- Styles.js
    |
    |--| Types
    |  |
    |  |-- index.ts
    |
    |-- index.tsx
    |-- Styles.js
    
 
<h3>Resources:</h3>

Arrow functions explained:

https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

What is a rest API?:

https://www.youtube.com/watch?v=7YcW25PHnAA&t=307s

react-spring:

https://www.react-spring.io/docs/hooks/

React good practices:

https://www.youtube.com/watch?v=BncMF2aTL0w

Lodash docs:

https://lodash.com/docs/4.17.15



<h3>API documentation:</h3>

    Api documentation is found in the backend repository.

    
