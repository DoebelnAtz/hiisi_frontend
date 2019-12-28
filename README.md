<h2>NORM RULES FOR HIVEMIND:</h2>

<h4>Project Structure</h4>

React component files and function have to be Capitalized and follow camelCase, other .js files should just be camelCase

.css files should be lowercase

Don't put all .js files in the same directory, try to split 
them up into subdirectories by function

<h4>Project Code recommendations</h4>

third party import statements should be at top of page, other
import statements should follow them separated by a newline.

Prefer functional components with react hooks

Enclose function arguments in parenthesis even  if it only takes
one arguments, return statements should always be
multiline.

example:

    const App = ->(props)<- => {
      ->return(
            <div>App</div>
        );<-
    }
    
One newline separating class methods

No newline for first bracket

example:

    const func = () => ->{<-
        return(
            <div>Hello World</div>
        )
    }



When styling colors in css, use variables found in ./src/App/base.css
this way, if we decide to use another color palette we don't have to change it in every
.css file.

css rules should be ordered alphabetically
by order of specificity

    
    id rules
    class rules
    element rules

<h3>Resources:</h3>

Arrow functions explained:

https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/

React redux short tutorial:

https://www.youtube.com/watch?v=CVpUuw9XSjY

What is a rest API?:

https://www.youtube.com/watch?v=7YcW25PHnAA&t=307s

React good practices:

https://www.youtube.com/watch?v=BncMF2aTL0w

<h3>API documentation:</h3>

<h5>Endpoints:</h5>

make sure you're running the backend on 127/0.0.1:8002

base URL: http://127.0.0.1:8002/api/

profiles: /profiles/

blogs: /blogs/

events: /events/

comments: /comments/

login: /auth/login

    data=
    {username: "username", password: "password"}

registration: /auth/register/

    data = 
    {username: "username", password: "password"}



