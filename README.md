# Events_App
A meetup events app to find local meetups 

This is a serverless application that displays upcoming events. 
The list can be filterd by city.
Users can change the length of the list showing events
Contains a chart showing the number of upcoming events by city
Will be able to be added as an app shortcut on the home screen

(GH-Pages link)https://segwegler.github.io/Events_App/

AWS hosted link - WIP

#Features + user stories and BDD scenerios 
Feature 1: Filter Events by city
  User Story:
    As a User,
    I should be able to filter the list of events by city,
    So that I can find more relevant events

  S1: When User hasn't searched for a city show upcoming events from all cities
    Given - that a user has not entered a city to search for
    When - They load the app
    Then - Results from all cities will be displayed

  s2: User should see a list of suggestions when they search for a city
    Given - The app is loaded
    When - A user starts entering the name of a city in the search box
    Then - suggestions for cities will be displayed

  S3: User Can Select a city from the suggested list
    Given - A user has started typing in the search box and a list of suggestions is shown
    When - A user clicks on a suggestion
    Then - The Suggested city will be filled into the search box and used to filter the list

Feature 2:
  User Story:
    As a User,
    I should be able to expand or collapse details for an event,
    So that I can see more information about an event

  S1: An element is collapsed by default
    Given - The app is loaded
    When - A user views the main page
    Then - A list of event titles will be listed with the information hidden

  S2: User can expand an event to see its details
    Given - A user is on the main page, with event titles loaded with details hidden
    When - A user clicks to expand an event
    Then - Details of the event will be shown

  S3: User can collapse an event to hide its details
    Given - A user has expanded the details of an event
    When - A user clicks to hide the details
    Then - The details of the event will be hidden

Feature 3: Specify the number of events
  User Story:
    As a User,
    I should be able to change the number of events shown at one time,
    So that I can see more or less events at one time

  S1: When a user hasn't specified a number, 32 is the default
    Given - The app is loaded
    When - no number has been entered to limit the number of results
    Then - 32 results will be shown

  S2: User can change the number of events that they want to see
    Given - The app is loaded
    When - A user enters a number to limit how many results are shown
    Then - The list of results will change length to try and match the limit given
    (If there are less events for the given filter then there might be fewer items than the limit)

Feature 4: Use the App offline
  User Story:
    As a User,
    I should be able to use the app offline,
    So that I can look at events when I have a poor connection or no connection

  S1: Show cached data when there's no internet connection
    Given - The app has no internet connection and there is cached data
    When - The user opens the app
    Then - cached data will be shown

  S2:Show error when user changes the settings (city, time range)
    Given - The app has no internet connection
    When - A user tries to change the settings
    Then - An error will be shown

Feature 5: Data Visualization
  User Story:
    As a User,
    I should be able to see a chart of events coming up in each city
    So that I can know when events are organized in each city

  S1: Show a chart with the number of upcoming events in each city
    Given - The app is loaded
    When - The main page is viewed with data Visualization
    Then - a chart will be shown that shows the number of events in cities
