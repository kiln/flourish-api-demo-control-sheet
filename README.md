# Flourish control sheet demo

Using a control sheet means to configure Flourish charts via a csv sheet allowing the user to quickly build out many charts with the Flourish Live API. It's a concept not a recipe and there are many ways of implementing a control sheet, depending on the requiremenets, this demo covers a generic implementation.

Each control sheet requires the following column names and allows the respective values:

**Column name**: Allowed value

- **base_chart**: flourish chart ID
- **container**: css ID for chart
- **bindings**: bindings to map data columns to visual marks. Taken from base chart if empty. If not empty, needs to be a JSON object holding the bindings for each dataset of the visualisation.

  ```
  { "dataset1": {"value": ["Column 1, "Column 2"], "label": "Column 3"}, "dataset2": { "x": "Column 1", "y":"Column 2" } }
  ```

- **settings**:
- **data**: data url for data. Taken from base chart if empty. If not empty, needs to be in JSON format listing each dataset and the data URL to pull from. Example:

  ```
  { "data": "local-data/data.csv", "regions": "https://my.data-url.csv" }
  ```
