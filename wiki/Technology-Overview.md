The process for an FBO application and approval relies heavily on manual activities, data entry into electronic systems, spreadsheets and emails.  The following pages:

* Examines the current data operations that are performed
* Discusses possible technical approaches - [Link](https://github.com/notbinary/fsa-approvals/wiki/High-Level-Technology-Approaches)
* Proposes a [demonstration API](https://notbinary.github.io/fsa-approvals/) to discuss the form of data that _should_ be captured - [Link](https://github.com/notbinary/fsa-approvals/wiki/Data-and-API)
* Applies the API to existing log entries, and discusses what data changes are needed - [Link](https://github.com/notbinary/fsa-approvals/wiki/Uses-of-the-API)
* Discusses application statuses from the perspective of automation & data - [Link](https://github.com/notbinary/fsa-approvals/wiki/Technology---Workflow-&-Statuses)
* Provides technical recommendations for further consideration - [Link](https://github.com/notbinary/fsa-approvals/wiki/Future-Technology-Recommendations)

# FBO Application (Paper/Email)
The initial stream of information for an approval by an FBO is via an application, which is a paper form, submitted either via post or email.  Either way, any following digitisation of this information (into related systems or spreadsheets) is done manually by the approvals team.

Limitations of this data stream are that it requires manual input to get the data into multiple places, and due to being a scanned paper document or an email, the data contained in it cannot be easily surfaced.

# Approvals Log (Excel Spreadsheet)
This is the central data store for the approvals team.  It serves as both the central data store for applications and approvals, and also as the 'state management' or 'workflow' component for the approvals team, such as tracking what the next activity for an FBO is, and whose responsibility it is to do that unit of work.

Limitations of this data store are that it is unwieldy, due to using an excel spreadsheet as a combined auditing tool, workflow tracking system and task management system.  It is made up of unvalidated free text entries, and there are columns that mix discrete data (such as true/false, yes/no, good/bad) values with free text values.  It is therefore difficult to aggregate and report on.

# E&P - Establishment and People (SQL Server)
This is a small part of the larger central data system, the 'Single Information Repository' database.  It holds information about an FBO who is currently operating, what activities are performed and at which sites, what the status they are operating under is, and locations of their sites and contact/legal addresses such as billing addresses.

![E&P Overview](https://user-images.githubusercontent.com/4345596/89121507-6cf01b00-d4b7-11ea-8efa-3e61d2077b61.jpg)
_Fig 1: An overview of the rough structure of E&P as has been determined to date_ [Expand image](https://user-images.githubusercontent.com/4345596/89121507-6cf01b00-d4b7-11ea-8efa-3e61d2077b61.jpg)

Limitations of this data store are that input to it is from an inflexible interface, another set of forms for the approvals team to enter data into.  Data export is either from that interface, or from SSRS reports against the database.  In its current form, it could not be easily used as a record store to link data against from other systems.

# Reports
Information about this approvals data is collected from the above sources (from the approvals log and from various on-site SSRS reports) and published as open data according to regulations, or sent to managers to provide an overview of this process.

There are two reports built manually from the approvals log data.
* The HOD Report manually aggregates the approvals data for each FVL, determining how many missed deadlines each has had.
* The fortnightly FVL report is sent to each of the three FVLs assigned to each approvals team member, to prompt them on nearing deadlines, and to provide their deadlines for the next time period.

Limitations of these reports are that they are costly in effort to build, due to requiring manual assembly.

In addition to the above, an approval involves interactions with many teams or specialists via email.  For example, financial background checks take place when an FBO applies for approval, which are co-ordinated through emails sent between the finance team and the approvals team.

Finally, data is published to [data.gov.uk](https://data.gov.uk/), and to [data.food.gov.uk](https://data.food.gov.uk/catalog) to comply with open data standards.  FSA data is merged with Local Authority approved establishments and inserted into APMS (A K2 system).  The local authority data is recieved via email, and is provided in an unstructured format that is hard to automate.

The current approach for publishing the open data via Octopub is described as 'flaky', frequently not working, or having an inability to function if lots of FSA data uploads are happening at the same time.

# Files

This application form comes with several files that are stored in Wisdom.
* A layout plan
* A location map
* Food safety management system
* Proposed arrangements for cleaning
* Details of the ABP collector
* A description of the water supply quality testing arrangements
* A description of the pest control arrangements
* For slaughterhouses, a copy of the welfare SOP's and CCTV camera locations

Additionally, further paper data is generated and stored in Wisdom, such as the FVL report.

Limitations of this data store is around the difficulties of file versioning.  It is also another system that must be maintained, rather than the files being available from one place to build a view of an FBO.

# Summary
The core issues with the data stores and processes above are that:
* The stores cannot be easily connected, e.g. automating data entry between a spreadsheet and E&P is not easy
* The data cannot be linked easily, e.g. scanned documents and entries into databases/spreadsheets rely on linking and retrieving based on manual organisation
* The data moves between unstructured/semi-structured formats, or incompatible formats frequently, requiring human data entry. 
* State management of an approvals log entry is being performed by a human
* Aggregation of information in the approvals log is done manually
* It is hard to build a picture of the entire lifecycle of one entry in the approvals log from an auditing perspective

Critically, all of the manual processes, data entry and interaction with flaky systems are **not** one off tasks, but must be re-done every time any relevant data changes for an FBO.  E.g. An FBO adding a new approved activity would involve updating:
* The approvals log,
* Wisdom (If there were scanned documents involved)
* E&P
* APMS
* Octopub
* Data.Gov.UK

The following pages will examine what data needs to be stored and read from the perspective of the approvals team with a view to reducing the duplication of data, and manual effort to maintain a view of an FBOs approval journey.  Various technical options and considerations are presented to improve this system.