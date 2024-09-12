# Realtime-Voting-App
## FSD - Assignment - 1: Case Study 6: Real-Time Voting Application
### To run the application:
#### Start the backend server:

Open a new terminal or command prompt, navigate to your project's backend directory, and run:
Copycd path/to/real-time-voting-app/backend
node server.js
You should see a message like "Server running on port 3001" (or whichever port you've configured).

#### Start the frontend React application:
Open a new terminal or command prompt (keep the backend one running), navigate to your project's root directory, and run:
Copycd path/to/real-time-voting-app
npm start

This will start the React development server. It should automatically open a browser window with your app. If it doesn't, you can manually open a browser and go to http://localhost:3000

#### 1. How would you implement a real-time WebSocket connection to handle voting updates?

In our implementation, we use Socket.IO to handle real-time WebSocket connections for voting updates. Here's how it's implemented:

The setup allows for real-time updates. When a vote is cast, the server emits a 'voteUpdate' event to all connected clients. The clients listen for this event and update their state accordingly, ensuring all users see the latest vote counts in real-time.

#### 2. Describe how to create a voting interface and handle vote submissions in React.

We created a voting interface using React components. Here's how it's implemented:

The VotingInterface component renders two buttons for voting options. When a button is clicked, it calls the handleVote function, which sends a POST request to the server. The server processes the vote and emits a WebSocket event with the updated vote counts.

#### 3.How can you use Chart.js to display real-time voting results in a bar chart?

In our implementation, we use react-chartjs-2, a React wrapper for Chart.js, to display real-time voting results. Here's how it's implemented:

The VotingChart component receives the current votes as props and uses this data to create a bar chart. The chart updates automatically when the votes state changes in the App component, which happens every time a 'voteUpdate' event is received from the server.

#### 4. Explain how you would handle user authentication and restrict users to one vote per topic.

In our implementation, we've added basic user authentication and vote restriction:

User Authentication:

We implemented a simple login system using an in-memory store on the server.
Users provide a username and password to log in.
The server checks credentials and returns a userId if valid.


Vote Restriction:

We use a Set (userVotes) to keep track of which users have voted for which options.
Before allowing a vote, we check if the user has already voted for that option.

#### 5. What strategies would you use to ensure the reliability and accuracy of the voting results?

In our current implementation, we've used some basic strategies to improve reliability and accuracy:

We validate votes on the server to ensure they're for valid options.

We prevent users from voting multiple times for the same option and used WebSockets to ensure all clients have the most up-to-date vote counts also, we've implemented basic error handling on both client and server sides.