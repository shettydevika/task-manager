Task Manager

*Project Overview*

This Task Manager application allows you to create, view, update, and delete tasks. The homepage provides an overview of tasks with a bar graph representing task priorities.


*Features*

Create new tasks with details such as title, date, priority, and assignee.
View all tasks grouped by priority.
Update and delete tasks.
Graphical representation of task priorities on the homepage.

*Prerequisites*

Node.js and npm (Node Package Manager)

MongoDB

----------------------------------------------------------------------------------

/*Getting Started*/

----------------------------------------------------------------------------------

1. Backend Setup

    1.1. Clone the repository:

           git clone https://github.com/shettydevika/task-manager.git
           cd taskmanager

    1.2. Start MongoDB:
   
            Ensure MongoDB is running on your local machine.
    
    1.3. Run the backend server:
            
            node server.js

The backend server should now be running on http://localhost:5000.

("Server is running on port 5000")

----------------------------------------------------------------------------------

2. Frontend Setup

    2.1. Navigate to the frontend directory:
   
            cd taskmanager-frontend

    2.2. Start the frontend development server:
   
            npm start

The frontend should now be running on http://localhost:3000.

----------------------------------------------------------------------------------

/*Additional Information*/

-> Ensure that the backend server is running before starting the frontend development server.
-> MongoDB should be running on your local machine or adjust the MongoDB connection string in server.js accordingly.

----------------------------------------------------------------------------------

/*Troubleshooting*/

Dependencies not found or version issues

Make sure you have installed the correct versions of react-chartjs-2 and chart.js:

    npm install react-chartjs-2@3 chart.js@3

----------------------------------------------------------------------------------

Homepage Overview

![Alt Text](homepage.png)

This screenshot shows the main dashboard of the Task Manager application, including the bar graph representing task priorities and navigation buttons.

----------------------------------------------------------------------------------

Create New Task Form

![Alt Text](createnewtask.png)

This screenshot displays the form used to create a new task, including fields for title, date, priority, assigned to, etc.

----------------------------------------------------------------------------------
Tasks by Priority

![Alt Text](showtasks1.png)
![Alt Text](showtasks2.png)
![Alt Text](showtasks3.png)

This screenshot highlights the "Show All Tasks" page where tasks are grouped and displayed based on their priority levels.

----------------------------------------------------------------------------------
