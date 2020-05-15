Juan's Technical Challenge for Blue Coding

##### Overview


Built with Next.js + Redux + Material UI + Axios

Single Page Application that uses the Giphy API to render gif thumbnails and full images in a modal view. 


#### Architecture

## /core/api

Simple axios API wrapper that simplifies API call writing on the redux actions. 

## /components

We have one simple component called GifCard, created to show encapsulated layout / functionality and dynamic rendering based on selectors. 

## /redux/store
Simple store built with thunk to handle async calls. It also uses composeWithDevTools because Next.js is server side rendered so this allows Chrome Redux tools to access the store. 

## /redux/reducers
Reducer for all the gif related information, combined into the rootReducer, which showcases the potential for more individual reduces to be added later on. 
The gifs reducer has information about Giphy API data downloaded which handles the pagination on it's own. 

## /redux/actions
The redux actions include a fetch from the Giphy API that uses the API wrapper (axios), and an action that selects the current data set index for the gif we want to display in the modal 

## /redux/selectors
We have selectors for the whole gif list which serves the purposes to render the grid, a selector for the current offset which is used to trigger the action that downloads the next "page" of data, and finally one selector that generates the individual gif object we use in the modal

## /pages/index.js
Our only page for this project. 
We have some hooks in place for the search term input, the loading state for the modal image, and the modal state (open/closed).

We render the grid content with the cardList() function, which uses the gif list selector to show it's images. 
Clicking any of this GifCards opens the modal. 

Under the grid we have buttons to move back and forth between the "pages". 

The modal contains buttons with functionality to move back and forth on the gif list, and render the seleted image at full size. 

Once we hit the end of the list, we also gather a new page from the API and move back to the first new element on the new "page". 

The modal can be dismissed by clicking outside.


## Misc
We also have a custom app wrapper functional component (_app.jsx) that brings the redux store into Next.js
And we are using one image for the loading state of the modal which funnily enough was gathered using this tool itself :)

## Desired missing features
- UI Error states
- Edge case for reaching the end count of the fetched API data
- Keyboard to navigate 