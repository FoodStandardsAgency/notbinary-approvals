# Approvals form prototype
__Work in progress__
This folder contains the digitised version of the "Application for Approval of Meat Establishment" form. It has been built with the [GDS prototyping toolkit](https://govuk-prototype-kit.herokuapp.com/docs).

**To run**
In order to use this prototype you will need [Node](https://nodejs.org/en/). You will first need to download and install it if you do not already have it.

(See the [Gov.UK installation guide](https://govuk-prototype-kit.herokuapp.com/docs/install/introduction) for full instructions on installing and running)

## Brief instructions
1. Launch the Command Prompt (Windows) or Terminal (Mac/Linux) navigate to this folder.
2. In the Command Prompt or Terminal type:
`node start`
3. Navigate to [localhost:3000/start](localhost:3000/start) using your web browser once you have the application running.


## Page navigation
1. start
2. business-name
3. establishment-address
4. telephone-number
5. email
6. establishment-activities throughput - Nested, conditional checkboxes. All establishment types on one page.
7. handling-animal-origin - Reword question
8. business-structure-type
9. company-name
*The following are additional information documents on the paper form. Some of them potentially could be (and where possible should be) converted to data capture in this form.*
10. layout-plan
11. location-map
12. food-safety-management
13. cleaning-maintenance
14. abp-collector
15. water-supply-quality - This should be split into arrangements and LA water test result.
16. pest-control
17. sops-cctv
18. check-your-answers

## Updated page navigation
1. index
2. start
3. application-type
4. branch - application-type-answer
   1. change-of-fbo
   2. (new approval goes straight to business type)
   3. new-fsa-approval
5. business-name
6. business-structure-type
7. branch - business-type-answer
   1. incorporation > business-structure-incorporation --> Goes to:
      1. business-company-information
   2. partnership/sole-trader/other --> Goes to:
8. business-structure-operator-name
9. business-structure-operator-address
10. operating-start-date
11. telephone-number
12. email
13. type-of-establishment
14. activities-throughput
15. handling-animal-origin
16. layout-plan
17. location-map
18. food-safety-management
19. cleaning-maintenance
20. abp-collector
21. water-supply-quality - This should be split into arrangements and LA water test result.
22. pest-control
23. sops-cctv
24. advisory-visit
25. check-your-answers

<!-- ddd -->
<div class="govuk-summary-list__row">
   <dt class="govuk-summary-list__key">
   name
   </dt>
   <dd class="govuk-summary-list__value">
   {{data['dataLink']}}
   </dd>
   <dd class="govuk-summary-list__actions">
   <a href="/business-name">
      Change
      <span class="govuk-visually-hidden"> name</span>
   </a>
   </dd>
</div>