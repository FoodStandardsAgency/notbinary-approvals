To assist in the understanding of how a system could be modelled, the following API diagrams illustrate the proposed data interactions of the approvals team against an API.
[Link to API Sketches](https://notbinary.github.io/fsa-approvals/)

These provide a **hypothetical** API that would serve the purposes of the approvals team, and how that data would interact with the wider FSA.  This **should not be taken as a proposed system specification for development**, only to inform what a system would need to do, and what data stores it would need to interact with.  Any real bespoke systems that are developed should follow an Agile model of refinement and then development, for which these API sketches might simply serve as research information.

The difference between the hypothetical architecture and a real one will be mentioned where appropriate.

## Core
The paths under the name 'Core' refer to endpoints that would need to be populated from FSA core data.  This is the form of data that is currently held in E&P and SIR.  Example activities by the approvals team that would need this data:

* Assigning an FVL to an FBO, where the FVL person record is currently stored in SIR.  Regardless of where this data is stored, a central concept of an assignable 'user' is a good practice, whether this is an ID of an SIR record, or a Microsoft Account via Office 365.
* Creating and updating an establishment from the approvals data.  Again, this data could be in E&P or a replacement system.  Regardless of where core data is stored, the ability to external systems such as the approvals system to update it automatically is imperative for reducing the duplication of data and data entry effort.

The models referenced by the core endpoints are linked to the corresponding entries in the FSA data standards, or to the E&P/SIR tables that they are currently stored in.

## Events

![Events Diagram](https://user-images.githubusercontent.com/4345596/89119404-44abf080-d4a6-11ea-8079-4c82a0fb9426.jpg)
_Fig 1: Three types of event that the system should be able to handle. FVL Identifier is an example of specific event information that might be added_

The word 'event' here means 'a thing that has happened, or needs to happen during an FBOs journey through the approvals team.  At it's most basic, an event is a a marker indicating that something has happened.  An FBO opening a new application is an example of an event.  An FVL visiting an FBO is an event.  A member of the approvals team notifying an FVL that an FBO should be visited is an event.

In a real system, events such as these could be modelled in many different ways.  Perhaps internal (approvals) activities would be modelled as 'Tasks' to contrast them with activities performed by an external user.  An off-the-shelf system will likely already have a model of tasks and work that would be adopted.

No matter what, the core of an event is that it should be possible to determine _what_ was done _when_ and by _whom_, corresponding to _Type_, _Created On_, and _Assignee_.  Storing extra information as a full audit log is useful, e.g. _Created By_ and _Updated By_.  This ensures that in the event of a failure, or a problematic process, it is possible to determine what the issue was.

In many cases, an event is a marker that something _should_ be done, by a specific individual or team.  The scheduled event captures this, adding information to capture who an event should be done by, when it should be done by, and when it was actually completed.  Some of this information could be empty at points in time.  For example:
* A scheduled event with no assignee is an issue, as it indicates that no one has been assigned to this task.  
* A due by date in the past, with no completed on date indicates that the task has overrun.  
* A completed on date after the due by date indicates that a task was performed late
Capturing this form of data allows for KPIs to be obtained for FSA approval related activities to any level of granularity.

![API Interaction](https://user-images.githubusercontent.com/4345596/89120098-5e036b80-d4ab-11ea-9a95-45139af3d204.jpg)
_Fig 2: The manner in which the approvals team interacts with the API, and what 'API' means_

Given this hypothetical event model, the use of the API by the approvals team can be understood with three simple interactions.  
1. Creation of events
2. Updating of events
3. Reading of events.  

A user might create an event to describe an activity that needs to be done, update it to assign it, update it to complete it, meanwhile reading the events to determine what work they need to be undertaking.

Figure 2 also explains what is meant by **API** in this document.  There is an implicit assumption that core FSA information can be created, updated and read automatically.  Since any activity performed by the approvals team will inherently involve updating various resources, such as marking a 'conditionally approved' establishment as 'fully approved', any digital system would need to be able to interact with those resources on the user's behalf.

This refers to data that is currently held in **E&P**, and the **SIR** system as a whole.  Potential strategies for interacting with this data are discussed later, but for now, this is considered to be available to the approvals team via the hypothetical API.

## Example of API Use

![Example use of API diagram](https://user-images.githubusercontent.com/4345596/89120252-c010a080-d4ac-11ea-9d58-4316c3f78491.jpg)
_Fig 3: An example use of the API to manage a set of activities_ [Open Image](https://user-images.githubusercontent.com/4345596/89120252-c010a080-d4ac-11ea-9d58-4316c3f78491.jpg)

To make it clearer, Figure 3 illustrates how this API could be used to model a set of activities.

### 1
**The FBO submits the application**
```
POST /applications
{
  "createdBy": "Acme Meat Ltd.",
  "formData": {
    ...The form data from the user-facing application
  },
  "documents": {
    "floorPlan": "/path/to/document/in/fileshare"
  }
}

Response (Application entity)
{
  "id": "1234",
  "events": [
  {
    "type": "FBO Submitted Application",
    "createdAt": "2020-08-02"
    "createdBy": "Acme Meat Ltd.",
    "formData": {
      ...The form data from the user-facing application
    },
    "documents": {
      "floorPlan": "/path/to/document/in/fileshare"
    }
  ]
}
```
First, an event is created in the system signifying that a separate system - the user-facing applications system - has finished the application process from an FBO.  The data is handed into this approvals API, so that the exact data from the initial form can be persisted and recalled.

### 2
***It is assigned to an approvals officer***

Next, an approvals officer is assigned to the case.  How this is structured depends on what the proposed system would need to do, and has not been modelled.  For example, an off-the-shelf system will have its own concept of how tasks are assigned.  Whether an individual is assigned to an event, or to the entire application as a 'case manager' would depend on requirements.

### 3, 4, 5
***Background Checks***
The first set of events that need to take place.  There are multiple ways this could be handled.  The API could simply create these events automatically, and notify the relevant teams.  Alternatively, the assigned officer could create these manually.

```
POST /applications/1234/event
{
  "type": "Perform Financial Checks"
  "assignedTo": "Financial Team"
}
```

### 6
***Financial Checks Performed***
The completion of one of these checks

```
PUT /events/5678 (The financial checks event created above)
{
  "completedOn": "2020-08-02",
  "financialInformation": {
    "document1": "/path/to/document/in/fileshare"
  }
}
```

As checks are completed, these could be marked off as complete, either directly by the team in question or by the assigned officer in response to an email.  The completion of all three checks successfully is required to move to item #7, which could also be automatically performed by the API once all checks have passed.  

### 7, 8, 9
***FVL Assigned Event***
```
POST /applications/1234/event
{
  "type": "FVL Assigned To FBO",
  "fvlIdentifier": "id-of-fvl-in-core-system"
}

POST /applications/1234/event
{
  "type": "FVL Contacted FBO",
  "assignedTo": "id-of-fvl-in-core-system"
  "dueBy": "2020-08-12" (now plus ten days)
}
```
The creation of these events could again be automatic, if a valid FVL could be automatically assigned.  Sending notification emails to Hod & FieldOps would certainly be a candidate for automation.

### 10
***First FVL Visit Scheduled***
```
PUT /events/8765 (The FVL Contacted FBO event above)
{
  "completedOn": "2020-08-10"
}

POST /applications/1234/event
{
  "type": "FVL Visit 1",
  "dueBy": "2020-08-20",
  "assignedTo": "id-of-fvl-in-core-system"
}
```
The FVL contacts the FBO within the expected time, and marks the previous event as completed.  A new event is created to mark that the FVL is due to visit the FBO by the allocated date.

## Overview
Looking at the proposed workflow above, the opportunity for reporting, automated notifications, and state management is much more robust than before.  Determining the 'state' of an application becomes simple, e.g.

| Stages | State |
|--------|-------|
|1-3| Application Received |
|3-6| Performing Financial Checks |
|6-10| FVL Assigned |
|10-*| Waiting for first visit |

The ability to automatically calculate the elapsed time between two events enables automatically determining various durations, e.g.

* **Duration 1:** How long did the background checks take to complete?
* **Duration 2:** How long did the FVL take to arrange the first visit?

At any point, a user could query the API like the following:
```
GET /events?assignedTo=me&dueBefore=2020-08-07&completed=false
```
To retrieve all assigned events assigned to themselves that are incomplete, and due within the next week.  

An approvals officer could query like the following:
```
GET /events?applicationId=1234&dueBefore=2020-08-07&completed=false
```
To retrieve all events for an application they are tracking that are incomplete, to determine if any assigned tasks need to be chased.