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

// Get data.
function convertToArrayOfArrays(array) {
  const keys = Object.keys(array[0]);
  const arrayOfArrays = array.map(Object.values);
  arrayOfArrays.unshift(keys);
  return arrayOfArrays;
}

async function parseFetchDataURL(string) {
  const trimmed = string.replace(/\s+/g, "");
  const split = trimmed.split(",");
  const datasets = {};

  for (let i = 0; i < split.length; i++) {
    const dataset = split[i];
    const sectioned = dataset.split(":");
    datasets[sectioned[0]] = await d3.csv(sectioned[1]);
  }

  return datasets;
}

async function setChartData(final_data, row, row_index, base_chart_json) {
  if (!row.data) {
    final_data[row_index].data = base_chart_json.data;
    return;
  }

  // Check for previously fetched datasets and use them instead of re-fetching.
  const data_matches = final_data.filter(
    (d, i) => i < row_index && d.data_url === row.data
  );

  if (data_matches.length > 0) {
    final_data[row_index].data = data_matches[0].data;
    return;
  }

  // Otherwise, get the datasets (yet make sure they're API ready array of arrays).
  const datasets = await parseFetchDataURL(row.data);

  for (const dataset of Object.keys(datasets)) {
    // Very defensive. Should never happen as all d3.csv datasets get read as arrays of objects.
    if (Array.isArray(datasets[dataset][0])) break;
    datasets[dataset] = convertToArrayOfArrays(datasets[dataset]);
  }

  final_data[row_index].data = datasets;
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

function parseJSON(string) {
  const unescaped_string = _.unescape(string);
  if (string[0] === "{") return JSON.parse(unescaped_string);
  return JSON.parse(`{${unescaped_string}}`);
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
  if (!row.bindings) {
    final_data[row_index].bindings = base_chart_json.bindings;
    return;
  }

  const data_column_names = getDataColumns(final_data[row_index].data);
  final_data[row_index].bindings = parseBindings(
    row.bindings,
    data_column_names
  );
}

// Run.
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

    await setChartData(final_data, row, i, base_chart_data);
    setChartBindings(final_data, row, i, base_chart_data);
  }

  return final_data;
}

// Entry.
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
  console.log("final options", chart_options);
}

d3.csv("control-sheet.csv").then(main);
