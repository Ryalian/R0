# Project O

Project O is a personal project as an experiment of the structure I call AI centered development method. Current stage(Engine) is R0.
The project will be deployed to [https://twice.live](http://twice.live)

### What is AI centered development(AICD) structure?
AICD structure is still in a very elementary stage as a development theory. A lot of components of the structure still need to be complete.

The basic idea of this structure is: An application will includes many small widgets call EntryPlug(EP). An EntryPlus work as a the most basic functional block in the structure. Just like a regular widget, EP contains display content(as DiracSea), data state(as LCL Engine) and actions(as AT Field). The difference between a regular app structure(such as MVC) and AICD structure is that in AICD, widget(EP) will not interact just within itself. Instead, it will send an request to the Control Engine in the top application level. Control Engine will then process and decide the next action about what should happen. During this process, Control Engine can decide to run the default logic of EP or do additional actions according other constrains(*). After processing in Control Engine, it will then return a command to EP and update content and data state.

The puporse of this structure is to add a super control layer across all widget. This enables the application to modify the widget according to higher level algorithm. As the name indicates, this is ultimately designed for AI as the Control Engine. With this structure, AI can decide what to record modify and display. It also makes it possible to chain different widget together as Control Engine takes care of all the EPs. Because all the actions go through Control Engine, if we have a AI Control Engine, theoretically the application can evolves on it own without much client code update as machine learning continues. For example: we have a video EP and a calendar EP. According to the events added to the calendar, if user adds a lot of sport related tasks, the video EP will gives more sport related recommendations or insert a mini version of video into the calendar(which doesn't necessary need to be design specifically possible for video, but just a insertable component). Another use case for the AICD structure is to smartly change the content or even UI style of the widget or even the whole application. For example, if the AI evolve enough to the point that it can tell the user's personality, it can change the color and the shape of the UI accordingly. Ultimately, the application can generate UI components to assist user to better solve problems. That is, the basic design method when making an EP is to: 1, create a basic puropse widget; 2, create a UI module with general-purpose-block(GPB) that allows external components to insert to. 3. make a mini version components that could be fit into a GPB. 4. sends all the user behaviors to the Control Engine for it to process.

Above is the basic idea of AICD structure. One thing to mention is: the above is mainly focus on the client side. There can be multiple super control layers(SCL). For example: there could be "CLIENT SCL" => "USER SCL" => "REGIONAL SCL" => "SUPREME SCL" ETC. These will need a bit more thoughts and knowledge.

This structure is to solve the problem that the AI usage nowaday is still stuck on data level or system assistant level. There's no connection thourgh out the whole computational structure. This structure will connects "user demand", "application", "data" and "system" all together.

Send me an email if you read this and have any thoughts: ryalianese@gmail.com

************************************
This page is the roadmap of the app. To see how mechanics works, please read [here](./appSrc/app/readme.md)

R0 will be the version below 1.0:
  - v0.1 Set up basic React, webpack and express - Done
  - v0.2 Set up basic wireframe of state, action, engine and dirac sea(item pool, aka DS). See detail below - Done
  - v0.3 Set up Nginx proxy - Done
  - v0.4 Write agenda of the project - Done
  - v0.5 Big version change for first app - Calendar!
### v0.5 *My Calendar App*
> v0.5 Will be a examination of if everything about this framework can be chained together

  - v0.5.0 Create data model for experience (Backend)
  - v0.5.1 Display item in dirac sea (Frontend API call)
  - v0.5.2 Basic layout for dirac sea items
  - v0.5.3 Implement state for the application(Filter, Sorting, etc.)
  - v0.5.4 Add detail to DS item
  - v0.5.5 Event handler for DS item(modal, notification, etc)
  - v0.5.6 Implement Action for the application(Add, edit, Remove DS item). No actual change to the data
  - v0.5.8 Implement database to replace hardcoded data. Action actually works.
 
 First Application should be ready for delivery at this point. App will get small clean up until 1.0

  - v0.6 Create home page, make application selectable. Implementation of Router!
  - v0.7 Basic function of core Engine(SOUL!)
  - Account login, share the app with others :) -Must have :3 
EXTRA: make content alive! poping content! *****
### v0.7 is *critical* but also *unknown*
Original plan is scrapped, need to rethink
 
After v0.7 R0 is complete! Not so fast...

  - v0.9 Test cases, unit test

# v1.0.0 -  *1000000001th TODO List* Engine R1
> Yes, I am gonna make the 1000000001th TODO List App. 
> It's the last one in this planet I promise. 
> Well, hopefully.

### TODO List candidates (Priority: unknown)
  - Add & remove item (1st thing of course) -Must have
  - Event information(time, location blah, blah) -Must have
  - Alert -Optional
  - Calendar(Absolutely the last thing to work on, I may put it on v10.10.10) -Optional
  
  <!-- below is not decided yet just some thought -->
### v2.0.0 *Voting App*
> Hopefully I can get this far. I will close the github to private since it's containing account system in this stage.

  - v2.0 Topic List (hardcoded)
  - v2.1 Topic Creation page
  - v2.2 Text only topic voting interface
  - v2.3 Add details to the interface
  - v2.3 Add photo-text mixed topic
  
 ##### Planned features for later version:
   - Video based topic(*We will have a video player app as v4.0*)
   - Audio based topic(*same as above*)
   - Share link
   - Location based photo comment(click and comment)
   
> By here, I should consider about making an mobile app or progressive web app

# v3.0 *Data mining and Core Engine update* Engine R2
v3.0 will be a backend update for data analising. So far all the developments are based on front end. To improve the UX and data value, certain level of data mining is required. Also, the core of this project is Core Engine. I should update it to at lease Chatbot level and evolve to AI in the future.

# v4.0 *Video Function*
This is my most desired project! Only reason putting it to v4.0 is because it will cost a lot(T T). There will be a version system of this app based on the comment voting system so everyone can branch out the original version and create their own topic. This app will also contains a lot of editing functions. It's where action engine shines. The function here will out run youtube if they are still not moving forward. This is also the stage where I would start exploring opportunity to create profit(depend on how many user I have, I expect 10).

Everything TBD but:
# The video should be in the center of the screen!!!!!!!


  