# Weather Dashboard
Link: [Weather Dashboard](https://clairephillips51.github.io/work-day-scheduler/)

## Summary
Using javascript, jQuery, jQuery UI, and bootstrap to make a day planner that will allow you to type in and save tasks for a certain hour of the work day. The sheculer will also update thoughout the day and is color coded so that the current hour is red, any past hour is gray, and any future hour is green.  Any events typed into the scheculer are saved to local storage so reloading the page will keep your tasks in place. 

![Working Day Planner](Pictures/finished-planner.png)

## Table of Contents
1. [Process](#process)
2. [Usage](#usage)
3. [What I Learned](#what-i-learned)
4. [Resources](#resources)

## Process
This project started with a skeleton html file and a complete css file. I had to add a javascript file. I also added a jQuery UI `<link>` and `<script>` to the html file so that I could access jQuery UI elements. 

Most of the coding was setting up the script.js file. I fist made a for loop that created 9 rows and 3 columns which I then appended to the container `<div>` from the html file to set up the main structure of the planner. The for loop allowed me to make 27 elemnets without having to type it all out in the htmlf file. 

![Created and appended divs](Pictures/appendedItems.png)

Next was setting up moment.js to show the current date in the jumbotron. That was simpling setting a variable called "currentDay" and having it equal to moment() then setting the format to ('dddd MMMM Do'). Moment.js was also used to determine whether the hour in the planner was past, present, or future when compared to the current hour of the day. 

jQuery UI was used to create a save button in the last column. The save button was turned into an eventlistener so that when clikced the time and the text in the textarea would be saved to local storage. 

## Usage
The work scheduler is set up to follow the current hour of the work day. It starts at 9AM and goes to 5PM. The sheculer will update thoughout the day and is color coded so that the current hour is red, any past hour is gray, and any future hour will be green.  

The second coloumn next to the hour is a text box where you can type in a reminder, an event, task, ect. Once you hit the save button in the last column any events typed into the scheculer are saved to local storage so reloading the page will keep your tasks in place. 

![Local storage in action](Pictures/localStorage.png)

The planner is set up so that the next day local storage is re-set and any events from the precvious day will be cleared. 

## What I Learned
At first I thought this project would be straight forward but mainpulating the moment.js methods was more challenging than anticipated. I eventually set up an if, else if, else statement that determined if the hour was past, present, or future so it could be colored correctly. 

Setting up the for loop so I could append all the needed elements for the rows and coloumns without actually having to type it out saved a ton of time and having the css already set up was a big help in defining/naming elements. 

One thing I did struggle with was getting the save button to be a bigger size. I couldn't seem to manipulte the jQuery UI icon I used so I left it alone. 

## Resources
* [Local Storage](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
* [Bootstrap grid system](https://getbootstrap.com/docs/4.5/layout/grid/)
* [jQuery UI save button Icon Code](https://jqueryui.com/button/#icons)
* [Moment.js Docs](https://momentjs.com/docs/#/displaying/) 
