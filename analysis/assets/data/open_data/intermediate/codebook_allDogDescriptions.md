
## allDogDescriptions.csv & allDogDescriptions.R

* `allDogDescriptions.R`: The script used to access the PetFinder API and collect data for all of the adoptable dogs in the US on a single day.

* allDogDescriptions.csv: The data, as described below

  - **What is this?**: Data collected from the [PetFinder API](https://www.petfinder.com/developers/) for all adoptable dogs in each state on September 20, 2019.
  - **Source(s) & Methods**: All data except for `description` was collected using PetFinder's V2 API method `get-animals` as described in their [documentation](https://www.petfinder.com/developers/v2/docs/#get-animals). Since the V2 API doesn't return the full animal description, I was encouraged by the API maintainers to query the same animal profiles using the V1 API to acquire that information. Thus, I used all of the shelter ID's returned from the V2 API calls to find all descriptions of dogs in each shelter and combine the two results by the animal's unique ID.
  - **Last Modified**: September 29, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: All data was collected for querying the API for adoptable dogs in each of the US states and the District of Columbia.
  - **Temporal Applicability**: This data represents *a single day* of data.  It was all collected on September 20, 2019.
  - **Observations (Rows)**: There are 58,180 rows in this dataset.
    Each row represents an individual adoptable dog in the US on September 20, 2019. Each dog has a unique ID number. Unless otherwise noted, all of the data is exactly is reported by the shelter or rescue that posted an individual animal for adoption on PetFinder.
  - **Variables (Columns)**: There are 36 columns in this dataset. They
    are described below:

| Header           | Description                           | Data Type |
| :--------------- | :------------------------------------ | :-------- |
| id               | The unique PetFinder identification number for each animal | integer   |
| org\_id          | The unique identification number for each shelter or rescue | character |
| url              | The URL for each animal's listing | character |
| species          | Species of animal | character |
| breed\_primary   | The primary (assumed) breed assigned by the shelter or rescue | character |
| breed\_secondary | The secondary (assumed) breed assigned by the shelter or rescue | character |
| breed\_mixed     | Whether or not an animal is presumed to be mixed breed | logical   |
| breed\_unknown   | Whether or not the animal's breed is completely unknown | logical   |
| color\_primary   | The most prevalent color of an animal | character |
| color\_secondary | The second most prevalent color of an animal | character |
| color\_tertiary  | The third most prevalent color of an animal | character |
| age              | The assumed age class of an animal (`Baby`, `Young`, `Adult`, or `Senior`) | character |
| sex              | The sex of an animal (`Female`, `Male`, or `Unknown`) | character |
| size             | The general size class of an animal (`Small`, `Medium`, `Large`, `Extra Large`) | character |
| coat             | Coat Length for each animal (`Curly`, `Hairless`, `Long`, `Medium`, `Short`, `Wire`) | character |
| fixed            | Whether or not an animal has been spayed/neutered | logical   |
| house\_trained   | Whether or not an animal is trained to not go to the bathroom in the house | logical   |
| declawed         | Whether or not the animal has had its dewclaws removed | logical   |
| special\_needs   | Whether or not the animal is considered to have special needs (this can be a long-term medical condition or particular temperament that requires extra care) | logical   |
| shots\_current   | Whether or not the animal is up to date on all of their vaccines and other shots | logical   |
| env\_children    | Whether or not the animal is recommended for a home with children | logical   |
| env\_dogs        | Whether or not the animal is recommended for a home with other dogs | logical   |
| env\_cats        | Whether or not the animal is recommended for a home with cats | logical   |
| name             | The animal's name (as given by the shelter/rescue) | character |
| tags             | Any tags given to the dog by the shelter rescue (pipe `|` separated) | character |
| photo            | The URL to the animal's primary photo | character |
| status           | Whether the animal is `adoptable` or not | character |
| posted           | The date that this animal was first listed on PetFinder | character |
| contact\_city    | The rescue/shelter's listed city | character |
| contact\_state   | The rescue/shelter's listed state | character |
| contact\_zip     | The rescue/shelter's listed zip code | character |
| contact\_country | The rescue/shelter's listed country | character |
| stateQ           | The state abbreviation queried in the API to return this result | character |
| accessed         | The date that this data was acquired from the PetFinder API | character |
| type             | The type of animal | character |
| description      | The full description of an animal, as entered by the rescue or shelter. This is the only field returned by the V1 API | character |

  - *Other Notes*: Due to a bug in the PetFinder API, dogs in the state of Nevada had to be accessed by searching for individual zip codes instead of the state abbreviation (as suggested to me by the API maintainers).
