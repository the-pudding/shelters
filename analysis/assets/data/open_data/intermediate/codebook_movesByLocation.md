
## movesByLocation.csv & movesByLocation.R

* `movesByLocation.R`: The script used to process a file of adoptable dogs (`allDogDescriptions.csv`) and their origin and destination locations (`dogTravel.csv`) to find the total numbers of imports and exports for each location. This dataset was derived from `allDogDescriptions.csv` and `dogTravel.csv`, so refer to those file's Source field for more information on how this data was collected.

* `movesByLocation.csv`: The data, as described below.

  - **What is this?**: A file depicting the number of animals imported and exported from each location for adoption.
  - **Source(s) & Methods**: This dataset was derived from `allDogDescriptions.csv` and `dogTravel.csv`, so refer to those file's Source field for more information on how this data was collected.
  - **Last Modified**: September 29, 2019
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Contact Information**: [Amber Thomas](mailto:amber@pudding.cool)
  - **Spatial Applicability**: All data was collected for querying the API for adoptable dogs in each of the US states and the District of Columbia.
  - **Temporal Applicability**: This data represents *a single day* of data.  It was all collected on September 20, 2019.
  - **Observations (Rows)**: There are 90 rows in this dataset. Each row represents a specific US state or country.
  - **Variables (Columns)**: There are 5 columns in this dataset. They
    are described below:

| Header   | Description                           | Data Type |
| :------- | :------------------------------------ | :-------- |
| location | The full name of the US state or country | character |
| exported | The number of adoptable dogs available in the US that originated in this location but were available for adoption in another location | integer   |
| imported | The number of adoptable dogs available in this state that originated in a different location | integer   |
| total    | The total number of adoptable dogs availabe in a given state. | integer   |
| inUS     | Whether or not a location is in the US or not. Here, US territories will return `FALSE` | character |
