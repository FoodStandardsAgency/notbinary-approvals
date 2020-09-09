The proposed statuses from the workflow diagrams are the following:

* Enquiring:
* Applied
* Application Withdrawn
* Refused
* Appealing
* Conditionally Approved
* Extended Conditionally Approved
* Fully Approved
* Conditionally Approved - Under Review
* Extended Conditionally Approved - Under Review
* Fully Approved - Under Review
* Surrendered
* Suspended
* Withdrawn
* Change Requested

These are an accurate description of the states an application moves through (the horizontal stages of [the timeline](https://github.com/notbinary/fsa-approvals/wiki/service-timeline)).  The exact names of these states, and the final set of states, given that they are critical to internal process understanding, and might be publicly surfaced to an FBO, should derive from user testing in a real implementation.

Some of these statuses warrant more internal 'tasks/events' than others.  For example, **Applied** contains a wide variety of work such as background checks and FVL visits.

The following pseudocode illustrates how a change to an event could trigger a status change.  This does not necessarily mean that this process would **have** to be automated, as if all required information is surfaced easily, the human decision of changing a status would not generate a significant amount of work.

```
when an event is completed for an application
  check to see if the event is one that can trigger a status change
  for that potential status change, check to see if all other required events are completed
  if they are all completed
    change the status
```

One complexity in automation will come from the fact that events are repeated in a different context.  For example, an FVL will visit multiple times, triggering the same workflow.

It is worth mentioning that automating the move between statuses is potentially less valuable than automating the **tasks** that are associated with a status.  For example, it is potentially quite useful to determine work that must always be done, such as conducting background checks for an application, or raising invoices, and create and assign these tasks automatically.  This removes the need for the approvals team to send emails and update systems, by directly assigning the task to the individual that must perform it, and giving them a method for updating that same system when the task is complete.

In contrast, determining that **all** tasks are complete to a satisfactory standard in an area may still need to be a human task, with an approvals officer moving the status from 'Applied' to 'Conditionally Approved'.  The proposals here are more to do with giving that user the ability to make that decision based on information gathered in a single area, rather than automating the entire process.

## Sub Statuses
The statuses here could be far more granular, or could be detailed further by surfacing what events are still open.  For example, the 'Applied' status covers the entire lifecycle from conducting background checks, to waiting for an FVL to arrange a visit and return a report.

These events could be surfaced as sub-statuses, for example:
* Application Received - Conducting Background Checks
* Application Received - FVL Assigned
* Application Received - FVL to visit FBO