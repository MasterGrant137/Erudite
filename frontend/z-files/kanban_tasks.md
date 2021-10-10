CHANGE data-ms-input condition on songPage to use data identifier attribute

STYLE NAVBAR (add absolute to nav bar to start perhaps)
STYLE SONG PAGE

CONSIDER onMouseover delete X in p tag or button appears for comments

CONSIDER moving context menu to a smaller component
STRONGLY CONSIDER making your regex more performant

BEWARE height of comment section on songPage in CSS, #sp-comments-holder, there was no other way to allow scroll, perhaps div would like the textarea for the lyrics does, it
BEWARE songPage unique key issue, manifests when switching pages

Implement validations for add song and viable pages

Don’t forget to remove the limit on your /my-songs route when you finish testing
Change emoji for drop down since home isn’t even one of the options, some navigation emoji only works when the ul has a small height, it should be based on any possible overflow instead of some arvitrary height

the user who posted a song should be able to see an edit option that directs to edit page but not anyone else, we should be able to see who posted something

- Learned
    - When two reducers use the same action, you may need to clean the state before either return. This also applies to a singular reducer with different content rendering on different pages.

- TEST mySongs for loading since you added the payload key
- TEST songPage too for the same reason
- CONSIDER on SongPage, taking away useParams and putting in song.title, try using useSelector earlier that useEffects

- BEWARE shared state between mySong and Top Songs, may have been a rendering abnormality but I saw one song go to the front of the list of topSongs when I switched pages, couldn't recreate

- custom context menu should freeze the screen like the default one
- make the title Erudite sticky at the top, especially for MySongs page

- On mySongs page and any related pages, rename ids like big-mySongs-lyrics to big-mySongs-card for explicitness since the whole card is being affected
- Animate all the pages and check the background and borders

+ implement Speech Synthesis integration

- rename thunks on queries
- Return void in mySongs arrow function check that out!
+ When user adds a new song, make sure to add the pipe character before and after just like the seeds have for producer and artist. Consider adding spaces in between pipes, indicate commas need to be added between producers or artists, indicate an embed code need to be used for video or perhaps you should be prepared to accept links
+ Convert all irregular apostrophes to regular apostrophes and while you’re at it, port over the code for line terminators and everything
- Fix the UI for Edit Song

- unused imports backend and front end remove
+ edit song page background
- Payload on queried songs change


, also see if it’s something that can be generically added to everything and backgrounds could be added to certain components/Perhaps even on the main html tag/While you’re at it, check the IDs and see if some of them are mapped to multiple elements and should actually be classes or vice versa or element.dataset.columns attribute or CSS element[data-columns=‘3’]/the homepage onclick for the div needs to be looked into, are there unexpected behaviors? How can that be refactored if you wanted to

+ **/**
    - big title for Erudite
    - featured/charts will be here
    - top *arbitrary number* lyrics, artists, etc. in big carousels
    - slideshow of some media
    - new animation
        + similar logic to auth animation but make it for the whole page
    + 2 carousels
        + you can navigate either direction and clicking on the carousel links directs you to the lyrics pages
        + attempting to comment, annotate, or add a song gives a non-obtrusive prompt to sign up or sign in
+ **/login**
    + finished
+ **/signup**
    + finished
+ **/search**
    + starts off as only an emoji
    + search bar appears and disappears as emoji is clicked
    + import package for regex search suggestions
    + button clicker for what type of search you want to conduct
        + probably would be better for performance
        + it would also improve the search results
        + artists, lyrics, titles, producers, all supported
        + include a search all option but don't set it as default
        + maybe the options are a dropdown called "Search By:"
        + you should be able to combine multiple types of queries in search, checkboxes not radio inputs
    + make sure the query is forgiving to spelling errors
    + there will also be a dropdown menu of the actual query return
    + when clicked, this will increase visit count in song relation
    if form is submitted, user is directed to “search?q= page” that contains all the queries laid out (query limit higher than on search page)
        + if one of the search links is clicked, however, you’ll be directed to /:lyricID-lyrics

+ My songs appears on another user’s account on the same computer if refresh isn’t hit. I should redirect. It also opens up to the mySongs page too, another issue. This means that all the songs a user made show up on the top songs, big issue.


-  It is local 24 hour time for postbird/Sequelize
- It is GMT 24 hour time, no offset, for frontend
- backend console.logs get printed to terminal
- frontend console.logs get printed to console

- if you’re going to use context menu for your cursor, add a right click option, otherwise, change it
- redirects for submits
- add song page

+ add delay to mySongs visits text box retraction

+ lower CSS delay, fix hanging words outside of text box on cards on my songs page and edit song page
+ look into the carousel scroll if there’s no WebKit

- parser should be able to detect 3.2K means 3200
   + add comments
   + add annotations
+ when delete redirects, the new page is not loaded? The await doesn’t seem to be working but it works for the edit?

- Load a song page with new content for every new route (Search functionality?)

It’s desired but why does the page display the top songs on songs home page ascending?

Is an issue that my post Route for adding a song is to my / page?

- Fix my-songs page and home page shared data bug
+ Improve site security


+ people can edit who didn’t make the song!
+ duplicate tab signs in?!
- why doesn’t edit/:id return anything but I can go to mySongs and it will work
+ Why can’t I enter url and then comment
-  why does refresh eliminate functionality on my edit song page
+ your store thunks should be renamed for explicitness, check all the variables too, even the file name (unless you’re going to split the store files up)
+ why can’t I style my Add Song Page with grid template areas?
+ fix up queries in backend routes for efficiency, see where you could perhaps fit in findOne or findByPk, research if that’s actually more efficient
+ check if you can pass userID as a prop on frontend components instead of parsing from JWT in backend routes
+ TEST that no patch can occur without song’s user ID matching requester’s
+ TEST OR ASK to see if someone could just change their cookie base64 to include another user and then gain edit functionality, should or can I hide token, is this necessary? Is my condition inside my songs route for patch sufficient for preventing this?
+ should I be using req.session.auth
+ clean up code
   + index for SongPage song title parsed from Params multiple times, should be a variable
   + double useEffect on songs page
   + duplicate variables on edit song index too

Erase WebKit from all but necessary for scroll and any others present

add copy and paste help perhaps with a cool message to add song page

If there’s no music video then you should just post the IMG in the carousel or even the lyrics if that’s out of the question

Cleanup GMT display for updated and created info on my-songs
