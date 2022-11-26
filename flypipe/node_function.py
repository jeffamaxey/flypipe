from flypipe.node import Node
from flypipe.node_type import NodeType


class NodeFunction(Node):
    NODE_TYPE = NodeType.NODE_FUNCTION

    def __init__(self, function, requested_columns=False):
        self._key = None
        self.function = function
        self.requested_columns = requested_columns

    def expand(self, requested_columns):
        kwargs = {}
        if self.requested_columns:
            kwargs["requested_columns"] = requested_columns
        func = self.function(**kwargs)
        func.key = self.key
        return func

    def run(
            self, spark=None, parallel=None, inputs=None, pandas_on_spark_use_pandas=False
    ):
        # TODO: would be nice not to have to copy paste this code from Node.run
        if not inputs:
            inputs = {}
        provided_inputs = {node.key: df for node, df in inputs.items()}
        self._create_graph(list(provided_inputs.keys()), pandas_on_spark_use_pandas)
        requested_columns = self.node_graph.node_output_columns[self.key].get_columns()
        return self.expand(requested_columns).run(
            spark, parallel, inputs, pandas_on_spark_use_pandas
        )


def node_function(*args, **kwargs):
    """
    Decorator factory that returns the given function wrapped inside a Node class

    Parameters
    ----------
    kwargs:
        description : str, optional
            Description of the node (default is None)
        tags : List[str], optional
            List of tags for the node (default is None)
        dependencies: List[Node], optional
            List of other dependent nodes
        output : Schema, optional
            Defines the ouput schema of the node (default is None)
        spark_context: bool, optional
            True, returns spark context as argument to the funtion (default is False)
        requested_columns : bool, optional
            True, returns a list of requested columns from the graph to the node as an arugment requested_columns (default is False)

    """

    def decorator(func):
        return NodeFunction(func, *args, **kwargs)

    return decorator
