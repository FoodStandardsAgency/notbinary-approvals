# Digitisation of the application form
Prototypes of this work are [available here](Design-considerations).

Whether a digital form would entirely replace the paper form is a business consideration.  While it would come with significant benefits: having the data instantly and accurately mapped to a valid digital format, if paper forms also needed to be supported some form of manual input would still be necessary.  There would still be value in this digital form however, as it could be used by the approvals team when entering data, reducing the effort of translating between very different formats, e.g. application form to approvals log, or application form to E&P.

Once the data is stored from the digital application form, mapping it into the central data store would depend on implementation.  If E&P continues to be this store, work would need to be commissioned to create a valid data structure that could be mapped into E&P.  If instead an appropriate API is available, this work is significantly reduced, and does not rely on a third party.  This is a theme of this recommendations page.  Being dependent on a third party to perform any tasks to get data into or out of the central database in an automated manner will slow any potential change, and means the FSA does not truly own their data.

# Exposing and linking to FSA data via APIs
It is beyond the scope of this document to propose a replacement for E&P or SIR.  The data that relates to an approved application is already stored in E&P, so the database is clearly fit for that purpose.  Previous extensions have been made to SIR and E&P, such as for timesheeting, via Civica, so developing extensions to this system _could_ follow a similar format.  However, the technical approach of previous extensions has apparently been to build data structures and use NHibernate to map them into an SIR format.  General limitations of this technical approach have already been covered [here](https://github.com/notbinary/fsa-timesheeting/wiki/technology-overview#timesheet-system).  

At a high level, the current approach to provide existing technical solutions is generally one of 'forms and data', e.g. creating a new form to map to a data structure, and then doing something with that data structure.  The risk of continuing with this approach is creating further data entry tasks that do not actually reduce the amount of manual work that must be done.  Data access APIs allow for a flexible approach that means the user interaction can be targeted to their actual use case, or in some cases, automated so that no manual user interaction is needed at all.

Regardless of whether these these systems are replaced, they also currently focus heavily on **approved** food business operators, and as such, are currently unsuited to handling all of the data that the approvals team provide.

If the central data for the FSA exists in an accessible data format, such as an API, this reduces the complexity of improving the approvals team's workflows.  Most of the additional manual work for the approvals team is around tracking **who** is needed to gather or update data for that central store, and **when** they are expected to do it by.  This data is covered in the next section.

# Extending the FSA data models to account for non-approved FBOs, and ensuring flexibility of this data
Take this scenario:
_An FBO applies for FSA approval.  They then cancel their request at some point in the lifecycle before being even conditionally approved._

This is an instance of data that would not currently be able to be stored in E&P, as the approvals team do not enter data into this system until at least conditional approval is granted.  However, this data still must exist as an entity in order to be referenced for approvals purposes, e.g. assigning an FVL.

While it is _possible_ to work around this, to create a separate data store that holds 'approvals only' data, and then to map that data into the central system at the point conditional approval is granted, this will present a wide variety of problems.  A 'shadow' data structure that almost entirely maps to the 'real' data structures would need to be maintained.  Complexity will emerge when linking other data to an 'Establishment' that now might exist in one, or both of these structures.  For example, the uploaded documents that initially might point to an 'Approval', must all be changed to point to an 'Approved Establishment'.

A better way forward is to get this data into the central data system as soon as possible, and have it excluded from reports or systems that only want to deal with approved establishments (e.g. Open data publication reports).  This allows separating data concerns, i.e. there is 'approvals' data, which only relates to case management and task organisation, and 'establishment' data, which relates to the FSA's model of an establishment, whether or not it is approved.

# Adopting or building a central 'work/case management' system
The majority of the information that is handled by the approvals team relates to internal work activity.  Examples are: assisting in managing the case-load of an FVL, and ensuring that FBO interactions happen within their allocated time.

The majority of the fields on the approvals spreadsheet are related to dates that events, e.g. an FVL visit, are due to happen.  Similarly, two time consuming reports, the HOD and FVL reports are primarily based around the numbers of application related work items being performed, and determining whether they are being performed on time.

Any case management system that is capable of the following would negate the need to manually track this data and build these reports.
* Tracking the time at which events happen
* Allocating a unit of work to an FSA worker
* Setting due dates for a piece of work
* Tracking when the work was completed
* Retrieving upcoming work for an individual
* Reporting on the differences between assigned work dates and completed work dates

Whether this is a bespoke application or an off the shelf system is an organisational decision.  A bespoke application allows starting from the perspective of "What do we want the system to do", and comes with increased development complexity and up-front cost, with the benefits of fitting the FSA requirements more closely.  An off the shelf system requires starting from the perspective of "Will this system do what we need it to, and can we modify it, or adapt to it where it does not".

However, the internal work processes of the approvals team, and the form of reporting are not atypical of any case management use, so it is likely that a suitable off-the-shelf tool would fit well.  This comes with the caveat of the core FSA data being able to be stored separately, and linked to that system efficiently.  Trying to adapt an off-the-shelf system to store complex Food Operator specific information could be more costly than the equivalent bespoke application.

# Improving the flow of data from the core data to open formats
An additional significant source of work is copying data from the central system of record (E&P, via SSRS reports) into open publication systems.  There is already a semi-digital solution here, with systems such as APMS handling part of the conversion.  It is questionable whether this should require any manual input from the approvals team at all, and could instead be built from the system of record directly.  If the data available in this system is exposed via an API, this reduces the complexity of this task.  

Systems like APMS are simply providing a new form for the approvals team to fill in, relying on human judgement to convert between different data structures, such as the different hierarchy between FSA activities and the EU mandated hierarchy to be displayed in the open data formats.  They are also required due to the need to merge FSA approved establishments with **Local Authority** approved establishments, which are given to the team in an unstructured format over email.

APMS entry is a time consuming task, and involves:
* Re-entering an address
* Mapping the approved activities from the FSA structure to the APMS data structure.

Both of these tasks could be automated by pulling this data from the central system of record, and mapping it where necessary.  The approvals team are also responsible for keying in data from local authorities, which are recieved by email.  An examination of why this is necessary, or why the local authorities cannot enter this data themselves has not be conducted, but would further reduce manual data entry by the approvals team.

The mapping between APMS and open publication (Octopub), involves manually exporting and uploading CSVs.  There does not appear to be any human intervention needed here, these systems have just not currently been designed to talk to each other.