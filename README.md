# Carbon calculator

## Intro

The purpose of this web app is to allow organizations to manually add their consumptions in a modular way and get a calculated CO2 emissions print back. The webapp should be kept simple, modular and easy to maintain while also looking good and modern using a minimalistic but colorful design.

## Pages

At the top there is a navbar with icons. Left is the logo.png and to the right are links to the pages: Settings and Statistics.
At the bottom there is a footer that has a link to the About page

### Main page

The main page should simply show a list of organizations. If none are available, the user can add one with a + button. Each item in the organization list has a button on the right that allows to be deleted (with a confirmation modale). Each organization card view has a title, a description and the flag of the country as the icon. Clicking on an organization item in the list, opens the dashboard for that organization.

### Dashboard

The dashboard page contains a list of modules configured for that organization. There is a floating action button to add more modules. Upon clicking it, a new page pops up with a list of possible modules. The user selects one, adds the value and taps ok to confirm, then he gets rdirected back to the dashboard. Each module in the list on the dashboard has a title, a short description and the value entered with its entity (pieces, kg, km, ...). On the right of the module are two icons, one for editing the value and one for deleting the value (with a modale confirmation).
At the top of the dashboard page is a big number showing the total CO2 emission from all modules together

### Settings page

Contains basic settings like changing the language

### About page

Contains the name of the project, a description, list of contributors and at the bottom it has the erasmus logo.

### Statistics page

It displays stats about one or more organizations (can be selected). The user can compare two organizations, or simply check the data of a single organization with colorful displays and diagrams.

## Others

- Emission factors can differ from country to country and are kept in json files
- Language translations are also kept in JSON files
- The app is a pwa and can therefore be installed on a phone and should be offline first
- The website will be hosted on GitHub Pages
- The website must be responsive and use tailwind CSS style