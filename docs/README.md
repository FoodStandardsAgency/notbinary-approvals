# FSA API Sketch
## Version: 1.0

### /applications

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### Models

#### ArrayOfApplications

A collection of applications

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| ArrayOfApplications | array | A collection of applications |  |

#### Application

Represents an application that has been made to the FSA to create an establishment
Holds the lifecycle information about the application, and a reference to the eventually
created establishment if the application is successful

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string | A unique identifier for an application entry in the approvals log | Yes |
| status | string | _Enum:_ `"PreApproval"`, `"Approved"` | No |
| establishment | object | A central unit of enrolment within food and feed related legislation See description in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/establishment.html)  | No |

#### Establishment

A central unit of enrolment within food and feed related legislation
See description in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/establishment.html)

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string | A unique identifier for an establishment as described in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/establishment.html#unique-identifiers) | Yes |
| premises | object |  | Yes |
| operator | object | Operator is the person or legal entity responsible for running a food business.  When considered in tandem with premises, the combined entity is an establishment. See description in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/operator.html)  | Yes |

#### Premise

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| uprn | string | Serves as the identifier of this individual premise, described further at the [open id policy](https://www.ordnancesurvey.co.uk/business-government/tools-support/open-mastermap-programme/open-id-policy) page  | Yes |
| address | object | See the [key properties](https://foodstandardsagency.github.io/enterprise-data-models/entities/premises.html#key-properties) | Yes |

#### Operator

Operator is the person or legal entity responsible for running a food business.
When considered in tandem with premises, the combined entity is an establishment.
See description in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/operator.html)

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| Operator | object | Operator is the person or legal entity responsible for running a food business.  When considered in tandem with premises, the combined entity is an establishment. See description in the [FSA Data Standards](https://foodstandardsagency.github.io/enterprise-data-models/entities/operator.html)  |  |
