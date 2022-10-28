var user_width = -1;
var user_height = -1;
var tags = ["t6", "t1", "split", "t2", "raw_table1", "Transformation", "t8", "pyspark", "model", "train", "t4", "t5", "DataSource", "pandas_on_spark", "pandas", "t3", "t7", "raw_table2"];
var nodes = [{"name": "raw_table1", "varname": "raw.table1", "position": [1.0, 50.0], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "danger", "bg-color": "#dc3545", "text": "pyspark"}, "node_type": "DataSource", "dependencies": [], "successors": ["t1", "t7"], "definition": {"description": "Spark table raw.table1", "tags": ["raw_table1", "pyspark", "DataSource"], "columns": [{"name": "col1", "type": null, "description": null}, {"name": "col2", "type": null, "description": null}, {"name": "col3", "type": null, "description": null}, {"name": "col4", "type": null, "description": null}, {"name": "col5", "type": null, "description": null}], "query": {"table": "raw.table1", "columns": ["col1", "col2", "col3", "col4", "col5"]}}}, {"name": "t1", "varname": "t1", "position": [2.0, 47.5], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "danger", "bg-color": "#dc3545", "text": "pyspark"}, "node_type": "Transformation", "dependencies": ["raw_table1"], "successors": ["t2", "t3", "t5", "t6"], "definition": {"description": "No description", "tags": ["t1", "pyspark", "Transformation"], "columns": [{"name": "col1", "type": "Decimals", "description": "No description"}, {"name": "col2", "type": "Decimals", "description": "No description"}, {"name": "col3", "type": "Decimals", "description": "No description"}]}}, {"name": "t2", "varname": "t2", "position": [3.0, 33.33], "active": false, "run_status": {"bg-class": "dark", "bg-color": "#212529", "text": "SKIPPED"}, "type": {"shape": "circle", "bg-class": "success", "bg-color": "#198754", "text": "pandas"}, "node_type": "Transformation", "dependencies": ["t1"], "successors": ["t4"], "definition": {"description": "No description", "tags": ["t2", "pandas", "Transformation"], "columns": [{"name": "col1", "type": "Integer", "description": "No description"}]}}, {"name": "t3", "varname": "t3", "position": [3.0, 66.67], "active": false, "run_status": {"bg-class": "dark", "bg-color": "#212529", "text": "SKIPPED"}, "type": {"shape": "circle", "bg-class": "success", "bg-color": "#198754", "text": "pandas"}, "node_type": "Transformation", "dependencies": ["t1"], "successors": ["t4"], "definition": {"description": "No description", "tags": ["t3", "pandas", "Transformation"], "columns": [{"name": "col2", "type": "Integer", "description": "No description"}]}}, {"name": "t4", "varname": "t4", "position": [4.0, 30.83], "active": false, "run_status": {"bg-class": "dark", "bg-color": "#212529", "text": "SKIPPED"}, "type": {"shape": "circle", "bg-class": "success", "bg-color": "#198754", "text": "pandas"}, "node_type": "Transformation", "dependencies": ["t2", "t3"], "successors": ["t5", "t8"], "definition": {"description": "No description", "tags": ["t4", "pandas", "Transformation", "model", "split"], "columns": [{"name": "col1", "type": "Integer", "description": "No description"}]}}, {"name": "raw_table2", "varname": "raw.table2", "position": [4.0, 64.17], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "danger", "bg-color": "#dc3545", "text": "pyspark"}, "node_type": "DataSource", "dependencies": [], "successors": ["t5"], "definition": {"description": "Spark table raw.table2", "tags": ["raw_table2", "pyspark", "DataSource"], "columns": [{"name": "col1", "type": null, "description": null}, {"name": "col2", "type": null, "description": null}], "query": {"table": "raw.table2", "columns": ["col1", "col2"]}}}, {"name": "t5", "varname": "t5", "position": [5.0, 25.0], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "success", "bg-color": "#198754", "text": "pandas"}, "node_type": "Transformation", "dependencies": ["raw_table2", "t1", "t4"], "successors": ["t8"], "definition": {"description": "No description", "tags": ["t5", "pandas", "Transformation", "model", "train"], "columns": [{"name": "col3", "type": "Integer", "description": "No description"}]}}, {"name": "t6", "varname": "t6", "position": [5.0, 50.0], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "warning", "bg-color": "#ffc107", "text": "pandas_on_spark"}, "node_type": "Transformation", "dependencies": ["t1"], "successors": ["t8"], "definition": {"description": "No description", "tags": ["t6", "pandas_on_spark", "Transformation"], "columns": [{"name": "col4", "type": "Integer", "description": "No description"}]}}, {"name": "t7", "varname": "t7", "position": [5.0, 75.0], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "danger", "bg-color": "#dc3545", "text": "pyspark"}, "node_type": "Transformation", "dependencies": ["raw_table1"], "successors": ["t8"], "definition": {"description": "No description", "tags": ["t7", "pyspark", "Transformation"], "columns": [{"name": "col2", "type": "Decimals", "description": "No description"}]}}, {"name": "t8", "varname": "t8", "position": [6.0, 47.5], "active": true, "run_status": {"bg-class": "info", "bg-color": "#0dcaf0", "text": "ACTIVE"}, "type": {"shape": "circle", "bg-class": "success", "bg-color": "#198754", "text": "pandas"}, "node_type": "Transformation", "dependencies": ["t4", "t5", "t6", "t7"], "successors": [], "definition": {"description": "No description", "tags": ["t8", "pandas", "Transformation"], "columns": [{"name": "col1", "type": "Integer", "description": "No description"}]}}];
var links = [{"source": "t4", "source_position": [4.0, 30.83], "source_selected_columns": ["col1"], "target": "t8", "target_position": [6.0, 47.5], "active": false}, {"source": "t4", "source_position": [4.0, 30.83], "source_selected_columns": ["col1"], "target": "t5", "target_position": [5.0, 25.0], "active": false}, {"source": "t2", "source_position": [3.0, 33.33], "source_selected_columns": ["col1"], "target": "t4", "target_position": [4.0, 30.83], "active": false}, {"source": "t1", "source_position": [2.0, 47.5], "source_selected_columns": ["col1", "col3"], "target": "t2", "target_position": [3.0, 33.33], "active": false}, {"source": "t1", "source_position": [2.0, 47.5], "source_selected_columns": ["col2"], "target": "t3", "target_position": [3.0, 66.67], "active": false}, {"source": "t1", "source_position": [2.0, 47.5], "source_selected_columns": ["col2"], "target": "t5", "target_position": [5.0, 25.0], "active": true}, {"source": "t1", "source_position": [2.0, 47.5], "source_selected_columns": ["col2"], "target": "t6", "target_position": [5.0, 50.0], "active": true}, {"source": "raw_table1", "source_position": [1.0, 50.0], "source_selected_columns": ["col1", "col2", "col3", "col5"], "target": "t1", "target_position": [2.0, 47.5], "active": true}, {"source": "raw_table1", "source_position": [1.0, 50.0], "source_selected_columns": ["col1", "col2", "col3", "col4", "col5"], "target": "t7", "target_position": [5.0, 75.0], "active": true}, {"source": "t3", "source_position": [3.0, 66.67], "source_selected_columns": ["col2"], "target": "t4", "target_position": [4.0, 30.83], "active": false}, {"source": "t5", "source_position": [5.0, 25.0], "source_selected_columns": ["col3"], "target": "t8", "target_position": [6.0, 47.5], "active": true}, {"source": "raw_table2", "source_position": [4.0, 64.17], "source_selected_columns": ["col1", "col2"], "target": "t5", "target_position": [5.0, 25.0], "active": true}, {"source": "t6", "source_position": [5.0, 50.0], "source_selected_columns": ["col4"], "target": "t8", "target_position": [6.0, 47.5], "active": true}, {"source": "t7", "source_position": [5.0, 75.0], "source_selected_columns": ["col2"], "target": "t8", "target_position": [6.0, 47.5], "active": true}];