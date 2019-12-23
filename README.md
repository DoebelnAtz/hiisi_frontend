<h2>NORM RULES FOR HIVEMIND:</h2>

React component files and function have to be Capitalized and follow camelCase, other .js files should just be camelCase

.css files should be lowercase

Don't put all .js files in the same directory, try to split 
them up into subdirectories by function

Enclose function arguments in parenthesis even  if it only takes
one arguments, return statements should always be
multiline.

example:

    const App = ->(props)<- => {
      ->return(
            <div>App</div>
        );<-
    }
    
When styling colors in css, use variables found in ./src/App/base.css
this way, if we decide to use another color palette we don't have to change it in every
.css file.

<h3>Resources:</h3>

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



