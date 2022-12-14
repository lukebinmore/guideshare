# [**Go Back**](https://github.com/lukebinmore/guideshare)

# **Table Of Contents**
- [**Go Back**](#go-back)
- [**Table Of Contents**](#table-of-contents)
- [**Planning Phase**](#planning-phase)
  - [**Site Concept**](#site-concept)
  - [**Site Goals**](#site-goals)
  - [**Proposed Features**](#proposed-features)
  - [**Site Design**](#site-design)
    - [**Wireframes**](#wireframes)
    - [**Color Schemes**](#color-schemes)
    - [**Logo**](#logo)
    - [**Fonts**](#fonts)
  - [**Development Management**](#development-management)
    - [**Development Process**](#development-process)
    - [**Testing Methodologies**](#testing-methodologies)
    - [**Periodic Reviews**](#periodic-reviews)
    - [**Epics / User Stories**](#epics--user-stories)

***

# **Planning Phase**

This document outlines the planning phase of the project, including the following:

- The concept of the site.
- The goals of the site.
- The core proposed features of the site.
- The basic design of the site.
- The methodologies that will be implemented during developement.

## **Site Concept**

The basic concept of the site, is a platform in which to share guides and tutorials relating to almost anything that user's are pationate about.
The site's content will consist of user generated guides, tutorials and instructions for whatever the users choose.

For example, a user could choose to create a guide on how to setup a home plex server to manage their digital media.
A second example could be a guide on how to create the perfect paper airplane.

***

## **Site Goals**

The main goals of the site are to provide a platform that:

 - Encourages the DIY (Do It Yourself) approach.
 - Allows users to express and share their interests and hobbies with others.
 - Allows users to find new and interesting hobbies / passions.
 - Guides users through projects and tasks with step-by-step instructions.

***

## **Proposed Features**

Based on the goals of the site listed above, the below features have been considered for implementation. These features have been evaluated for importance and feasability given the time and my own current capability. Based on these evaluations, each feature has been given an importance rating and a feasability rating. These ratings have been used to generate an initial MOSCOW rating.

 - Key:
   - Importance
     - (Least Important) 0 - 5 (Most Important)
   - Feasibility
     - (Least Important) 0 - 5 (Most Important)
   - MOSCOW Rating
     - M - Must
     - S - Should
     - C - Could
     - W - Wont

| Feature | Importance | Feasibility | MOSCOW |
|---|---|---|---|
| Admin controls | 5 | 4 | M |
| User login | 5 | 5 | M |
| User registration | 5 | 5 | M |
| User logout | 5 | 5 | M |
| Updatable Profile | 3 | 5 | S |
| Post creation | 5 | 5 | M |
| Post editing | 4 | 5 | M |
| Post commenting | 5 | 5 | M |
| Post liking | 3 | 5 | S |
| Post disliking | 2 | 5 | C |
| Post favoriting | 3 | 4 | S |
| Post downloading | 1 | 3 | W |
| Post duplicating | 2 | 4 | W |
| Comment Liking | 3 | 5 | C |
| Comment editing | 3 | 5 | C |
| Comment replys | 1 | 3 | W |
| Customizable site theme | 3 | 5 | C |
| Site wide navigation bar | 5 | 5 | M |
| Post list | 5 | 5 | M |
| Post list filters | 4 | 5 | M |
| Post list ordering | 4 | 5 | M |
| Profile list | 3 | 5 | S |
| Profile page | 4 | 5 | M |
| Follow User Profiles | 4 | 4 | M
| User to User messaging | 1 | 1 | W |
| Contact Us Form | 5 | 5 | M |
|---|---|---|---|
| Totals | 93 | 118 |---|

To view the project board for this site, please [Click Here](https://github.com/users/lukebinmore/projects/7/views/1)

***

## **Site Design**

### **Wireframes**

Below are the initial wireframes for the site, created with [Wireframes CC](https://wireframe.cc/). These are basic designs, meant for guidance and may change as the project progresses.

**Landing Page / Feed Page / Saved Posts Page**

These pages will consist of the same layout, with the main difference being the content that is filtered into them, and the title of the page.

| Desktop | Mobile |
|---|---|
| ![Landing Page](/docs/wireframes/landing-page.png) | ![Landing Page - Mobile](/docs/wireframes/landing-page-mobile.png) |

**Post Page / New Post Page**

| Desktop | Mobile |
|---|---|
| ![Post Page](/docs/wireframes/post-page.png) | ![Post Page - Mobile](/docs/wireframes/post-page-mobile.png) |

**Profile Page**

| Desktop | Mobile |
|---|---|
| ![Profile Page](/docs/wireframes/profile-page.png) | ![Profile Page - Mobile](/docs/wireframes/profile-page-mobile.png) |

**Contact Page**

| Desktop | Mobile |
|---|---|
| ![Contact Page](/docs/wireframes/contact-page.png) | ![Contact Page - Mobile](/docs/wireframes/contact-page-mobile.png) |

***

### **Color Schemes**

A base color scheme has been created for this project.

[Color Review](https://color.review/) was used to create this contrast appropriate color scheme.

[Solid Color Image Generator](https://mdigi.tools/solid-color-image-generator/) was used to create the solid color images in this documentation.

| Color Image | Hex | Use |
|---|---|---|
| ![#3AD555](/docs/colorscheme/3AD555.png) | #3AD555 | Primary |
| ![#FF7200](/docs/colorscheme/FF7200.png) | #FF7200 | Secondary |
| ![#FFFFFF](/docs/colorscheme/FFFFFF.png) | #FFFFFF | Background |
| ![#DDDDDD](/docs/colorscheme/DDDDDD.png) | #DDDDDD | Background Alt |
| ![#B0B0B0](/docs/colorscheme/B0B0B0.png) | #B0B0B0 | Border |
| ![#000000](/docs/colorscheme/000000.png) | #000000 | Text |
| ![#FFFFFF](/docs/colorscheme/FFFFFF.png) | #FFFFFF | Text Alt |

***

### **Logo**

The below logo was created using [Canva](https://www.canva.com/).

![Logo](../src/assets/logo.png)

***

### **Fonts**

The following fonts have been selected for use from [Google Fonts](https://fonts.google.com/).

| Font Name | Used For | Example |
|---|---|---|
| Koulen | Headings | ![Koulen](/docs/fontexamples/koulen.png) |
| Hind | General Text | ![Hind](/docs/fontexamples/hind.png) |

***

## **Development Management**

### **Development Process**

This project will be developed using an Agile process, utalizing an iterative approach to progression and prioritisation. Github's issues, milestones and Project (KanBan) features will be used to track progress during the development lifecycle, utilizing the MoSCoW methodology to manage task priority and iteration task assignement.

Github's Milestones will be used to track Epics, and will be comprised of User Stories in the form of Issues. These will be managed and tracked via the Projects (KanBan) feature.

***

### **Testing Methodologies**

During each iteration of developement, the project will be manually tested for bugs and issues. On discovery of a bug or issue, a commit will be made with a message detailing what has been found, and the steps taken to resolve the issue / bug.

For bugs / issues found and fixed during development of this project, please [Click Here](https://github.com/search?q=repo%3Alukebinmore%2Fguideshare+%22Bug+Fix+-+%22&type=commits).

***

### **Periodic Reviews**

Each iteration will span a period of one week, ending with a review of the progress made. Incomplete Epics and user stories from the current iteration will be relocated back into the backlog for future assignment. The results of these reviews will determin what epics and user stories will be included in the next development iteration.

To view the project (KanBan) for this site, please [Click Here](https://github.com/users/lukebinmore/projects/7/views/1).

***

### **Epics / User Stories**

For Epics relating to this project, please [Click Here](https://github.com/lukebinmore/guideshare/milestones?state=open).

For User Stories relating to this project, please [Click Here](https://github.com/lukebinmore/guideshare/issues?q=label%3A%22User+Story%22+).

***