# Car rental web application

# Project Description

# Team Members and Roles

# 3 Project Approach and Technology

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

### Angular

#### Description:

Angular is a TypeScript-based open-source web application framework developed by
Google. It is known for its robust features such as two-way data binding,
dependency injection, and a modular architecture that promotes separation of
concerns.

#### Rationale:

Considering the project's requirements, Angular is chosen for the following
reasons:

- **Community Support**: Angular benefits from being backed by Google, which
  ensures a steady stream of updates, a large community for support, and a wide
  array of resources and third-party libraries.
- **Scalability**: Angular's modular architecture and powerful features make it
  a great choice for applications that are likely to expand in the future.
- **Ease of Integration**: Angular can be integrated into projects that are
  already using AngularJS, making it a natural transition. It also supports
  incremental development, allowing teams to adopt Angular piece by piece.

#### Qualitative Assessment:

- **Strengths**: Angular's strong suit is its comprehensive framework that
  includes everything needed to build complex applications, from templates and
  routing to forms and HTTP clients. It also has excellent tooling support, such
  as the Angular CLI, which simplifies development tasks like scaffolding,
  testing, and deployment.
- **Weaknesses**: Angular has a steeper learning curve compared to other
  frameworks like React. It requires a deeper understanding of TypeScript, which
  can be challenging for developers coming from a JavaScript background.
  Additionally, Angular's performance can sometimes suffer due to its heavy
  reliance on change detection, although this can be mitigated with proper
  optimization techniques.
- **Use Cases**: In the context of the car-rental application, Angular's
  features would be instrumental in implementing the following use cases:
  - **Browsing Vehicles**: Angular's powerful templating engine can render lists
    of vehicles dynamically based on user input, filters, and sorting
    preferences.
  - **Reservation Management**: Angular's two-way data binding and form handling
    capabilities would enable users to interactively start, modify, or cancel
    reservations without requiring full page refreshes.
  - **Admin Interface**: The CRUD operations for managing vehicles, user
    accounts, and reservations could be implemented using Angular's form
    handling and HTTP client capabilities.

Angular's robust set of features, coupled with its strong community and support,
make it a viable option for the car-rental web application project. Its modular
architecture aligns well with the project's Agile development approach, and the
learning curve, while steep initially, can be managed with adequate training and
resources.

### Analysis of frameworks

### Final choice

##

do an analysis on angular using these criteria of selction #### Criteria of
selection given the project needs

- Modularity
- Perfomance
- Ease of integraion
- Component libraries
- Learning Curve
- Community and support
- Security 3.1.1 Framework A
- Description: Brief overview of Framework A.
- Rationale:
  - Justification for choosing Framework A.
  - Consider factors such as community support, scalability, and ease of
    integration.
- Qualitative Assessment:
  - Strengths
  - Weaknesses
  - Use Cases

overview of porject Objective. This project will help you to get a taste of
software project management skills firsthand. You will follow the Agile
development approach; take advantage of GitHub distributed version control plus
access control, bug tracking, software feature requests, task management,
continuous integration, and wikis to support your project management process.
The project is divided into 4 incremental deliveries which we refer to as
sprints based on Agile Scrum methodology, which will be used in this course.

The duration of the project is around 10 weeks; the development process is an
adapted Agile with 3 to 4 weeks long iterations, 4 iterations in total. The
first 2 weeks of the first sprint are for training and setting up your
development environment.

Because of the short span of this project, you are not expected to deliver a
marketable product, but the result should be at least a compelling
middle-fidelity prototype that could serve as the basis for building a real
product. Check these two links on prototype fidelity quite helpful: A Guide to
Prototype Fidelity:
https://www.webfx.com/blog/web-design/design-mockup-fidelity/
https://www.webfx.com/blog/web-design/wireframes-vs-prototypes-difference/
Description. A car rental application is a software platform designed to
facilitate the process of renting vehicles for short periods, typically ranging
from a few hours to a few weeks. The application serves as an interface between
customers looking to rent vehicles and the car rental company offering those
services.

We three identify primary users: Customers, Customer service representatives
(CSR), and system administrator(s).

List of main use cases organized by user type.

Customer Browse vehicles for rent: A catalog of rental vehicles Start a
reservation: After providing a location (postal code, city, or airport) and a
pickup and return date, the customer will be shown vehicles that match the
specific criteria such as type (CARs, SUVs, Vans, Trucks) category (compact,
standard, intermediate, etc.), and price range. During the reservation, a
customer can add extra equipment at an additional price View/Modify/Cancel
reservation Find a branch: The customer provides a postal code or Airport to
find the nearest branch Rating and review: Customers can provide feedback and
ratings for the rented vehicles and overall rental experience. Customer service
representative Check-in process for customers with or without reservation if the
customer did not make a reservation, he creates a new reservation in the system
if the customer has made a reservation, he confirms the reservation in the
system by verifying the customer’s reservation, and customer identification;
then, it proceeds to the rental agreement review and payment processing.
Check-out process. After physically inspecting the vehicle, the CSR reviews the
rental agreement ensuring that the terms and conditions of the rental are met;
processes the final billing based on the rental duration, additional services,
and any applicable fee; performs the payment settlement and confirms the
completion of the return process in the system.\
System administrator CRUD operations on vehicles CRUD operations on user
accounts CRUD operations on reservations

This is not an exhaustive list of features/users. Other kinds of users and
features could be considered. Your project grade criteria consider originality
and innovation. The highest marks will be given to teams who are thinking out of
the box and include other relevant users and functionalities for eventual
implementation when properly justified.

For the first sprint, you have to consider the following core features: Start a
reservation View/Modify/Cancel a reservation Browse vehicles for rent CRUD
operations on users CRUD operations on vehicles CRUD operations on reservations

You must have regular meetings with your team and post their “minutes” in the
corresponding subfolder in your repository. At the end of each sprint, each team
member will submit a detailed log of their activities, which will be considered
to evaluate the individual contribution.
