## Welcome to govgoo

This application lets a user search for currently open remote work job opportunities with the U.S. Government.

The application returns all jobs from the USAJOBS API that have a RemoteFlag property equal to True and match user-defined criteria.

### What this application does

The application makes a call to the USAJobs API with a request that matches the following user-defined criteria:

- Job Keyword (e.g., Engineer, Computer Scientist, Project Manager, Data Science)
- Desired Salary (in dollars per year).
- A checkbox input on whether the user wants to include part time or hourly work results

The application checks that the maximum pay for the position meets at least the user-defined minimum desired salary.

The application renders the results in a table for the user to review, including the following information for all remote jobs:

= Job Title
= Hiring Agency
- Max Pay
- Closing Date  (Job Application Deadline)
- Link to Job Application

Additional Notes:

These positions may require travel for a certain percentage of time.  A future version of this application could include this information in the table.

### Technical hurdles:

1. USAJOBS API returned object contains arrays

The returned data object from the USAJOBS API has each job result in an array, so this code runs through a for loop to access each of the records for display.

2. Dealing with pay data format

In addition, the maximum pay for each position in embedded in each position array element under an additional array element called PositionRenumeration, which contains:

- minimum pay (USAJobs displays a pay range)
= maximum pay range (used to do the comparision to user input)
- pay type (hourly vs yearly)

In addition, the returned data returns an integer dollar amount (no ".00" on the end) for yearly positions, but for hourly positions, it returns the cents.  The code deals with this issue with an if else control loop on job type from the returned data.

3. Table Management

The application creates a table when the API call is made and lists the results in a row by adding a table element, then adding rows for each position.  

If no jobs are returned, the application displays a message that no results matched the user's criteria.

If the user performs a search, the code deletes any table made in the previous search, then adds another with the new results.

The dynamic table management and styling is controlled by adding classes to the table, rows, and header.  Syling for these classes are handled in the CSS.


### Things I Learned

1.  Dynamic Management of HTML Table Elements

The ability to add, remove, and style tables dynamically with JS will be extrememly helpful in my role as a data scientist, there are several current projects to which I can apply this knowledge.

2.  More in-depth API calls

I had prior basic knowledge of API calls, but the ability to access the elements in more detail was a big step forward for me.


###  What I would do next time

If done over, or in the future, I would like to look into using React for this project, and possibly TypeScript for display of results. There are potential applications at my work that could benefit from using these libraries.  I would also add in some additional information on whether the user wants to see the amount of travel required for each position in case that is a factor.









