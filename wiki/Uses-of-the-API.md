The following data structure is taken from row 1556 of the spreadsheet, for establishment 8217.  Data has been removed for privacy reasons.  At the time of the approvals log snapshot, this application had completed its first visit, and was waiting for the 3 month deadline, for another FVL visit.

The contents of the approval row (converted to JSON) are the following:
```
{
    "id": "1556",
    "dateRecieved": "10/28/2019",
    "deadlineFirstContact": "11/11/2019",
    "dateOfFVL1stContact": "11/4/2019",
    "3MonthDeadline": "2/1/2020",
    "6MonthDeadline": "5/8/2020",
    "FVL": "Mxxxxx xxxxxx",
    "FVC": "Axxxxx xxxxxx",
    "Status": "FAP",
    "Due Date": "5/8/2020",
    "CL": 24,
    "Approved Activities": "RSL,RCP, MP, CS",
    "EstablishmentNumber": 8217,
    "EstablishmentName": "S-xxxxxxxxx",
    "Country": "England",
    "Address": "xxxxxxxxxx",
    "WaitingFor": "FVLToContactFBO"
}
```

The form of data that might be collected via the proposed API would be the following:
```
{
    "application": {
        "id": "xxxx-xxxx-xxxx",
        "establishmentId": 8217,
        "status": "Waiting for FVL to Contact FBO"
    },

    "events": [
        {
            "type": "FBO Submitted Application",
            "createdOn": "2019-10-28"
        }, 
        {
            "type": "Financial Background Checks",
            "createdOn": "2019-10-28",
            "completedOn": "2019-11-01"
        },
        {
            "type": "FVL Assigned",
            "createdOn": "2019-11-01",
            "assignedTo": "Mxxxxx xxxxxx"
        },
        {
            "type": "FVC Assigned",
            "createdOn": "2019-11-01",
            "assignedTo": "Axxxxx xxxxxx"
        },
        {
            "type": "FVL to FBO First Contact",
            "dueBy": "2019-11-11",
            "completedOn": "2019-11-04",
            "assignedTo": "Mxxxxx xxxxxx"
        },
        {
            "type": "FVL First Visit",
            "completedOn": "2019-11-04",
            "scheduledFor": "2019-11-04",
            "assignedTo": "Mxxxxx xxxxxx"
        },
        {
            "type": "FVL Report Due",
            "completedOn": "2019-11-08",
            "dueBy": "2019-11-14",
            "assignedTo": "Mxxxxx xxxxxx"
        },
        {
            "type": "3 Month Deadline",
            "dueBy": "2020-02-01",
            "assignedTo": "Mxxxxx xxxxxx",
            "scheduledFor": null
        },
        {
            "type": "6 Month Deadline",
            "dueBy": "2020-05-08",
            "assignedTo": "Mxxxxx xxxxxx",
            "scheduledFor": null
        }
    ]
}
```

There are several benefits from this new structure.  

1. The next task that is due (the 3 month visit), could be easily flagged or notified on by filtering on tasks assigned to the FVL, due within a certain time-frame, that are incomplete.  Automated reminders could be set based on this data.
2. An exact view of the data at each point in time can be gathered, when every task was created, assigned and completed.

3. Reporting on SLAs becomes trivial, as it is easy to see that the FVL to FBO first contact, and the report, were both completed well within their allocated times.  Again, reminders and report generation could easily be automated from this data.

## Central 'Application/FBO' Data Entity
The above details the data interactions that would happen over time for an approvals row.  The central data item in this case is an `application`, with an `establishment_id`, a link to a core entity (currently in E&P) which could be automatically updated with the current operating status based on FVL visit outcomes, operator details from the originally submitted application form, and so on.

This however **assumes that it is possible to have an establishment lifecycle beyond, or before that of the core data entity**.

For example, an FBO that has just applied might not have an establishment record in E&P to link to, but still needs somewhere to store:
* Premise information
* [Operator](https://foodstandardsagency.github.io/enterprise-data-models/entities/operator.html) information,
* [Activities](https://foodstandardsagency.github.io/enterprise-data-models/entities/activity.html) 

and all other items that would eventually constitute an approved [Establishment](https://foodstandardsagency.github.io/enterprise-data-models/entities/establishment.html).  What this means is that a new and unapproved establishment is not stored in E&P until it is approved, and therefore is not currently a suitable record against which to store the tasks necessary for reaching approval, such as background/finance checks and FVL visits.

Ideally this information would live in the system of record as soon as possible, which raises the question of whether it is suitable to have a 'Pre-Establishment' entity existing alongside Establishments.  Given that the reference data standards refer to establishments as being 'Approved Establishments' this suggests this is not the intention.

### Option 1 - Storing Pre-Approved Establishment Information in a flagged Establishment
One possibility is to have establishment, operator and premises information stored in the system of record, with some form of marker to say that this is not yet an approved establishment.  Depending on implementation, and the number of systems that might need to be updated based on their reliance on E&P information, this could prove to be complex to implement.

### Option 2 - Storing this information in an 'Approvals' system
An alternative is to store this information in a dedicated approvals system, which then creates an establishment record at the point the establishment is operating under some form of approval.  The complexity that comes from this is the need to maintain and read from two separate data stores to get the full picture of an FBO at a point in time.

***

To illustrate, imagine an application is received for an FBO.  This data, the collection of operators, the premise is held in an applications only system until conditional approval is granted at which point it enters the 'real' data set.  It is now complex to query between approved and unapproved establishments, for example, to cross check operators and premises.  If this data was in a flat structure with a flag to say "This establishment is only at the application stage", querying across applications and approved (or even revoked) establishments and operators becomes much easier.

## Centralising the Assignee
Links to the **Person** data entry in the sketches.

To clarify, this is distinct from an **Operator**, and is instead calling out the need for unique assignment of internal tasks to FSA staff or third party workers.

Currently, the concept of who a task is waiting for is determined by a name entry in a spreadsheet.  This is error prone, and difficult to report on.  For example, if a user wants to know:
_What are all the tasks currently blocked by any FVL?_
_What are the applications that are waiting for completion by a specific person?_

These questions are dependent on the correct text being entered into the correct box.  Having a record that centrally identifies a person (Which could be a record ID in E&P, or a Microsoft account ID) that also links to further information about that person allows reporting on the status and interaction between tasks and people in any way needed.  The first example above roughly corresponds to the following SQL:

```
SELECT FROM TASKS T INNER JOIN PERSON P ON T.ASSIGNEE_ID = P.ID WHERE P.JOB_ROLE = 'FVL'
```

Or in English:
```
Show me all the tasks where they are assigned to a person who has the Job Role of 'FVL'
```

This kind of query is possible from basic examination of the data, and would not require generation of a report manually.

### Linking files where they are needed
Links to the **File** data entry in the sketches.

Files are frequently uploaded, and represent a significant chunk of the data that makes up an FBOs application.  While a fileshare alleviates some issues around team work with data files (avoiding files being emailed to each other), a regular file store has limitations.

Ideally, it would be possible to determine:
* What are all the files for an individual application?
* What is the history, e.g. the set of changes, for a specific file
* Who created this file originally?
* Who last updated it and when?

Having a system that intercepts interactions with the file store, and audits changes, allows for answering these questions.  Linking an application entry to the relevant files (and the relevant versions of those files) reduces the workload involved in building a picture of the current state of an application.

A **File** entry would be immutable, with an optional link back to a previous version of a file.  This enables building a history of a file, and determining where changes have happened between creation and the final use, for example: understanding that the original version that was uploaded was not the same as the version that was sent to an FBO.

## Unique Identifiers
The ability to uniquely identify and reference complex objects from multiple places is critical to several of the above benefits, such as being able to identify tasks in flight assigned to job roles.  For example, a **Person** is currently stored by name in the approvals log, e.g. to identify that, for example, an FVL is assigned to an FBO.  The audit fields added to the event records such as `createdBy`, `updatedBy` also should link to a **Person**, and name is not a good unique identifier.

Other entities, or types of data that do not have a unique identifier in the FSA data standards are listed below:
| Entity | Description |
|--------|-------------|
|Person  |Assigned a `number` as an identifier in the sketches, based on the likely primary key in E&P.  Unique identifier would depend on where this data is stored |
|File    |Sketches have used `uuid` as a placeholder.  A **File** in the sketches is considered to be an immutable snapshot of a file|
|Event   |Sketches have used `uuid` as a placeholder.  This will mostly surface as an assigned task or an audit event.  For assigned task it will likely be driven by the eventual system, and could be some form of 'Job Number'|
|Case    |Sketches have used `uuid` as a placeholder.  This is an important unique identifier as it will be the element that ties together all internal and core information about an FBO|