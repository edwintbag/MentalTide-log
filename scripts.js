






document.addEventListener('DOMContentLoaded', function() {
   const journalForm = document.getElementById('journal-form');

   // Function to update analytics
   function updateAnalytics() {
       const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

       // Calculate mood frequencies
       const moodCounts = entries.reduce((acc, entry) => {
           acc[entry.mood] = (acc[entry.mood] || 0) + 1;
           return acc;
       }, {});

       const ctx = document.getElementById('mood-chart').getContext('2d');

       // Destroy the existing chart if it exists
       if (window.moodChart) {
           window.moodChart.destroy();
       }

       // Create a new chart
       window.moodChart = new Chart(ctx, {
           type: 'bar',
           data: {
               labels: Object.keys(moodCounts),
               datasets: [{
                   label: 'Mood Count',
                   data: Object.values(moodCounts),
                   backgroundColor: 'rgba(75, 192, 192, 0.2)',
                   borderColor: 'rgba(75, 192, 192, 1)',
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   y: {
                       beginAtZero: true
                   }
               }
           }
       });
   }

   // Handle journal form submission
   journalForm.addEventListener('submit', function(event) {
       event.preventDefault();

       const date = document.getElementById('date').value;
       const mood = document.getElementById('mood').value;
       const thoughts = document.getElementById('thoughts').value;
       const habits = document.getElementById('habits').value;

       // Save the entry
       const entry = { date, mood, thoughts, habits };
       let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
       entries.push(entry);
       localStorage.setItem('journalEntries', JSON.stringify(entries));

       // Update the analytics
       updateAnalytics();

       // Clear form fields
       journalForm.reset();
   });

   // Initial analytics update
   updateAnalytics();
});




document.addEventListener('DOMContentLoaded', function() {
   const signUpForm = document.getElementById('sign-up-form');
   const signInForm = document.getElementById('sign-in-form');
   const journalForm = document.getElementById('journal-form');
   const journalSection = document.getElementById('journal-section');
   const analyticsSection = document.getElementById('analytics');
   
   // Function to update analytics
   function updateAnalytics() {
       const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

       // Calculate mood frequencies
       const moodCounts = entries.reduce((acc, entry) => {
           acc[entry.mood] = (acc[entry.mood] || 0) + 1;
           return acc;
       }, {});

       const ctx = document.getElementById('mood-chart').getContext('2d');

       // Destroy the existing chart if it exists
       if (window.moodChart) {
           window.moodChart.destroy();
       }

       // Create a new chart
       window.moodChart = new Chart(ctx, {
           type: 'bar',
           data: {
               labels: Object.keys(moodCounts),
               datasets: [{
                   label: 'Mood Count',
                   data: Object.values(moodCounts),
                   backgroundColor: 'rgba(75, 192, 192, 0.2)',
                   borderColor: 'rgba(75, 192, 192, 1)',
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   y: {
                       beginAtZero: true
                   }
               }
           }
       });
   }

   // Function to handle sign-up
   function handleSignUp(event) {
       event.preventDefault();

       const name = document.getElementById('sign-up-name').value;
       const email = document.getElementById('sign-up-email').value;
       const password = document.getElementById('sign-up-password').value;

       // Check if user already exists
       const users = JSON.parse(localStorage.getItem('users')) || [];
       const existingUser  = users.find(user => user.email === email);

       if (existingUser) {
           alert('User already exists!');
           return;
       }

       // Create a new user
       const user = { name, email, password, journalEntries: [] };
       users.push(user);
       localStorage.setItem('users', JSON.stringify(users));

       // Log in the user
       localStorage.setItem('currentUser', JSON.stringify(user));
       showJournalSection();
   }

   // Function to handle sign-in
   function handleSignIn(event) {
       event.preventDefault();

       const email = document.getElementById('sign-in-email').value;
       const password = document.getElementById('sign-in-password').value;

       // Find the user
       const users = JSON.parse(localStorage.getItem('users')) || [];
       const user = users.find(user => user.email === email && user.password === password);

       if (!user) {
           alert('Invalid email or password!');
           return;
       }

       // Log in the user
       localStorage.setItem('currentUser', JSON.stringify(user));
       showJournalSection();
   }

   // Function to show the journal section
   function showJournalSection() {
       journalSection.style.display = 'block';
       analyticsSection.style.display = 'block';
       document.getElementById('auth-section').style.display = 'none';
   }

   // Handle sign-up form submission
   signUpForm.addEventListener('submit', handleSignUp);

   // Handle sign-in form submission
   signInForm.addEventListener('submit', handleSignIn);

   // Handle journal form submission
   journalForm.addEventListener('submit', function(event) {
       event.preventDefault();

       const date = document.getElementById('date').value;
       const mood = document.getElementById('mood').value;
       const thoughts = document.getElementById('thoughts').value;
       const habits = document.getElementById('habits').value;

       // Save the entry
       const entry = { date, mood, thoughts, habits };
       let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       currentUser.journalEntries.push(entry);
       localStorage.setItem('currentUser', JSON.stringify(currentUser));

       // Update the analytics
       updateAnalytics();

       // Clear form fields
       journalForm.reset();
   });

   // Check if a user is already logged in
   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   if (currentUser) {
       showJournalSection();
   }
});






document.addEventListener('DOMContentLoaded', function() {
   const signUpForm = document.getElementById('sign-up-form');
   const signInForm = document.getElementById('sign-in-form');
   const journalForm = document.getElementById('journal-form');
   const journalSection = document.getElementById('journal-section');
   const authHeader = document.getElementById('auth-header');
   const signInHeader = document.getElementById('sign-in-header');
   const toggleAuth = document.getElementById('toggle-auth');
   const toggleAuthSignUp = document.getElementById('toggle-auth-sign-up');
   const showSignIn = document.getElementById('show-sign-in');
   const showSignUp = document.getElementById('show-sign-up');
   const goSignUp = document.getElementById('go-to-sign-up');
   const goSignIn = document.getElementById('go-to-sign-in');
   const landingSection = document.getElementById('landing-section');
   const authSection = document.getElementById('auth-section');
   const analyticsSection = document.getElementById('analytics');

   // Initially hide all sections except the landing section
   authSection.style.display = 'none';
   journalSection.style.display = 'none';
   analyticsSection.style.display = 'none';

   goSignUp.addEventListener('click', function(event) {
       event.preventDefault();
       landingSection.style.display = 'none';
       authSection.style.display = 'block';
       authHeader.style.display = 'block';
       signInHeader.style.display = 'none';
       toggleAuth.style.display = 'block';
       toggleAuthSignUp.style.display = 'none';
   });

   goSignIn.addEventListener('click', function(event) {
       event.preventDefault();
       landingSection.style.display = 'none';
       authSection.style.display = 'block';
       authHeader.style.display = 'none';
       signInHeader.style.display = 'block';
       toggleAuth.style.display = 'none';
       toggleAuthSignUp.style.display = 'block';
   });

   showSignIn.addEventListener('click', function(event) {
       event.preventDefault();
       signUpForm.style.display = 'none';
       signInForm.style.display = 'block';
       authHeader.style.display = 'none';
       signInHeader.style.display = 'block';
       toggleAuth.style.display = 'none';
       toggleAuthSignUp.style.display = 'block';
   });

   showSignUp.addEventListener('click', function(event) {
       event.preventDefault();
       signUpForm.style.display = 'block';
       signInForm.style.display = 'none';
       authHeader.style.display = 'block';
       signInHeader.style.display = 'none';
       toggleAuth.style.display = 'block';
       toggleAuthSignUp.style.display = 'none';
   });

   // Add event listeners for form submissions
   signUpForm.addEventListener('submit', function(event) {
       event.preventDefault();
       // Handle sign-up logic here (e.g., send data to server)
       // Redirect to sign-in form after successful sign-up
       signUpForm.style.display = 'none';
       signInForm.style.display = 'block';
       authHeader.style.display = 'none';
       signInHeader .style.display = 'block';
       toggleAuth.style.display = 'none';
       toggleAuthSignUp.style.display = 'block';
   });

   signInForm.addEventListener('submit', function(event) {
       event.preventDefault();

       const email = document.getElementById('sign-in-email').value;
       const password = document.getElementById('sign-in-password').value;

       // Find the user
       const users = JSON.parse(localStorage.getItem('users')) || [];
       const user = users.find(user => user.email === email && user.password === password);

       if (!user) {
           alert('Invalid email or password!');
           return; // Exit the function to prevent redirecting
       }

       // Log in the user
       localStorage.setItem('currentUser', JSON.stringify(user));
       journalSection.style.display = 'block'; // Show the journal section
       authSection.style.display = 'none'; // Hide the authentication section
   });
});

