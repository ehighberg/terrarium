# Terrarium


- [Full Stack Project](#Full-Stack-Project)
  - [Overview](#Overview)
    - [Team Members](#Team-Members)
    - [Team Expectations](#Team-Expectations)
    - [Permissions](#Permissions)
  - [MVP](#MVP)
    - [MVP Goals](#MVP-Goals)
    - [MVP Libraries](#MVP-Libraries)
    - [MVP Client (Front End)](#MVP-Client-Front-End)
      - [Wireframes](#Wireframes)
      - [Component Hierarchy](#Component-Hierarchy)
      - [Component Breakdown](#Component-Breakdown)
      - [Component Estimates](#Component-Estimates)
    - [MVP Server (Back End)](#MVP-Server-Back-End)
      - [ERD Model](#ERD-Model)
  - [Post-MVP](#Post-MVP)
  - [Project Delivery](#Project-Delivery)
  - [Code Showcase](#Code-Showcase)
  - [Code Issues & Resolutions](#Code-Issues--Resolutions)


<br>

## Overview

_**Terrarium** is a web interface for running, tracking, and managing machine learning experiments._

<br>

## MVP

_The **Terrarium** MVP is to allow users to view the results of machine learning (ML) experiments, as well as to register on the site to perform experiments._

<br>

### MVP Goals

- _User signup and authentication_
- _Browse completed experiments without login_
- _Run experiments on a single dataset, using a single ML model_

<br>

### MVP Libraries


|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|   React Router   | _Makes easily navigable, bookmarkable React pages._ |
|     Axios        | _Get data to/from front end._ |
|      Formik      | _Simpler form handling in React._           |
| Ruby on Rails    | _Backend server._ |
|  Devise          | _Handles user authentication._ |
|      D3          | _Data visualization._ |
|     pandas       | _Data preprocessing._ |
| scikit-learn     | _Perform machine learning experiments._ |
|      requests    | _Get experiment data to/from backend server._ |

<br>

### MVP Client (Front End)

#### Wireframes

> Use the Wireframes section to display desktop, tablet and mobile views.

![Dummy Link](url)

- Desktop Landing

![Dummy Link](url)

- Desktop Hero

![Dummy Link](url)

- Resource Index

![Dummy Link](url)

- Resource Show

![Dummy Link](url)

- Tablet Resource Index

![Dummy Link](url)

- Mobile Resource Index

#### Component Hierarchy

> Use this section to show your React components and the data architecture of your app.

![Dummy Link](url)

#### Component Breakdown

> Use this section to go into further depth regarding your components, including breaking down the components as stateless or stateful, and considering the passing of data between those components.

|  Component   | State | Description                                                      |
| :----------: | :---: | :--------------------------------------------------------------- |
|    Header    |   N   | _The header will contain site navigation and logo._|
|    Footer    |   N   | _Links to my portfolio/contact info._ |
|  Main  |   N   | _Container for User and Experiment views._|
|  User  |   Y   | _Houses router for user login/registration/profile management._       |
|  UserLogin   |   N   | _Handles account creation and logins._  |
|  UserProfile  |   N   | _View and edit user's information._|
|  Nav  |   N   | _Provide links/previews of experiments._      |
| Card  |   N   | _Preview experiment._       |
|  Experiment  |   Y  | _Contains experiment summary, hyperparameter selection, and results._       |
|  Summary  |   N   | _Basic info about the dataset._       |
|  Visualization  |   N   | _Visualize experiment results._|
|  Hyperparameters  |   N   | _View / select hyperparameters._|
|  Results  |   N   | _Display experiment results._|

<br>

### MVP Server (Back End)

#### ERD Model

> Use this section to display an image of a computer generated ERD model.

#### Endpoints

> Use this section to list a selection of your intended endpoints and their uses. Please list any and all custom-created endpoints.

- GET `/api/users`
	- Index route returning an array of all Users and nested 'Likes'
- GET `/api/users/:id`
	- Show route for a user requested by ID
- POST `/api/users`
	- Create route for a new user
- PUT `/api/users/:id/nominate`
  - Update a user by id to create an association to the ballots table

<br>

***

## Planning

> You've got a little over a week to reach your Minimum Viable Product. Use these sections to plan out your approach.

<br>

### Timeframes

> Use this section to estimate the time necessary to build out the various sections of your project. You may include an additional priority matrix, if you desire.

| Task                | Priority | Estimated Time | Actual Time |
| ------------------- | :------: | :------------: | :---------: |
| Add Contact Form    |    L     |     3 hrs      |    3 hrs    |
| Create CRUD Actions |    H     |     3 hrs      |     TBD     |
| TOTAL               |          |     6 hrs      |     TBD     |

> _Why is this necessary? Time frames are key to the development cycle. You have limited time to code your app, and your estimates can then be used to evalute possibilities of your MVP and post-MVP based on time needed. It's best you assume an additional hour for each component, as well as a few hours added to the total time, to play it safe._

<br>

### Schedule

|  Day   | Deliverables                              |
| ------ | ----------------------------------------- |
|Mar 4th | Project proposal prompt |
|Mar 5th | Project pitch / planning       |
|Mar 6th | Build out backend            |
|Mar 7th | User login page / authentication / profile edit |
|Mar 8th | OFF                       |
|Mar 9th | Run ML experiments                        |
|Mar 10th| View ML experiments (MVP)                  |
|Mar 11th| Post-MVP                                  |
|Mar 12th| Polishing                                 |
|Mar 13th| Final presentations                       |

<br>

***

## Post-MVP

- More hyperparameters
- Iterate on previous experiments
- Track parameter history
- Allow >1 metric tracking
- More visualizations
- Compare experiments
- Filtered experiment browsing

<br>

***

## Project Change Log

> This section should be expanded and revised as you work on your project.

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution, if you'd like.

***
