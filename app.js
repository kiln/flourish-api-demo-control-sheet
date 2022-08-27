// Maybe required.
function convertToArrayOfObjects(array) {
  const cols = array.shift();

  const result = array.map((el) => {
    const obj = {};
    cols.forEach((col, i) => (obj[col] = el[i]));
    return obj;
  });

  result.columns = cols;
  return result;
}

const API_KEY = 'CwU3_QkITsW9u9ChjJRp0sYHNFVDf7RLXamwrYePJx9HZTka_4gHqZfWDRVRNizG';

// Helpers.
function parseJSON(string) {
  const unescaped_string = _.unescape(string);
  if (string[0] === "{") return JSON.parse(unescaped_string);
  return JSON.parse(`{${unescaped_string}}`);
}

// Set base data.
function setBaseData(row, base_chart_json) {
  return  {
    template: base_chart_json.template,
    version: base_chart_json.version,
    container: row.container,
    api_key: API_KEY,
  }
}

// Get data.
function convertToArrayOfArrays(array) {
  const keys = Object.keys(array[0]);
  const arrayOfArrays = array.map(Object.values);
  arrayOfArrays.unshift(keys);
  return arrayOfArrays;
}

function convertData(data) {
  for (const dataset of Object.keys(data)) {
    // Very defensive. Should never happen as all
    // d3.csv datasets get read as arrays of objects.
    if (Array.isArray(data[dataset][0])) break;
    data[dataset] = convertToArrayOfArrays(data[dataset]);
  }
  return data;
}

async function fetchData(string) {
  const data = parseJSON(string);

  for (const dataset of Object.keys(data)) {
    data[dataset] = await d3.csv(data[dataset]);
  }

  return data;
}

async function setChartData(final_data, row, row_index, base_chart_json) {
  if (!row.data) return base_chart_json.data;

  // Check for previously fetched datasets and use them instead of re-fetching.
  const data_matches = final_data.filter(
    (d, i) => i < row_index && d.data_url === row.data
  );

  if (data_matches.length > 0) return data_matches[0].data;

  // Otherwise, get the datasets (yet make sure they're API ready array of arrays).
  const datasets_raw = await fetchData(row.data);
  return convertData(datasets_raw);
}

// Get bindings.
function convertToIndex(binding_value, data_columns) {
  const binding_index = data_columns.indexOf(binding_value);
  if (binding_index < 0)
    throw Error(
      `The binding value "${binding_value}" is not a data column name. Possible values are: "${data_columns.join(
        ", "
      )}"`
    );
  return data_columns.indexOf(binding_value);
}

function parseBindings(string, columns) {
  let bindings = {};
  const parsed = parseJSON(string);

  // Loop through datasets
  for (const dataset_name of Object.keys(parsed)) {
    if (!Object.keys(columns).includes(dataset_name)) {
      console.warn(
        `Ignoring all bindings from the "${dataset_name}" dataset. Allowed datasets are "${Object.keys(
          columns
        ).join('" or "')}"`
      );
      break;
    }

    bindings[dataset_name] = parsed[dataset_name];

    // Loop through bindings.
    for (const binding of Object.keys(bindings[dataset_name])) {
      if (!parsed[dataset_name].hasOwnProperty(binding)) {
        throw Error(
          `Binding to the column name "${binding}" not possible. Available column names to bind to are "${Object.keys(
            parsed[dataset_name]
          ).join('" or "')}"`
        );
      }

      // Convert bindings value name to index.
      let bindings_value;
      if (Array.isArray(bindings[dataset_name][binding])) {
        bindings_value = bindings[dataset_name][binding].map((value) =>
          convertToIndex(value, columns[dataset_name])
        );
      } else {
        bindings_value = convertToIndex(
          bindings[dataset_name][binding],
          columns[dataset_name]
        );
      }

      // Compose final bindings object.
      const bindings_object = { [binding]: bindings_value };
      bindings[dataset_name] = {
        ...bindings[dataset_name],
        ...bindings_object,
      };
    }
  }

  return bindings;
}

function getDataColumns(data) {
  // Assuming the first row of each data are the data column names.
  const datasets = _.cloneDeep(data);
  for (const dataset of Object.keys(datasets)) {
    datasets[dataset] = datasets[dataset][0];
  }
  return datasets;
}

function setChartBindings(final_data, row, row_index, base_chart_json) {
  if (!row.bindings) return base_chart_json.bindings;

  const data_column_names = getDataColumns(final_data[row_index].data);
  return parseBindings(row.bindings, data_column_names);
}

// Set settings.
function setChartSettings(row, base_chart_json) {
  if (!row.settings) return base_chart_json.state;

  return {
    ...base_chart_json.state,
    ...parseJSON(row.settings),
  };
}

// Get options.
function initFinalData(control_data) {
  return control_data.map((d) => ({
    base_chart: d.base_chart,
    container: d.container,
    data_url: d.data,
    data: undefined,
  }));
}

async function setChartOptions(control_data, base_chart_map) {
  const final_data = initFinalData(control_data);

  // Loop through control data and assemble data-sources, bindings and settings.
  for (let i = 0; i < control_data.length; i++) {
    const row = control_data[i];
    const base_chart_data = base_chart_map.get(row.base_chart);

    final_data[i].base = setBaseData(row, base_chart_data);
    final_data[i].data = await setChartData(final_data, row, i, base_chart_data);
    final_data[i].bindings = setChartBindings(final_data, row, i, base_chart_data);
    final_data[i].settings = setChartSettings(row, base_chart_data);
  }

  return final_data;
}

// Build charts.
function setAPIOptions(data) {
  return {
    template: data.base.template,
    version: data.base.version,
    api_key: data.base.api_key,
    container: data.base.container,
    state: data.settings,
    bindings: data.bindings,
    data: data.data,
    private: false,
  };
}

function buildAPICharts(charts) {
  for (let i = 0; i < charts.length; i++) {
    const chart_data = charts[i];
    const options = setAPIOptions(chart_data);
    console.log(options);
    // CONTINUE to build charts
  }
}

// Main.
async function sendVisJsonRequest(vis_id) {
  const endpoint = `https://public.flourish.studio/visualisation/${vis_id}/visualisation.json`;
  const result = await d3.json(endpoint);
  return result;
}

async function getBaseChartMap(control_data) {
  // get a map for each unique base chart ID.
  const base_chart_map = new Map(
    control_data.map((d) => [d.base_chart, undefined])
  );

  for (const id of base_chart_map.keys()) {
    const base_chart_info = await sendVisJsonRequest(id);
    base_chart_map.set(id, base_chart_info);
  }

  return base_chart_map;
}

async function main(control_data) {
  const base_chart_map = await getBaseChartMap(control_data);
  const chart_options = await setChartOptions(control_data, base_chart_map);
  buildAPICharts(chart_options);

  // console.log("final options", chart_options);
}

d3.csv("control-sheet.csv").then(main);
