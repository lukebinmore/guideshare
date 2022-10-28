# [**Go Back**](https://github.com/lukebinmore/guideshare)

# **Table Of Contents**
- [**Go Back**](#go-back)
- [**Table Of Contents**](#table-of-contents)
- [**Testing**](#testing)
  - [**During Development**](#during-development)
  - [**Automated Testing**](#automated-testing)
  - [**Manual Testing**](#manual-testing)

***

# **Testing**

## **During Development**

For bugs found and fixed during the development of this project, please [Click Here.](https://github.com/search?q=repo%3Alukebinmore%2Fguideshare+%22Bug+Fix+-+%22&type=commits)

***

## **Automated Testing**

Before finalizing the product, a number of automated tests were carried out to ensure the site functioned as expected. These include:

 - [Prettier Linting & Formatting]() - To ensure all files follow industry standards.
   - All files follow industry standards.
 - [Jest Unit Testing]() - Component files were tested using lint to ensure correct rendering.
   - All components tested render as expected.
 - [Chrome DevTools]() - Lighthouse used to ensure site meets industry standards.
   - All aspects of all pages meet minimum of 92% on both desktop and mobile.
   - Home Page, Feed Page, Saved Page, WIP Page
     - Desktop
     - ![Home Page - ](/docs/lighthouse/home-page-desktop.png)
     - Mobile
     - ![Home Page - ](/docs/lighthouse/home-page-mobile.png)
   - New Post Page, Edit Post Page
     - Desktop
     - ![New Post Page - ](/docs/lighthouse/new-post-page-desktop.png)
     - Mobile
     - ![New Post Page - ](/docs/lighthouse/new-post-page-mobile.png)
   - Post Page
     - Desktop
     - ![Post Page - ](/docs/lighthouse/post-page-desktop.png)
     - Mobile
     - ![Post Page - ](/docs/lighthouse/post-page-mobile.png)
   - Profile Page
     - Desktop
     - ![Profile Page - ](/docs/lighthouse/profile-page-desktop.png)
     - Mobile
     - ![Profile Page - ](/docs/lighthouse/profile-page-mobile.png)
   - Contact Us Page
     - Desktop
     - ![Contact Us Page - ](/docs/lighthouse/contact-page-desktop.png)
     - Mobile
     - ![Contact Us Page - ](/docs/lighthouse/contact-page-mobile.png)
   - Error Page
     - Desktop
     - ![Error Page - ](/docs/lighthouse/error-page-desktop.png)
     - Mobile
     - ![Error Page - ](/docs/lighthouse/error-page-mobile.png)

***

## **Manual Testing**

Manual testing of the code and site was carried out during development. Below is a summary of the manual tests completed both during and after project finalization.

 - Page Loading / Layout
   - All components and pages have been tested for responsiveness and have behave as expected.
   - All components and pages have been tested for browser compatibility with the following:
     - Chrome
     - Firefox
     - Edge
     - Safari
     - Opera
   - All components and pages have been tested on both simulated and phsyical devices.
     - Android Smartphone
     - Apple Smartphone
     - Windows Desktop
     - Mac OSX Laptop
     - Linux Desktop
 - Color Scheme
   - All content has been checked for coherent color scheme.
   - All content has been checked for theme implementation coheasion.
 - Navigation
   - Navigation has been tested accross the site, and functions as expected.
   - Error pages have been tested for correct display, and funciton as expected.
   - User access has been tested across the site, and restricted content has been successfully blocked for non-authenticated users.
   - Manual URL navigation has been tested for error management and access, and behaves as expected.
 - Contexts
   - All contexts have been tested for correct data, and function as expected.
 - Components
   - All components have been tested, and render as expected.
   - All component functions have been tested, and operate as expected.
   - All functions have been tested for error handling, and function as expected.
 - User Access
   - Users access to information or content has been checked, and confirmed to be limited where neccessary.
   - Users ability to act on content has been tested for appropriate behaviour, and is restricted where neccessary as expected.

***