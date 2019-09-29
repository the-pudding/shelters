
## dogTravel.csv & dogTravel.R

* `dogTravel.R`: The script used to process a file of adoptable dogs (`allDogDescriptions.csv`) to find if they originated in a different location than where they are listed as available. This dataset was derived from `allDogDescriptions.csv`, so refer to that file's Source field for more information on how this data was collected. 

* dogTravel.csv: The data, as described below

  - **What is this?**: Unlike `allDogDescriptions`, this file only includes information on dogs whose `description` indicates that they did not originate in the state where they were made available for adoption. This file aims to show where those dogs are available and where they came from.
  - **Source(s) & Methods**: All dog data was obtained in the same manor as `allDogDescriptions`. Regex was used to identify any phrases after the words `from` or `located in` until either the word `to` or the end of the sentence. The R package `spacyR` was then used to identify any entities in the extracted phrases. The data was manually reviewed and cleaned to remove any original locations that contained only a vague location (e.g., `the south`, `the Carolinas`) in favor of those explicitly described.
  - **Last Modified**: September 29, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: All data was collected for querying the API for adoptable dogs in each of the US states and the District of Columbia.
  - **Temporal Applicability**: This data represents *a single day* of data.  It was all collected on September 20, 2019.
  - **Observations (Rows)**: There are 2,460 rows in this dataset.
    Each row represents a single dog that was available for adoption somewhere in the US. Each of these dogs is described as having been moved from another location to their current location.
  - **Variables (Columns)**: There are 8 columns in this dataset. They
    are described below:

| Header         | Description                           | Data Type |
| :------------- | :------------------------------------ | :-------- |
| id             | The unique PetFinder identification number for each animal | numeric   |
| description    | The full description of each animal as entered by the rescue/shelter | character |
| shelterLoc     | The state where the shelter/rescue is located and thus where the animal is available for adoption | character |
| origin         | The state or country where the animal has been described as originating from | character |
| still\_there   | Whether the animal is still located in their origin location and will be transported to their final destination **after** adoption. | logical   |

  - *Other Notes*: We assume that this is an underestimate since not all shelters or rescues will include this information in an animal’s PetFinder description. Any animals that were described as transported by their previous owners instead of by the rescue or shelter were also removed from our data. Some dogs were listed as being from several places. For example, one was described as “rescued from the euthanasia list at a tiny Alabama shelter and brought to a rescue in Georgia”, but the dog was listed as available for adoption in Massachussetts. In this case, the earliest location is the one reported. In 238 (9.7% of) cases, the dogs were shown as available for adoption in one state, but they still resided in another. For instance, a dog that was available for adoption in Washington had the disclaimer “Dogs will be transported from Texas upon approved match.” We still considered these to be “imports” since they are listed as available for adoption upon searching PetFinder for dogs in that state.
