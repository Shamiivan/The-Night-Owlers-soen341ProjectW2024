# Car rental web application

# Project Description

# Team Members and Roles

# 3 Project Approach and Technology

## 2.1 Development Methodology
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

## 2.2 Project Timeline
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
    * **Initial Backend Development based on User Stories:**
        - Start setting up the basic backend infrastructure and functionalities that are directly related to the user stories and the anticipated frontend components.

2) **Sprint 2** `(Deadline: March 11, 2024)`
    * **Continued Frontend Development based on User Stories:**
        - Progress with the frontend development, focusing on more complex components now that the initial setup is complete. Ensure the implementation aligns with the user stories and UI/UX design.
    * **Continued Backend Development based on User Stories:**
	- Extend backend development to include core functionalities, ensuring that they directly support the user stories and the frontend components being developed.
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

## 2.3 Communication and Collaboration
1) **Team Meetings:**
    * **Weekly sprint planning and review meetings**
        - **Purpose:** To plan the upcoming sprint, discuss user stories, and set priorities. The review meetings allow the team to assess the completed work, gather feedback, and adjust the plan for the next sprint.
        - **Benefits:** Ensures alignment on project goals, distributes tasks based on priorities and provides a platform for discussing challenges and proposing solutions.

    * **Two days a week for quick progress updates**
        - **Purpose:** Regular, short meetings for team members to share progress updates, discuss any blockers, and ensure everyone is on the same page.
        - **Benefits:** Promotes transparency, allows quick problem-solving and maintains a high level of awareness about the ongoing work.

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

3) **Collaboration tool**
    1)	**Version Control:**
    * `GitHub` 
	    - **Purpose:** Acts as a centralized repository for the project's source code, enabling version control, collaboration, and code review.
        - **Benefits:** Ensures a single source of truth for code, facilitates collaboration among team members, and allows for the tracking of changes over time.
    2)	**Project Management:**
    * `GitHub`
	    - **Purpose:** Provides a platform for agile project management, allowing the team to plan sprints, track user stories, and manage issues.
        - **Benefits:** Streamlines project management processes, enhances visibility into project progress, and supports efficient sprint planning and execution.
    3)	**Documentation:**
    * `GitHub Wiki` 
        - **Purpose:** Serves as a collaborative space for documenting project-related information, including guidelines, best practices, and project knowledge.
        - **Benefits:** Centralizes project documentation, allows for collaborative content creation, and helps in knowledge sharing among team members.

## 3.1 Overview

#### Criteria of selection given the project needs

- Modularity
- Perfomance
- Ease of integraion
- Component libraries
- Learning Curve
- Community and support
- Security

### 3.1 Frontend Frameworks

### Framework A: React

#### Description:

React is a JavaScript library developed by Facebook for building user
interfaces, particularly for single-page applications. It is known for its
component-based architecture, which promotes reusability and modularity in the
codebase.

#### Rationale:

The choice of React for our car-rental web application is driven by several
factors:

- **Community Support**: React has a vibrant community with a wide array of
  resources available, which can assist in solving problems and learning best
  practices.
- **Scalability**: React's virtual DOM and component-based structure make it
  suitable for applications that may grow in complexity over time.
- **Ease of Integration**: React can be easily integrated into existing projects
  or used as the starting point for a new application, fitting well within the
  Agile Scrum development methodology.

#### Qualitative Assessment:

- **Strengths**: React's strengths lie in its component-based architecture,
  which allows for the creation of reusable UI components. This leads to a more
  maintainable codebase and faster development times. Additionally, React's
  virtual DOM optimizes performance by minimizing direct DOM manipulations.
- **Weaknesses**: One potential weakness is that React has a steep learning
  curve, especially for developers not familiar with its concepts like JSX and
  the component lifecycle. Moreover, React is just the view layer, meaning that
  other libraries or frameworks may be needed for state management or routing.
- **Use Cases**: Given the project's requirements, React is an excellent choice
  for implementing the core features of the car-rental application. For
  instance, the component-based architecture would allow for the creation of
  separate components for browsing vehicles, starting a reservation, and
  managing user accounts. These components could then be composed to form the
  complete application interface.

### Analysis of frameworks

### Final choice

##
