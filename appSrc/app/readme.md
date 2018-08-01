### How this page work?
There's five main Top Level Component(TLC) in this app: coreEngine, LCLEngine, ATFieldsEngine, DiraSea and entryPlugs.

The whole application performs like a game console platform:
    CoreEngine: gameConsole itself
    LCLEngine: storage of the console
    ATFieldEngine: game controller
    DiraSea: display device
    entryPlug: game capsule

# CoreEngine (Logic Control)
Soul of the app, perform as center of the app. All TLC interaction need to go through and process by CoreEngine
- Current Version: TYPE01

- EntryPlug needs to load it self and set up data into CoreEngine, info stored by redux. Plug's action(ATField) will be added to task list waiting for coreEngine to process. coreEngine would analyse and process the action task.

- LCLEngine Local plug state and universial application state needs to be set through coreEngine

- ATFieldEngine is loaded through coreEngine. CoreEngine determine how the ATFields are exposed to the interface

# LCL Engine (state storage)
Stores application data including loaded plug data and universial application data.
- Plug data may not be limited to only the loaded plug state(for example it may contain notification or progress bar of a different application)

- At current stage only loaded data is included

- Universial application data display may be toggle by CoreEngine

- LCL items could have action in some case, but this should be used for mutation state instead of creation. Creative action should be in ATFieldEngine

# ATField Engine(Action panel)
Actions that affects the loaded plug or universal application
- Actions related to universal application maybe determined by CoreEngine. 

- EntryPlug ATField is not always isolated from global environment, it could change under some special cases.

# DiraSea (Plug Content Display)
DiraSea is field that displays plug content(data)
- Content should not be directly affected by coreEngine. Instead, LCL status can influence dirasea as it represents state of plug 

- But coreEnine might be able to change LCL. But not direct change should be made
- Content in diraSea can send task to coreEngine to request change. Further more, task can affect LCL and ATField. Details in entryPlug note.

# EntryPlug (Capsulated logic)
EntryPlug is sub application that is capulated together with logic(dira sea view & logic), data model(LCL) and action(AT Field)
- All setup and interactions need to go through coreEngine
- Interaction happens through task request to coreEngine. Interaction including: change of ATField, change of LCL, change of data
- Multi step interaction should not assumes task will go through. Development should base on this idea
- EntryPlugs might be able to run in the background inside CoreEngine(or in the cloud).
- EntryPlugs can interact with each others