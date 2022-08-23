async function sendVisJsonRequest(vis_id) {
	const endpoint = `https://public.flourish.studio/visualisation/${vis_id}/visualisation.json`;
	const result = await d3.json(endpoint);
  // TODO: what do we do with multiple datasets?
	return result;
}

async function getBaseChartMap(control_data) {
  // get a map for each unique base chart ID.
  const base_chart_map = new Map(
    control_data.map(d => [d.base_chart, undefined])
  );
  
  for (const id of base_chart_map.keys()) {
    const base_chart_info = await sendVisJsonRequest(id);
    base_chart_map.set(id, base_chart_info)
  }
  
  return base_chart_map;
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

  return datasets
}

function initFinalData(control_data) {
  return control_data.map(d => ({
    base_chart: d.base_chart,
    container: d.container,
    data_url: d.data,
    data: undefined
  }))
}

async function setChartData(final_data, row, row_index, base_chart_json) {
  if (!row.data) {
    final_data[row_index].data = base_chart_json.data;
    return;
  } 

  // Check for previously fetched datasets and use them instead of re-fetching.
  const data_matches = final_data.filter((d, i) => i < row_index && d.data_url === row.data);

  if (data_matches.length > 0) {
    final_data[row_index].data = data_matches[0].data;
    return
  }

  const datasets = await parseFetchDataURL(row.data);
  final_data[row_index].data = datasets;

}

async function setChartOptions(control_data, base_chart_map) {
  const final_data = initFinalData(control_data);

  // Loop through control data and assemble data-sources, bindings and settings.
  for (let i = 0; i < control_data.length; i++) {
    const row = control_data[i];

    await setChartData(final_data, row, i, base_chart_map.get(row.base_chart))
  }

  return final_data;

}

async function main(control_data) {
  const base_chart_map = await getBaseChartMap(control_data);
  const chart_options = await setChartOptions(control_data, base_chart_map);
  console.log('final options', chart_options);
}

d3.csv('control-sheet.csv').then(main)
