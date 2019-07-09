
Grocery List App:
    This app was created to provide users with a way to quickly create and use grocery lists. Users are able to create new lists, add items each list, perform crud operations on lists and items. Both lists and items can be marked as completed or uncompleted. 

Problem/Solution:
    The problem: A group of people want to go to the store, and be able to split up, but still all have access to the same lists. When one person makes a change to the list, every person in the group wants to see the change.

    The solution: An application that allows users to sign into the same account from multiple devices. When a change is made in the app the server will send the new information to each users device. Users can create lists, items, and mark them as complete.


Stack:
    In this project I chose to use react.js for front-end, node.js, sequelize and express for back-end and bootstrap for styling. I chose react as my front-end framework because it offers easy and efficient DOM manipulation, and I have the most experience with it compared to other front end libraries. Out of all the frameworks/libraries in this stack I have the most experience with express, node and sequelize. They were no-brainers for me as I have established my work flow heavily around sequelize models and the express API. Finally, I chose bootstrap for styling because it's quick and easy to implement and has a very clean feel.

Technical Choices: 
    This app is configured to run a client server and the back-end server concurrently. This was my biggest struggle: getting my backend to work with react without being able to render my views with my backend. However, after getting a hang of axios, it was very satisfying seeing my pages update in real time without gross reloads on every post request. 




Upgrades: 
    Given more time to work on this project there are a few improvement that I would make. First of all I would allow different users to interact with eachother and share lists. I think it would be awesome if I could add a optional location tracker an each user, so that if you were in the store with your friends or family, you could see where the are in the store. I would also add an option to set the current item(s) that each person is looking for so that two people don't find themselves in the same isle looking for the same thing. Speaking more technically now, I would clean up some of my code to make it more uniform and less clunky. After almost every post request I call a fetch to get all the data again from my backend, then rerender it. I would make it so I would only alter the specific data I was manipulating without making unnecessary calls to the backend.