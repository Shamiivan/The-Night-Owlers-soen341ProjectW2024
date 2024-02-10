# Car rental web application

# Project Description

# Team Members and Roles

# Project Approach and Technology

## Development Methodology
**Development Methodology:** `Agile`

**Justification:**
* **Efficiency:**
    - Agile's focus on iterative, incremental development streamlines the process, delivering functional results more efficiently.
* **Flexibility:**
    -  Agile adapts to changing project requirements, making it suitable for dynamic situations where priorities may evolve.
* **Iterative Development:**
    - Breaking down the project into cycles allows for constant refinement, improving the project based on ongoing feedback.
* **Client Collaboration:**
    - Agile's emphasis on continuous client involvement ensures the final product aligns with client expectations.
* **Risk Mitigation:**
    - Agile's iterative nature aids in early identification and mitigation of risks, contributing to a more successful outcome.
* **Team Collaboration:**
    - Agile promotes collaboration, fostering shared understanding and effective communication among team members.
* **Continuous Improvement:**
    - Regular retrospective meetings in Agile facilitate a continuous improvement cycle, ensuring the development process becomes more efficient and effective over time.
      
## Project Timeline
1) **Sprint 1** `(Deadline: February 12, 2024)`
    * **Define Project Scope and Objectives:**
        - Clearly articulate the goals, requirements, and limitations of the project. Collaborate with stakeholders to ensure a shared understanding.
    * **Set up a development environment:**
        - Configure development environments for all team members, ensuring that tools, libraries, and dependencies are installed and configured consistently.
    * **Create User Stories:**
        - Collaborate with stakeholders, including end-users, to create detailed user stories that capture the functionalities and features expected from the application.
    * **Initiate UI/UX Design based on User Stories:**
        - Use the created user stories as a UI/UX design foundation. Design wireframes, user flows, and interface elements that align with the identified user needs and scenarios.
    * **Initial Frontend Development based on User Stories:**
        - Begin the initial frontend development, focusing on non-complex components or sections that align with the user stories and UI/UX design.
    * **Initial Backend Development based on User Stories:**<
        - Start setting up the basic backend infrastructure and functionalities that are directly related to the user stories and the anticipated frontend components.

2) **Sprint 2** `(Deadline: March 11, 2024)`
    * **Continued Frontend Development based on User Stories:**
        - Progress with the frontend development, focusing on more complex components now that the initial setup is complete. Ensure the implementation aligns with the user stories and UI/UX design.
    * **Continued Frontend Development based on User Stories:**
        - Progress with the frontend development, focusing on more complex components now that the initial setup is complete. Ensure the implementation aligns with the user stories and UI/UX design.
    * **Begin Integration Testing:**
        - Start testing the integration between the frontend and backend components. Identify and address any issues or inconsistencies that may arise during the integration process.

3) **Sprint 3** `(Deadline: March 25, 2024)`
    * **Implement Additional Features Based on Feedback and User Stories:**
        - Incorporate feedback from stakeholders, end-users, and team members to enhance or add features to the application. Ensure these additions align with the evolving user stories.
    * **Conduct User Acceptance Testing:**
        - Engage end-users in testing the application to ensure it meets their needs and expectations, as outlined in the user stories.
    * **Prepare for Deployment:**
        - Assemble all components and prepare the application for deployment. This involves finalizing configurations, optimizing performance, and addressing any outstanding issues.

4) **Sprint 4** `(Deadline: April 10, 2024)`
    * **Deploy the Application to the Production Environment:**
        - Release the application to the live production environment. This includes deploying both frontend and backend components to a server that is accessible to end-users.
    * **Continuous Integration (CI) Implementation:**
        - Integrate and configure Continuous Integration (CI) tools to automate the testing and deployment processes, ensuring that changes align with user stories.
    * **Conduct Final Testing and Resolve Any Issues:**
        - Perform comprehensive testing on the live application, now integrated with CI, to catch any unforeseen issues. Address and resolve any bugs or performance issues that may arise during this final testing phase.

*<ins>Note</ins>: Milestones and deadlines are subject to adjustment based on ongoing feedback and project evolution.*

## Communication
1) **Team Meetings:**
    * **Weekly sprint planning and review meetings**
        - **Purpose:** To plan the upcoming sprint, discuss user stories, and set priorities. The review meetings allow the team to assess the completed work, gather feedback, and adjust the plan for the next sprint.
        - **Benefits:** Ensures alignment on project goals, distributes tasks based on priorities and provides a platform for discussing challenges and proposing solutions.

    * **Two days a week for quick progress updates**
        - **Purpose:** Regular, short meetings for team members to share progress updates, discuss any blockers, and ensure everyone is on the same page.
        - **Benefits:** Promotes transparency, allows quick problem-solving and maintains 
a high level of awareness about the ongoing work.

2) **Communication Tools:**
    * `Discord`
        - **Purpose:** Facilitates real-time communication, quick queries, and informal collaboration among team members.
        - **Benefits:** Encourages spontaneous discussions, builds camaraderie, and provides a platform for resolving immediate issues.
    * `Zoom`
        - **Purpose:** Supports virtual face-to-face meetings for in-depth discussions, sprint reviews, and any complex conversations.
        - **Benefits:** Enhances communication by providing a visual component, fosters team connection, and allows for a more personal interaction compared to text-based communication.
    * `Google`
        - **Purpose:** Serves as a centralized location for storing and collaborating on formal project documentation, including requirements, design documents, and reports.
        - **Benefits:** Enables collaborative editing, version history tracking, and easy access to important project documents from anywhere.

Little updat 3. Technology Stack 3.1 Languages 3.1.1 JavaScript JavaScript, a
versatile scripting language for web development. Rationale: Single for both
frontend and backend development. Widely known and proficient among developers.
Rich ecosystem of libraries and frameworks. Most of our team has familiarity
with the language Large community for support and resources.

3.2 Backend Frameworks 3.2.1 Next.js Next.js, a React framework for server-side
rendering and static site generation. Rationale: Aligns with Agile Scrum
methodology. Supports iterative development and continuous integration. Seamless
integration with GitHub for version control.

Qualitative Assessment: Strengths: Pre-rendering, seamless deployment, automatic
code splitting. Weaknesses Learning curve, configuration complexity, limitations
with serverless functions. Use Cases: Starting a reservation,
viewing/modifying/canceling a reservation. Browsing vehicles, CRUD operations on
users, vehicles, and reservations. 3.2.2 Firestore Firestore, a real-time
database with offline support. Rationale: Seamless integration with Next.js.
Supports rapid iterations and collaboration. Offers real-time updates and
offline functionality. Qualitative Assessment: Strengths: Real-time updates,
offline support, scalable. Weaknesses: Limited query capabilities, potential
costs with high usage. Use Cases: Real-time reservation updates, browsing
vehicle listings. Managing user accounts and reservation records. 3.3 Frontend
Frameworks 3.3.1 Next.js Same as the backend framework above. The framework is
built on top of React. The section covers the front end capabilities of Next.js
Rationale: Pre-rendering, seamless deployment, automatic code splitting.
Efficient state management and data passing. Qualitative Assessment: Strengths:
Pre-rendering capabilities, automatic code splitting. Weaknesses: Learning
curve, configuration complexity, limitations with serverless functions. Use
Cases: Similar to backend framework use cases. 3.4 Version Control Git & GitHub
Description: Git & GitHub, a version control and collaboration platform.
Rationale: Enables change tracking and version history. Facilitates team
collaboration and project management. Benefits: Efficient collaboration and
version control. Streamlined project management and communication tools. 3.5.
Deployment Vercel Vercel, a cloud platform for static sites and Jamstack
applications. Rationale: Automated build and deployment pipeline. Real-time
feedback with the Vercel Toolbar. Using a deployed place to see the website will
allow for better monitoring of potential errors Benefits: Simplified deployment
process. All it takes is update the main repository Unique URLs for each
deployment, make it easy to track version changes
