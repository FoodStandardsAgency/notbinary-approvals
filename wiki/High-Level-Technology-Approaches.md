Roughly speaking, any solution will fall into some combination of three categories:
1. Bespoke software solutions
2. No-code solutions, e.g. using K2 or PowerApps
3. Off the shelf (OTS) products

It would not be required to have one category for the entire technical solution, as it is possible to mix the three categories together depending on their suitability for each area.  For example, a bespoke application could be built for FBOs to submit applications, which could interact with a No-Code/OTS back end.

There are some general pros and cons for each category, regardless of their exact implementation.

### Bespoke software solutions
This approach involves developing a software product from scratch, typically using some form of software 'framework' that fits the problem.

Pros:
+ Tailored to the exact problem being solved, and the exact data structures
+ Potential for a more streamlined experience
+ Better able to adapt to non-ideal requirements, e.g. supporting legacy applications or data stores
+ Better able to handle changing requirements over time, e.g. data changes

Cons:
- Requires development of an organisational technical strategy, e.g. cloud, framework, languages, database technologies
- Requires work to maintain solution, e.g. devops, on call developers
- Expensive to develop
- Expertise needed in specifying, managing and running software projects, hiring software developers

Suitability:
+ Where there is a problem an existing product does not solve
+ Where there is an appetite to take on software infrastructure, which is significantly more complex than IT infrastructure
+ Where the solution should be closely tailored to the problem

### No code solutions
This solution involves products that allow building a semi-bespoke solution, using a workflow oriented platform.  These approaches usually involve visual 'flow diagram' based builders, and 'connectors' to interact with existing systems.

Pros:
+ Can be developed without significant technical expertise
+ Faster initial development
+ Visual 'Drag and Drop' builder means non-technical product owners can develop solution themselves, reducing technical translation effort
+ Platform concerns around maintenance and reliability are the responsibility of the product.

Cons:
- Specifying precise business logic is usually the key area of complexity in a large software project, not the act of writing code itself
- Tools and practices around software, e.g. data migrations, testing & error handling are not commonly featured
- Vendor lock in for the data and/or logic, resulting in potential expense when asking the vendor for assistance, or hiring specialists.
- Visual Logic Editors are not as well suited as code for modelling highly complex logic, and will become more complex than the equivalent codebase

Suitability:
+ Where the problem is low complexity and/or well understood, involving simple processes and workflows
+ Where any complex or non-suitable part of the problem can be solved by connecting a different product
+ For prototyping by non-technical users
+ For low-throughput applications where performance is not a concern
+ Where the risks of vendor lock in are well understood, and not a concern

### Off the shelf products

Pros:
+ Low/no technical expertise needed
+ No development time
+ Maintenance and platform concerns typically handled by the product
+ Can often be extended to perform bespoke tasks
+ Usually 'battle-tested'

Cons:
- Vendor lock in
- Can sometimes be modelled in too generic a manner, causing issues with fitting a business specific processes
- Can be expensive or impossible to extend, even trivially

Suitability:
- Where the problem being solved closely fits an existing product
- Where there is not an appetite for developing a bespoke solution
- Where the product would integrate well into the company IT strategy
- Where the product and vendor is trusted to provide support for the product
- Where the product is trusted to be higher value for money than the bespoke approach
- Where any custom functionality needed is relatively low, and can be added to the product if needed

***

### Combining Solutions

The solutions above can be applied in combination to where they best fit.

![Example Architecture](https://user-images.githubusercontent.com/4345596/87462939-9af4e480-c608-11ea-856f-a03ec83a80b3.png)
For example, case management is often very similar from business to business, involving tracking data and documents against a business or entity.  This functionality involves significant development effort, and is of little value to re-develop.  Taking Microsoft Dynamics as a suitable example of such a tool, the questions to ask are:

* Can this tool store the data we need to store?
* Which of our processes are not available out of the box?
* Can the processes be built in external systems and fed into the tool in question?

For example, in Microsoft Dynamics (just one example of a CRM/Case Management System) the following entities are available with REST APIs
* [Account](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/account?view=dynamics-ce-odata-9) - An entity representing a business
* [Contact](https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/contact?view=dynamics-ce-odata-9) - An entity representing a person

Since both of these entities have a uniquely identifiable value, information or processes that are not possible to store in Dynamics could be handled in bespoke systems referencing those IDs.  However, Dynamics and other CRMs are usually aimed at a more typical sales-driven business, so the amount of extra functionality could involve significant development effort.  For example, a central set of data for an FBO is the collection of food-related activities that they are approved to perform, which would need to be added to the existing software entity for a business.

In contrast, systems that handle data capture and storage are better modelled as bespoke systems as there is maximum control over how the data is validated, stored and presented.  For example, an FBO application could end in a bespoke web application storing the data in a related database.  It could expose the application data via a REST API to allow any interested system to retrieve it.

No-code systems could then be used to connect these systems together, for example - after saving a finalized FBO application, the bespoke web app could call out to start a workflow in a no code system.  This no-code system would then benefit from the ability to model the resulting automated process in a way that can be refined cheaply.  The final output of these combined systems could result in the creation or updating of a record in an off the shelf case management system.  This is just one way that all three systems could be combined to make use of their respective strengths.