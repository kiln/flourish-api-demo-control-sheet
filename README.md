# Flourish control sheet demo

Using a control sheet allows the user to configure Flourish charts via a spreadsheet to quickly build out many charts with the Flourish Live API.

The key benefit of using the Live API is that charts can be build programmatically, giving the user more control over where the data comes from and allowing to build out many charts without having to manually create them in the Flourish editor. The additional benefit the control sheet offers is that - once set up - chart build and chart changes can be controlled from a simple spreadhseet rather than by writing or changing code.

It does so by giving the user access to the information the Live API requires like the **template** to use and its **version**, the **data**, the **bindings** as well as the **chart settings**. With a control sheet, the user can compose and control this information in a spreadsheet which gets pulled into the Javascript code building the chart(s) accordingly.

The control sheet is a flexible concept not a solid recipe and there are many ways of implementing a control sheet, depending on the requiremenets. This demo covers a generic implementation focussed on allowing any chart to be build and changed.

## The code

The code in this demo reads in the control-sheet and builds out each chart. It does so by going through each row of the control sheet, first pulling in the base chart information it secondly merges with the optional user given settings, bindings and datasets.

These composed options are then passed to the Live API chart-build function, producing the chart before adding it to the given HTML element specified by the CSS selector.

## The control sheet

Each row in the control sheet represents a chart to be build. Each column represents the information required to build that chart. In its simplest form, the following five columns are required:

### `base_chart`

A Flourish chart ID of a published Flourish chart. The base chart's information is pulled in to set the chart's template, version, base settings, bindings and data. The latter three options can be changed in the respective control sheet columns.

### `container`

The CSS selector of the element in the HTML page the chart is added to.

### `bindings`

Bindings to map data columns to visual marks. These are taken from the base chart's bindings if empty. If not empty, these need to be a [JSON object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) holding the bindings to change for each dataset of the visualisation. Here's an example:

```
{ "dataset1": {"value": ["Column 1, "Column 2"], "label": "Column 3"}, "dataset2": { "x": "Column 1", "y":"Column 2" } }
```

You can get all available bindings from a particular template by finding its API documentation - here's an example of the Line, bar, pie template:

https://app.flourish.studio/@flourish/line-bar-pie/

To see the bindings available on this page, scroll down and hit the _**Show template API documentation**_ button.

### `settings`

Chart settings to be added. If empty the chart settings are taken from the base chart. If not empty, these need to be a [JSON object](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) holding the settings to change. Here's a simple example just adding or amending the title of the visualisation:

```
{ "layout": { "title": "Hi" }}
```

You can get all available settings from a particular template by finding its API documentation - here's an example of the Line, bar, pie template:

https://app.flourish.studio/@flourish/line-bar-pie/20#Chart%20type

### `data`

The data URL for the dataset to use. If the field is empty, the data is taken from the base chart. If it's not empty, it needs to be in JSON format listing each datasheet and the data URL to pull from. Example:

```
{ "choropleth": "local-folder/data.csv", "points": "https://my.data-url.csv" }
```

The property key denotes the Flourish datasheet you would like to read in data for. The data URL to pull the data from goes in the property value. Above example pulls in data for two of the [Projection map template](https://app.flourish.studio/@flourish/projection-map)'s datasheets.

Note, that for this demo all external data needs to be in csv format.

### Notes and tips

#### JSON Format

Settings, bindings and data input requires JSON objects, but you can remove the outmost curly braces if you wish: so both of the following options are valid:

```
{ "layout": { "title": "Hello" }}
"layout": { "title": "Hello" }
```

#### Available columns

Note, that in order to use a column of your datasheets in the control sheet, it needs to be column bound in the bindings.

If, for example, a base chart datasheet has data columns `Pizzas` and `Salads` but only `Pizzas` is bound to the visual (assigned to a binding in the base chart's datasheet), you can only use column `Pizzas` in your control sheet.

To use other or all columns in a dataset, add them into the **Info for custom popups** binding, which will pull these data columns in and make them available to use elsewhere.
