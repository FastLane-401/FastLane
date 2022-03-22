# *FastLane*: The On-the-Go Writing Assitant
The focus of this project is building an automated writing assistant to perform intelligent interaction through a mobile device. Specifically one that enables users to “write during commutes”. This software will focus on hands free writing process from brainstorming to creation. 

FastLane has 3 modes of operation:
1. **Mindful Mode:** A mode that facilitates capturing arbitrary thoughts where peopledon’t have an intended place for their assignment. \
Possible rename to Brainstorm mode?

2. **Command Mode:** A mode that facilitates issuing a series of commands that allowthe user to issue commands in support of completing intentional actions. \
Possible rename to Writing mode?

3. **Editing Mode:** A mode that engages the user in a Question-Answering sessions with the goal of editing the document in an assisted fashion.


## Global commands
These commands will be valid, regardless of which mode the user is operating in.

- "Select mode (Mindful | Command | Editing)": Provided one of the three available commands, this switches how the user interacts with the app.
- "Clear session": Delete all brainstorming notes from this session, giving the user a new blank slate.
- "Rename session (Session_name)": Rename the session, which is represented the session's markdown file name, to 'Session_name'.
- "Rename title (Title_name)": Rename the title of this session, which is represented as title (Level 1 markdown header) in the session's markdown file.
- "Do nothing": Ignore user input.


## Mindful Mode
This brainstorming-centric mode listens for the following commands:

- *No commands specific to Mindful Mode exist yet.*


## Command Mode
This document creation focused mode listens for the following commands:

- *No commands specific to Command Mode exist yet.*


## Editing Mode
This document editing focused mode listes for the following commands:

- *No commands specific to Editing Mode exist yet.*