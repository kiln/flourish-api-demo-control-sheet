# Flourish control sheet demo

Using a control sheet means to configure Flourish charts via a csv sheet allowing the user to quickly build out many charts with the Flourish Live API. It's a concept not a recipe and there are many ways of implementing a control sheet, depending on the requiremenets, this demo covers a generic implementation.

Each control sheet requires the following column names and allows the respective values:

**Column name**: Allowed value

- **base_chart**: flourish chart ID
- **container**: css ID for chart
- **bindings**:
- **settings**:
- **data**: data url for data. Taken from base chart if empty. If not empty, needs to be in the format: `<flourish dataset name>: <data url>`. Multiple datasets can be separated with a comma. For example: `data: data.csv, regions: my_regions.csv, lines: Lines.csv`. All datasets must be in csv format. Field is either empty or covers all required datasets.
